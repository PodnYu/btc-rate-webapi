const userService = require('../services/UserService');
const { getBTCToUAHExchange } = require('../utils/btcUtils');

class BtcService {
	getBTCToUAHExchange = async (userId) => {
		const response = {};

		if (!(await userService.userExists(userId))) {
			response.status = 403;
			response.body = { message: 'Forbidden!' };
			return response;
		}

		response.status = 200;
		response.body = await getBTCToUAHExchange();

		return response;
	};
}

module.exports = new BtcService();
