import { Context } from 'koa';
import { BtcRateDto } from '../dtos/BtcRateDto';
import { IBtcService } from '../interfaces/IBtcService';

export class BtcController {
	constructor(private readonly _btcService: IBtcService) {}

	getBtcRate = async (ctx: Context) => {
		try {
			const btcRate = await this._btcService.getBTCToUAHExchange();

			ctx.status = 200;
			ctx.body = new BtcRateDto(btcRate);
		} catch (err) {
			ctx.status = 500;
			ctx.body = { error: (<{ message: string }>err).message };
		}
	};
}
