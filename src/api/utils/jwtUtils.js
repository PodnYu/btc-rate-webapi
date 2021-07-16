const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = (payload) =>
	promisify(jwt.sign)(payload, process.env.JWT_SECRET_KEY);

const verifyToken = (token) =>
	promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

module.exports = {
	signToken,
	verifyToken,
};
