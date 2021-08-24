import chai from 'chai';
import chaiHttp from 'chai-http';
import userService from '../src/api/services/UserService';
import dotenv from 'dotenv';
dotenv.config();
import app from '../src/app';
import { User } from '../src/api/models/User';
import chaiAsPromised from 'chai-as-promised';
import btcService from '../src/api/services/BtcService';

chai.use(chaiHttp);
chai.use(chaiAsPromised);
const expect = chai.expect;
const server = app.listen();

describe('BtcService testing', () => {
	beforeEach(async () => {
		await userService.deleteAllUsers();
	});

	after(async () => {
		await userService.deleteAllUsers();
		server.close();
	});

	it('should get token', async () => {
		const user = new User('test', 'test');
		const userId = await userService.createUser(user);

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const btcResponse = await btcService.getBTCToUAHExchange(userId!);

		expect(btcResponse.body).to.have.property('sell');
		expect(btcResponse.body).to.have.property('buy');
	});

	it('should get 403 error', async () => {
		const btcResponse = await btcService.getBTCToUAHExchange('test');

		expect(btcResponse.status).to.be.equal(403);
		expect(btcResponse.body).to.have.property('message');
	});
});
