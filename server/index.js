const express = require('express');
const Twit = require('twit');
const { secret } = require('./secret');
const firebase = require('./config/firebase');
const states = require('./data/states');
const cors = require('cors');
require('firebase/firestore');

const db = firebase.firestore();

const app = express();
app.use(cors());
const port = 5000;
const T = new Twit(secret);

const idList = {};
setTimeout(() => {
	console.log('refreshing...');
	states.forEach((stateObj) => {
		T.get('trends/place', { id: stateObj.woeid }, (err, data, response) => {
			db.collection("trends").add({
				state: stateObj.stateCode,
				data,
			});
		}).then((docRef) => {
			idList[stateObj.stateCode] = docRef;
		}).catch((err) => {
			res.send(201).status({
				'error': true,
				'message': err,
			});
		})
	});
	console.log('refresh completed.');
}, (15 * 60 *1000));

// TODO: change date to past week.
app.get('/tweets/:trend', (req, res) => {
	console.log('fetching tweets')
	const { trend } = req.params;
	T.get('search/tweets', { q: `${trend} since:2020-03-09`, count: 100 }, (err, data, response) => {
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

app.get('/', (req, res) => {
	res.status(200).send('Trendviz');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
