const chai = require('chai');
const chaiHttp = require('chai-http');
const userService = require('../src/api/services/UserService');
require('dotenv').config();
const app = require('../src/app');

chai.use(chaiHttp);
const expect = chai.expect;
const server = app.listen();

describe('Auth testing', () => {
	beforeEach(async () => {
		await userService.deleteAllUsers();
	});

	after(async () => {
		await userService.deleteAllUsers();
		server.close();
	});

	it('should create new user and return token', async () => {
		const response = await chai
			.request(server)
			.post('/user/create')
			.send({ login: 'test', password: 'test' });

		expect(response.status).to.be.equal(200);
		expect(response.body).to.have.property('token');
	});

	it('should NOT create new user and return token', async () => {
		await userService.createUser('test', 'test');
		const response = await chai
			.request(server)
			.post('/user/create')
			.send({ login: 'test', password: 'test' });

		expect(response.status).to.be.equal(403);
	});

	it('should login successfully and return token', async () => {
		await userService.createUser('test', 'test');
		const response = await chai
			.request(server)
			.post('/user/login')
			.send({ login: 'test', password: 'test' });

		expect(response.status).to.be.equal(200);
		expect(response.body).to.have.property('token');
	});

	it('should NOT login successfully and return 404 status code', async () => {
		await userService.createUser('test', 'test');

		let response = await chai
			.request(server)
			.post('/user/login')
			.send({ login: 'testb', password: 'test' });

		expect(response.status).to.be.equal(404);

		response = await chai
			.request(server)
			.post('/user/login')
			.send({ login: 'test', password: 'testb' });

		expect(response.status).to.be.equal(404);
	});
});
