const chai = require('chai');
const chaiHttp = require('chai-http');
const userService = require('../src/api/services/UserService');
require('dotenv').config();
const app = require('../src/app');

chai.use(chaiHttp);
const expect = chai.expect;
const server = app.listen();

describe('BTC testing', () => {
	beforeEach(async () => {
		await userService.deleteAllUsers();
	});

	after(async () => {
		await userService.deleteAllUsers();
		server.close();
	});

	it('should get btcRate and return 200 status code', async () => {
		const authResponse = await chai
			.request(server)
			.post('/user/create')
			.send({ login: 'test', password: 'test' });

		const token = authResponse.body.token;

		const response = await chai
			.request(server)
			.get('/btcRate')
			.set('Authorization', `Bearer ${token}`);

		expect(response.status).to.be.equal(200);
		expect(response.body).to.have.property('buy');
		expect(response.body).to.have.property('sell');
	});

	it('should NOT get btcRate and return 403 status code', async () => {
		const response = await chai.request(server).get('/btcRate');

		expect(response.status).to.be.equal(403);
	});
});
