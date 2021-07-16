const authController = require('../controllers/AuthController');
const { exceptionCatcher } = require('../utils/controllerUtils');
const authMiddleware = require('../middleware/AuthMiddleware');

module.exports = function (router) {
	const urlPrefix = '/user';

	router.post(
		`${urlPrefix}/login`,
		authMiddleware.validateUserOnLogin,
		exceptionCatcher(authController.login)
	);

	router.post(
		`${urlPrefix}/create`,
		authMiddleware.validateUserOnCreate,
		exceptionCatcher(authController.create)
	);
};
