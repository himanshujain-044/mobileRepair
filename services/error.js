class ErrorClass extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;
		console.log(this.stack);
	}
}

module.exports = ErrorClass;
