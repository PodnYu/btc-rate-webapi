import axios from 'axios';
import { IBtcService } from '../interfaces/IBtcService';
import { BtcRateType } from '../models/BtcRate';

export class RemoteBtcService implements IBtcService {
	// should not know about userServie
	getBTCToUAHExchange = async () => {
		try {
			const btcInfo = await axios
				.get<{ data: BtcRateType }>('http://btc-service:5008/api/btcRate')
				.then((res) => res.data);

			return btcInfo.data;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
}
