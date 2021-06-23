const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const usersDir = __dirname + '/../db/users';

function getFilePath(userId) {
	return `${usersDir}/${userId}.txt`;
}

async function saveUser(userId, login, password) {
	await writeFile(getFilePath(userId), `${login} ${password}`);
}

function obtainUser(userId) {
	return readFile(getFilePath(userId), 'utf8');
}

async function createUser(login, password) {
	const userId = uuidv4();
	const hashedPassword = await bcrypt.hash(
		password,
		parseInt(process.env.SALT_ROUNDS)
	);

	await saveUser(userId, login, hashedPassword);

	return userId;
}

async function getUserById(userId) {
	try {
		const data = await obtainUser(userId);
		const [login, hashedPassword] = data.split(' ');

		return {
			login,
			hashedPassword,
		};
	} catch (err) {
		return null;
	}
}

async function isUserValid(userId, login, password) {
	const user = await getUserById(userId);
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
}

async function getAllUserIds() {
	const userIds = await readDir(usersDir);
	return userIds.map((userId) => userId.split('.txt')[0]);
}

async function getAllUsers() {
	const userIds = await getAllUserIds();
	const getUserPromises = [];
	for (const userId of userIds) {
		getUserPromises.push(getUserById(userId));
	}

	const users = await Promise.all(getUserPromises);
	return users.map((user, userIndex) => ({
		id: userIds[userIndex],
		...user,
	}));
}

async function getAllUserLogins() {
	return (await getAllUsers()).map((user) => user.login);
}

async function isLoginAlreadyTaken(login) {
	return (await getAllUserLogins()).some((l) => l === login);
}

async function deleteUserById(userId) {
	try {
		await fs.promises.unlink(getFilePath(userId));
	} catch (_) {}
}

async function deleteAllUsers() {
	const userIds = await getAllUserIds();
	await Promise.all(userIds.map((userId) => deleteUserById(userId)));
}

async function userExists(userId) {
	try {
		await fs.promises.access(getFilePath(userId), fs.constants.F_OK);
		return true;
	} catch (err) {
		return false;
	}
}

module.exports = {
	createUser,
	getUserById,
	isUserValid,
	getAllUsers,
	getAllUserLogins,
	isLoginAlreadyTaken,
	userExists,
};
