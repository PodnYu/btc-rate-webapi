const userService = require('../services/UserService');
const { getBTCToUAHExchange } = require('../utils/btcUtils');
const btcService = require('../services/BtcService');

class BtcController {
	async getBtcRate(ctx) {
		const userId = ctx.request.tokenPayload.userId;

		try {
			const result = await btcService.getBTCToUAHExchange(userId);
			ctx.status = result.status;
			ctx.body = result.body;
		} catch (err) {
			console.error(err.mesage);
			ctx.status = 500;
			ctx.body = { message: 'Internal server error!' };
		}
	}
}

module.exports = new BtcController();
