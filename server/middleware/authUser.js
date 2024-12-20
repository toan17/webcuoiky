const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const token = req.cookies.access_token;
	if (!token) {
		return res.status(401).json('Unauthorized');
	}
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(401).json({ message: 'Unauthorized, invalid token' });
		}
		req.user = user;
		next();
	});
};

module.exports = verifyToken;
