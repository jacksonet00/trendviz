import firebase from 'firebase'
import config from './config';

const app = firebase.default.initializeApp(config);

export default app;  
