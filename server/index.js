const express = require('express');
const Twit = require('twit');
const config = require('./config');

const app = express();
const port = 5000;
const T = new Twit(config);

// search for tweeets contianing: 'banana'
app.get('/trends/NYC', (req, res) => {
	T.get('trends/place', { id: 2459115 }, function(err, data, response) {
		console.log(data)
		console.log(data[0].trends[0])
	 })
	res.status(200).send('test');
})

app.get('/trends/eagles', (req, res) => {
	T.get('search/tweets', { })
})

app.get('/', (req, res) => {
	res.status(200).send('Trendviz');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
