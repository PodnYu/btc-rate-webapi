const authService = require('../services/AuthService');
const TokenDto = require('../dtos/TokenDto');

class AuthController {
	async login(ctx) {
		// const { login, password } = ctx.request.body;

		const result = await authService.login(ctx.userDto);

		ctx.status = result.status;
		ctx.body = new TokenDto(result.body);
	}

	async create(ctx) {
		// const { login, password } = ctx.request.body;
		const result = await authService.create(ctx.userDto);
		ctx.status = result.status;
		ctx.body = new TokenDto(result.body);
	}
}

module.exports = new AuthController();
