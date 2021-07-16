class User {
	constructor(id, login, password) {
		this.id = id;
		this.login = login;
		this.password = password;
	}

	isValid() {
		return Boolean(this.login) && Boolean(this.password);
	}

	static isValid(obj) {
		return new User(obj.login, obj.password).isValid();
	}

	static fromObject(obj) {
		return new User(obj.login, obj.password);
	}
}

module.exports = User;
