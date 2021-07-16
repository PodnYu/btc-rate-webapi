const authController = require('../controllers/AuthController');
const { exceptionCatcher } = require('../utils/controllerUtils');

module.exports = function (router) {
	const urlPrefix = '/user';

	router.post(`${urlPrefix}/login`, exceptionCatcher(authController.login));

	router.post(`${urlPrefix}/create`, exceptionCatcher(authController.create));
};
