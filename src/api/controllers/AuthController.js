const authService = require('../services/AuthService');

class AuthController {
	async login(ctx) {
		const { login, password } = ctx.request.body;

		const result = await authService.login(login, password);

		ctx.status = result.status;
		ctx.body = result.body;
	}

	async create(ctx) {
		const { login, password } = ctx.request.body;

		const result = await authService.create(login, password);
		ctx.status = result.status;
		ctx.body = result.body;
	}
}

module.exports = new AuthController();
