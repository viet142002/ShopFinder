const jwt = require("jsonwebtoken");

const generateToken = (data, exp = "1d") => {
	const token = jwt.sign(
		{
			_id: data._id,
			role: data.role,
			email: data.email,
			status: data.status,
			retailer: data._id,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: exp,
		}
	);

	return token;
};

exports.generateToken = generateToken;
