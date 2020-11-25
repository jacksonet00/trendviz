const express = require('express');
const Twit = require('twit');
const secret = require('./secret');
const firebase = require('./config/firebase');
const states = require('./config/states');
require('firebase/firestore');

const db = firebase.firestore();

const app = express();
const port = 5000;
const T = new Twit(secret);

const idList = {};
setTimeout(() => {
	console.log('refreshing...');
	states.forEach((stateObj) => {
		T.get('trends/place', { id: stateObj.woeid }, (err, data, response) => {
			db.collection("trends").add({
				state: stateObj.state,
				data,
			});
		}).then((docRef) => {
			idList[stateObj.state] = docRef;
		}).catch((err) => {
			res.send(201).status({
				'error': true,
				'message': err,
			});
		})
	});
	console.log('refresh completed.');
}, (15 * 60 *1000));

app.get('/tweets/:trend', (req, res) => {
	const { trend } = req.params;
	let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
	T.get('search/tweets', { q: `${trend} since:${yesterday.getFullYear}-${yesterday.getMonth()}-${yesterday.getDay()}`, count: 100 }, (err, data, response) => {
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
