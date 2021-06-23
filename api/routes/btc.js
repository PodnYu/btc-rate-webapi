const { promisify } = require('util');
const request = promisify(require('request'));
const userService = require('../services/userService');

const kunaURL = 'https://api.kuna.io/v3/tickers?symbols=btcuah';

async function getBTCToUAHExchange() {
	const response = await request(kunaURL, {});
	const body = JSON.parse(response.body);
	const data = {
		sell: body[0][3],
		buy: body[0][1],
	};
	return data;
}

module.exports = function (router, protectedRouter) {
	protectedRouter.get('/btcRate', async (ctx) => {
		const userId = ctx.request.tokenPayload.userId;

		if (!(await userService.userExists(userId))) {
			ctx.status = 403;
			ctx.body = { message: 'Forbidden!' };
			return;
		}

		ctx.status = 200;
		ctx.body = await getBTCToUAHExchange();
	});
};
