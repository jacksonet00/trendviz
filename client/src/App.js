import React, { useEffect, useState } from 'react';
import firebase from './config/firebase';
import fetchTweets from './data/fetchTweets';

const App = () => {
	const [data, setData] = useState({});
	const [tweets, setTweets] = useState([]);
	const [searchString, setSearchString] = useState('');
	
	useEffect(() => {
		const db = firebase.firestore();
		let appData = {}
		db.collection("trends").get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				appData[doc.id] = doc.data();
			});
			setData(appData);
	  });
	}, []);

	return (
		<div>
			<h1>TrendViz!</h1>
			<p>Trend Viz Data</p>
			<p>==============</p>
			<input
				type="text"
				placeholder="trend name"
				value={searchString}
				onChange={(e) => setSearchString(e.target.value)}></input>
			<button onClick={async () => {
				setTweets(await fetchTweets(searchString));
			}}>Fetch Tweets</button>
			<h3>Tweet Data</h3>
			<p>==========</p>
			<pre>{JSON.stringify(tweets, 0, 3)}</pre>
			<h3>Trend Data</h3>
			<p>==========</p>
			<pre>{JSON.stringify(data, 0, 3)}</pre>

		</div>
		);
};

export default App;
