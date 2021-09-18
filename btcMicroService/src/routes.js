const KoaRouter = require('koa-router');
const { BtcService } = require('./BtcService');

const router = new KoaRouter();

router.get('/btcRate', async (ctx) => {
	const btcService = new BtcService();

	let data = {};
	try {
		data = await btcService.getBTCToUAHExchange();
	} catch (err) {
		console.error(err);
	}

	ctx.body = { data };
});

module.exports = { router };
