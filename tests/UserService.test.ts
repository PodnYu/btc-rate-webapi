import chai from 'chai';
import chaiHttp from 'chai-http';
import userService from '../src/api/services/UserService';
import dotenv from 'dotenv';
dotenv.config();
import app from '../src/app';
import { User } from '../src/api/models/User';
import { readFile } from 'fs/promises';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiHttp);
chai.use(chaiAsPromised);
const expect = chai.expect;
const server = app.listen();

describe('UserService testing', () => {
	beforeEach(async () => {
		await userService.deleteAllUsers();
	});

	after(async () => {
		await userService.deleteAllUsers();
		server.close();
	});

	it('should create file with user info', async () => {
		const user = new User('test', 'test');

		const userId = await userService.createUser(user);

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const userData = await readFile(userService.getFilePath(userId!), 'utf-8');

		const userDataParts = userData.split(' ');

		expect(userDataParts).to.have.lengthOf(2);
		expect(userDataParts[0]).to.be.equal(user.login);
	});

	it('user should not be created', async () => {
		const user = new User('te st', 'test');

		const userId = await userService.createUser(user);

		expect(userId).to.be.null;
	});
});
