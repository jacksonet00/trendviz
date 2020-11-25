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

app.get('/trend/:stateCode', (req, res) => {
	const { stateCode } = req.params;
	console.log('fetching...');
	db.collection("trends").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			console.log(`${stateCode}: ${idList[stateCode]}`)
			if (doc.ref == idList[stateCode]) {
				res.status(200).send(doc.data());
			}
		});
	});
	res.status(201).send({
		error: true,
		message: 'no data found'
	});
	console.log('fetching completed.');
});

app.get('/', (req, res) => {
	res.status(200).send('Trendviz');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
