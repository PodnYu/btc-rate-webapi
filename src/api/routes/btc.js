const btcController = require('../controllers/BtcController');
const extractJWTPayload = require('../middleware/extractJWTPayload');
const { exceptionCatcher } = require('../utils/controllerUtils');

module.exports = function (router) {
	router.get(
		'/btcRate',
		extractJWTPayload,
		exceptionCatcher(btcController.getBtcRate)
	);
};
