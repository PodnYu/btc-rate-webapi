const authService = require('../services/AuthService');

class AuthController {
	async login(ctx) {
		const { login, password } = ctx.request.body;

		try {
			const result = await authService.login(login, password);

			ctx.status = result.status;
			ctx.body = result.body;
		} catch (err) {
			console.error(err.message);
			ctx.status = 500;
			ctx.body = { message: 'Internal server error!' };
		}
	}

	async create(ctx) {
		const { login, password } = ctx.request.body;

		try {
			const result = await authService.create(login, password);
			ctx.status = result.status;
			ctx.body = result.body;
		} catch (err) {
			console.error(err.message);
			ctx.status = 500;
			ctx.body = { message: 'Internal server error!' };
		}
	}
}

module.exports = new AuthController();
