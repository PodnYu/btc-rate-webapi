class BtcRate {
	constructor(obj) {
		this.sell = obj.sell;
		this.buy = obj.buy;
	}

	isValid() {
		return Boolean(this.sell) && Boolean(this.buy);
	}

	static isValid(obj) {
		return new BtcRate(obj).isValid();
	}
}

module.exports = BtcRate;
