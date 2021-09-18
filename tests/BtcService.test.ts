import chai from 'chai';
import chaiHttp from 'chai-http';
import userService from '../src/api/services/UserService';
import dotenv from 'dotenv';
dotenv.config();
import app from '../src/app';
import chaiAsPromised from 'chai-as-promised';
import { IBtcService } from '../src/api/interfaces/IBtcService';
import { LocalBtcService } from '../src/api/services/LocalBtcService';

const btcService: IBtcService = new LocalBtcService();

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
		const btcResponse = await btcService.getBTCToUAHExchange();

		expect(btcResponse).to.have.property('sell');
		expect(btcResponse).to.have.property('buy');
	});
});
