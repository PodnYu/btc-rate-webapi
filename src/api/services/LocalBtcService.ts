import { getBTCToUAHExchange } from '../utils/btcUtils';
import { IBtcService } from '../interfaces/IBtcService';

export class LocalBtcService implements IBtcService {
	// should not know about userServie
	getBTCToUAHExchange = async () => {
		try {
			const result = await getBTCToUAHExchange();

			if (result === null) throw new Error('BTC Service unavailable!');

			return result;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
}
