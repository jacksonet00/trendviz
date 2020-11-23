const firebase = require('firebase');
const config = require('./config');

const app = firebase.default.initializeApp(config);

module.exports = app;