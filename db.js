require('dotenv').config();
const mysql = require('mysql2');
const utils = require('./utils').default;

function connect() {
	const connection = mysql.createConnection(process.env.DATABASE_URL);
	console.log('Connected to PlanetScale!');
	return connection;
}

const db = connect();

function getURLEntity(short_code) {
	return new Promise((resolve, reject) => {
		db.execute(
			'SELECT * FROM URLs WHERE short_code = ?',
			[short_code],
			(err, results, _) => {
				if (err) {
					reject(err);
				} else {
					resolve(results[0]);
				}
			}
		);
	});
}

async function createURL({ url, short_code }) {
	db.execute(
		`INSERT INTO URLs (original_url, short_code, created_at) VALUES ('${url}', '${short_code}', CURDATE());`
	);
}

async function incrementClick(shortUrl, click_count) {
	await db.execute('UPDATE URLs SET click_count = ? WHERE short_code = ?', [
		click_count,
		shortUrl,
	]);
}

async function loginUser(documentNumber, password) {
	const user = await getUser(documentNumber);
	const isCorretPassword = await utils.matchPassword(password, user.password);
	return isCorretPassword;
}

module.exports = {
	connect,
	createURL,
	getURLEntity,
	incrementClick,
};
