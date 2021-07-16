const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const usersDir = path.join(__dirname, '/../../../db/users');

class UserService {
	constructor(pathToUsersDb = usersDir) {
		const usersDirExists = fs.existsSync(pathToUsersDb);
		if (!usersDirExists) {
			fs.mkdirSync(pathToUsersDb, { recursive: true });
		}
		this.usersDir = pathToUsersDb;
	}

	getFilePath = (userId) => {
		return `${this.usersDir}/${userId}.txt`;
	};

	saveUser = async (userId, login, password) => {
		await writeFile(this.getFilePath(userId), `${login} ${password}`);
	};

	obtainUser = (userId) => {
		return readFile(this.getFilePath(userId), 'utf8');
	};

	createUser = async (login, password) => {
		const userId = uuidv4();
		const hashedPassword = await bcrypt.hash(
			password,
			parseInt(process.env.SALT_ROUNDS)
		);

		await this.saveUser(userId, login, hashedPassword);

		return userId;
	};

	getUserById = async (userId) => {
		try {
			const data = await this.obtainUser(userId);
			const [login, hashedPassword] = data.split(' ');

			return {
				login,
				hashedPassword,
			};
		} catch (err) {
			return null;
		}
	};

	isUserValid = async (userId, login, password) => {
		const user = await this.getUserById(userId);
		if (user === null) {
			return false;
		}
		if (user.login !== login) {
			return false;
		}

		const passwordOk = await bcrypt.compare(password, user.hashedPassword);

		if (passwordOk) {
			return true;
		}
	};

	getAllUserIds = async () => {
		const userIds = await readDir(this.usersDir);
		return userIds.map((userId) => userId.split('.txt')[0]);
	};

	getAllUsers = async () => {
		const userIds = await this.getAllUserIds();
		const getUserPromises = [];
		for (const userId of userIds) {
			getUserPromises.push(this.getUserById(userId));
		}

		const users = await Promise.all(getUserPromises);
		return users.map((user, userIndex) => ({
			id: userIds[userIndex],
			...user,
		}));
	};

	getAllUserLogins = async () => {
		return (await this.getAllUsers()).map((user) => user.login);
	};

	isLoginAlreadyTaken = async (login) => {
		return (await this.getAllUserLogins()).some((l) => l === login);
	};

	deleteUserById = async (userId) => {
		try {
			await fs.promises.unlink(this.getFilePath(userId));
		} catch (_) {}
	};

	/*
		Looks like it is faster to remove entire db/users directory and recreate it
			or
		to execute shell command `rm -rf ${path.join(this.usersDir, '*')}` (sounds not very nice)
	*/
	deleteAllUsers = async () => {
		const userIds = await this.getAllUserIds();
		await Promise.all(userIds.map((userId) => this.deleteUserById(userId)));
	};

	userExists = async (userId) => {
		try {
			await fs.promises.access(this.getFilePath(userId), fs.constants.F_OK);
			return true;
		} catch (err) {
			return false;
		}
	};
}

module.exports = new UserService();

// module.exports = {
// 	createUser,
// 	getUserById,
// 	isUserValid,
// 	getAllUsers,
// 	getAllUserLogins,
// 	isLoginAlreadyTaken,
// 	userExists,
// };
