const authController = require('../controllers/AuthController');

module.exports = function (router) {
	const urlPrefix = '/user';

	router.post(`${urlPrefix}/login`, authController.login);

	router.post(`${urlPrefix}/create`, authController.create);
};
