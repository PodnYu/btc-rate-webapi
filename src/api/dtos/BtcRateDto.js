class BtcRateDto {
	constructor(obj) {
		this.sell = obj.sell;
		this.buy = obj.buy;
	}

	isValid() {
		return Boolean(this.sell) && Boolean(this.buy);
	}

	static isValid(obj) {
		return new BtcRateDto(obj).isValid();
	}
}

module.exports = BtcRateDto;
