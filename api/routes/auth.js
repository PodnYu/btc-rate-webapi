const {
	createUser,
	isLoginAlreadyTaken,
	getUserById,
	isUserValid,
	getAllUsers,
} = require('../services/userService');
const { signToken } = require('../utils/jwtUtils');

module.exports = function (router, _) {
	const urlPrefix = '/user';

	router.post(`${urlPrefix}/login`, async (ctx) => {
		const { login, password } = ctx.request.body;

		try {
			const users = await getAllUsers();
			const user = users.find((u) => u.login === login);
			if (!user || !(await isUserValid(user.id, login, password))) {
				ctx.status = 404;
				ctx.body = { message: 'No such user' };
				return;
			}

			const token = await signToken({ userId: user.id });

			ctx.status = 200;
			ctx.body = { token };
		} catch (err) {
			console.error(err.message);
			ctx.status = 500;
			ctx.body = { message: 'Internal server error!' };
		}
	});

	router.post(`${urlPrefix}/create`, async (ctx) => {
		const { login, password } = ctx.request.body;

		try {
			if (await isLoginAlreadyTaken(login)) {
				ctx.status = 403;
				ctx.body = { message: 'Login is already taken!' };
				return;
			}

			const userId = await createUser(login, password);

			const token = await signToken({ userId });

			ctx.status = 200;
			ctx.body = { token };
		} catch (err) {
			console.error(err.message);
			ctx.status = 500;
			ctx.body = { message: 'Internal server error!' };
		}
	});
};
