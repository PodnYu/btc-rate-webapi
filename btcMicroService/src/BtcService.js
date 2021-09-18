const axios = require('axios');

class BtcService {
	getBTCToUAHExchange = async () => {
		const kunaURL = 'https://api.kuna.io/v3/tickers?symbols=btcuah';

		try {
			const response = await axios.get(kunaURL);
			const body = response.data;
			const data = {
				sell: body[0][3],
				buy: body[0][1],
			};

			return data;
		} catch (err) {
			console.error(err.message);
			return null;
		}
	};
}

module.exports = { BtcService };
