const CreateUserDto = require('../dtos/CreateUserDto');
const LoginUserDto = require('../dtos/LoginUserDto');

class AuthMiddleware {
	genericValidate = (DTOType, ctx, next) => {
		const userDto = new DTOType(ctx.request.body);
		if (!userDto.isValid()) {
			ctx.status = 400;
			ctx.body = { message: 'Invalid login and/or password!' };
			return;
		}

		ctx.userDto = userDto;

		return next();
	};

	validateUserOnCreate = (ctx, next) => {
		return this.genericValidate(CreateUserDto, ctx, next);
	};

	validateUserOnLogin = (ctx, next) => {
		return this.genericValidate(LoginUserDto, ctx, next);
	};
}

module.exports = new AuthMiddleware();
