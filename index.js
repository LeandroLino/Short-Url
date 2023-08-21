const app = require('express')();
require('dotenv').config();
const bodyParser = require('body-parser');
const utils = require('./utils');
const messages = require('./messages');
const requestIp = require('request-ip');

const db = require('./db');

app.use(bodyParser.json());
app.use(requestIp.mw());

app.get('/', (req, res) => {
	res.send('OK');
});

app.post('/short', async (req, res) => {
	const shortUrl = utils.generateShortCode();
	await db.createURL({ ...req.body, short_code: shortUrl });
	res.status(202).send({ shortUrl });
});

app.post('/get-short', async (req, res) => {
	const completeUrl = await db.getURLEntity(req.body.shortUrl);
	if (!completeUrl) {
		res.status(404).send();
	}
	res.status(202).send({ url: completeUrl.original_url });
});

app.listen(process.env.PORT || 3000, () =>
	console.log(`Server running at http://localhost:${process.env.PORT || 3000}`)
);

module.exports = app;
