import React, { useEffect, useState } from 'react';
import firebase from './config/firebase';

const App = () => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const db = firebase.firestore();
		let appData = {}
		db.collection("trends").get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				appData[doc.id] = doc.data();
			});
			setData(appData);
	  });
	  setLoading(false);
	}, []);

	return (
		<div>
			<h1>TrendViz!</h1>
			<p>Trend Viz Data</p>
			<p>==============</p>
			<pre>{JSON.stringify(data, 0, 3)}</pre>
		</div>
		);
};

export default App;
