module.exports = (options = {}) => {
	const entries =
		options &&
		options.constructor &&
		options.constructor.prototype &&
		options.constructor.prototype.entries ?
			options.constructor.prototype.entries.call(options) :
			Object.entries(options);

	return (_files, metalsmith, done) => {
		const metadata = metalsmith.metadata();
		for (const [key, value] of entries) {
			metadata[key] = value;
		}

		return done();
	};
};
