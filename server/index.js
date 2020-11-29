const express = require('express');
const firebase = require('./config/firebase');
require('firebase/firestore');
const Twit = require('twit');
const cors = require('cors');
const states = require('./data/states');
const { secret } = require('./secret');
const { yesterdaysDate } = require('./functions/date');

const app = express();
const db = firebase.firestore();
const T = new Twit(secret);

app.use(cors());

const port = 5000;

setTimeout(() => {
	console.log('refreshing trend data...');
	states.forEach((stateObj) => {
		T.get('trends/place', { id: stateObj.woeid, }, (err, data, response) => {
			db.collection("trends").add({
				state: stateObj.stateCode,
				data,
			});
		});
	});
	console.log('refresh completed.');
}, (15 * 60 * 1000));

app.get('/tweets/:trend', (req, res) => {
	const { trend } = req.params;
	console.log(`fetching tweets about ${trend} since ${yesterdaysDate()}`);
	T.get('search/tweets', { q: `${trend} since:${yesterdaysDate()}`, count: 100, }, (err, data, response) => {
		if (err) {
			return res.status(201).send({
				error: true,
				err,
			});
		}
		return res.status(200).send({
			error: false,
			data: data.statuses,
		});
	});
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
