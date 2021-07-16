const btcController = require('../controllers/BtcController');
const extractJWTPayload = require('../middleware/extractJWTPayload');

module.exports = function (router) {
	router.get('/btcRate', extractJWTPayload, btcController.getBtcRate);
};
