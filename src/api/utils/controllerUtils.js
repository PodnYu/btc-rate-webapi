const exceptionCatcher = (fn) => async (ctx) => {
	try {
		await fn(ctx);
	} catch (err) {
		console.error(err.message);
		ctx.status = 500;
		ctx.body = { message: 'Internal server error!' };
	}
};

module.exports = {
	exceptionCatcher,
};
