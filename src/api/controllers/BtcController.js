const btcService = require('../services/BtcService');
const BtcRateDto = require('../dtos/BtcRateDto');

class BtcController {
	async getBtcRate(ctx) {
		const userId = ctx.request.tokenPayload.userId;

		const result = await btcService.getBTCToUAHExchange(userId);
		ctx.status = result.status;
		ctx.body = new BtcRateDto(result.body);
	}
}

module.exports = new BtcController();
