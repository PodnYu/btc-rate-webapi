class LoginUser {
	constructor(obj) {
		this.login = obj.login;
		this.password = obj.password;
	}

	isValid() {
		return Boolean(this.login) && Boolean(this.password);
	}

	static isValid(obj) {
		return new LoginUser(obj).isValid();
	}
}

module.exports = LoginUser;
