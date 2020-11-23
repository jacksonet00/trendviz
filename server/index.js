const express = require('express');
const Twit = require('twit');
const secret = require('./secret');
const firebase = require('./config/firebase');
require('firebase/firestore');

const db = firebase.firestore();

const app = express();
const port = 5000;
const T = new Twit(secret);

app.get('/users/:id', (req, res) => {
	const { id } = req.params;

	db.collection("users").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			 console.log(`${doc.id} => ${doc.data()}`);
		});
  	});
	res.status(200).send({});
})

app.post('/trends/:state', (req, res) => {
	db.collection("users").add({})
	.then(function(docRef) {
		console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
		console.error("Error adding document: ", error);
	});
	res.status(200).send({});
});


app.get('/trends/NYC', (req, res) => {
	T.get('trends/place', { id: 2459115 }, function(err, data, response) {
		console.log(data)
		console.log(data[0].trends[0])
	 })
	res.status(200).send('test');
});

app.get('/', (req, res) => {
	res.status(200).send('Trendviz');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
