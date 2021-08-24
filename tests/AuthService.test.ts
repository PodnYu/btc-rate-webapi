import chai from 'chai';
import chaiHttp from 'chai-http';
import userService from '../src/api/services/UserService';
import dotenv from 'dotenv';
dotenv.config();
import app from '../src/app';
import { User } from '../src/api/models/User';
import chaiAsPromised from 'chai-as-promised';
import authService from '../src/api/services/AuthService';
import { CreateUserDto } from '../src/api/dtos/CreateUserDto';

chai.use(chaiHttp);
chai.use(chaiAsPromised);
const expect = chai.expect;
const server = app.listen();

describe('AuthService testing', () => {
	beforeEach(async () => {
		await userService.deleteAllUsers();
	});

	after(async () => {
		await userService.deleteAllUsers();
		server.close();
	});

	it('should return token', async () => {
		const userDto = new CreateUserDto({
			login: 'test',
			password: 'test',
		});

		const authResponse = await authService.create(userDto);

		expect(authResponse.body).to.have.property('token');
	});

	it('should return 400 error', async () => {
		const userDto = new CreateUserDto({
			login: 'te st',
			password: 'test',
		});

		const authResponse = await authService.create(userDto);

		expect(authResponse.status).to.be.equal(400);
	});

	it('should return 403 error', async () => {
		const login = 'test';
		const password = 'test';

		await userService.createUser(new User(login, password));

		const userDto = new CreateUserDto({
			login,
			password,
		});

		const authResponse = await authService.create(userDto);

		expect(authResponse.status).to.be.equal(403);
	});
});
