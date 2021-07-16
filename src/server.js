require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5007;

module.exports = app.listen(PORT, () => {
	console.log(`listening on 127.0.0.1:${PORT}...`);
});
