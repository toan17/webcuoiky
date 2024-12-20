const errorHandler = (statusCode, message) => {
	const error = new Error(message, statusCode);
	return error;
};

module.exports = errorHandler;
