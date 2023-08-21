const bcrypt = require('bcryptjs');

function generateShortCode(length = 6) {
	const characters =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
	let shortCode = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		shortCode += characters.charAt(randomIndex);
	}

	return shortCode;
}

function encryptPassword(password) {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, 10, function (err, hash) {
			if (err) {
				reject(err);
			} else {
				resolve(hash);
			}
		});
	});
}

async function matchPassword(password, userPassword) {
	return await bcrypt.compare(password, userPassword);
}

module.exports = {
	generateShortCode,
	encryptPassword,
	matchPassword,
};
