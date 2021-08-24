import chai from 'chai';
import dotenv from 'dotenv';
dotenv.config();
import { User } from '../src/api/models/User';

const expect = chai.expect;

describe('UserModel testing', () => {
	it('user should be valid', async () => {
		const user = new User('test', 'test');

		expect(user.isValid()).to.be.true;
	});

	it('user should be invalid', async () => {
		const InvalidUsers = [
			new User('', 'test'),
			new User('test', ''),
			new User('', ''),
			new User('te st', 'test'),
		];

		for (const user of InvalidUsers) {
			expect(user.isValid()).to.be.false;
		}
	});
});
