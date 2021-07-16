class LoginUserDto {
	constructor(obj) {
		this.login = obj.login;
		this.password = obj.password;
	}

	isValid() {
		return Boolean(this.login) && Boolean(this.password);
	}

	static isValid(obj) {
		return new LoginUserDto(obj).isValid();
	}
}

module.exports = LoginUserDto;
