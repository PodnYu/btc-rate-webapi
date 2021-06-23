const { verifyToken } = require('../utils/jwtUtils');

function getJWTToken(ctx) {
	const authHeader = ctx.header.authorization;
	if (!authHeader) return null;
	const token = authHeader.split(' ')[1];
	return token || null;
}

const extractJWTPayload = () => async (ctx, next) => {
	const token = getJWTToken(ctx);
	if (token) {
		try {
			ctx.request.tokenPayload = await verifyToken(token);
		} catch (err) {
			console.error('Error occured while verifying token:', err.message);
			ctx.status = 401;
			ctx.body = { message: 'Unauthorized, bad token!' };
			ctx.request.tokenPayload = null;
			return;
		}
	} else {
		ctx.status = 401;
		ctx.body = { message: 'Unauthorized, token not provided!' };
		return;
	}

	await next();
};

module.exports = extractJWTPayload;
