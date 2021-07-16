const { promisify } = require('util');
const request = promisify(require('request'));

async function getBTCToUAHExchange() {
	const kunaURL = 'https://api.kuna.io/v3/tickers?symbols=btcuah';

	const response = await request(kunaURL, {});
	const body = JSON.parse(response.body);
	const data = {
		sell: body[0][3],
		buy: body[0][1],
	};
	return data;
}

module.exports = {
	getBTCToUAHExchange,
};
