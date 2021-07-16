const userService = require('../services/UserService');
const { getBTCToUAHExchange } = require('../utils/btcUtils');
const btcService = require('../services/BtcService');

class BtcController {
	async getBtcRate(ctx) {
		const userId = ctx.request.tokenPayload.userId;

		const result = await btcService.getBTCToUAHExchange(userId);
		ctx.status = result.status;
		ctx.body = result.body;
	}
}

module.exports = new BtcController();
