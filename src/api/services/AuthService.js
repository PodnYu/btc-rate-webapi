const userService = require('../services/UserService');
const { signToken } = require('../utils/jwtUtils');

class AuthService {
	login = async (login, password) => {
		const response = {};

		const users = await userService.getAllUsers();
		const user = users.find((u) => u.login === login);
		if (!user || !(await userService.isUserValid(user.id, login, password))) {
			response.status = 404;
			response.body = { message: 'No such user' };
			return response;
		}

		const token = await signToken({ userId: user.id });

		response.status = 200;
		response.body = { token };

		return response;
	};

	create = async (login, password) => {
		const response = {};

		if (await userService.isLoginAlreadyTaken(login)) {
			response.status = 403;
			response.body = { message: 'Login is already taken!' };
			return response;
		}

		const userId = await userService.createUser(login, password);

		const token = await signToken({ userId });
		response.status = 200;
		response.body = { token };

		return response;
	};
}

module.exports = new AuthService();
