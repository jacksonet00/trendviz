import React, { useEffect, useState } from 'react';
import firebase from './config/firebase';
import Map from './components/Map';
import SideBar from './components/SideBar';
import MenuBar from './components/MenuBar';
import Loading from './components/Loading';

const App = () => {
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const [selectedState, setSelectedState] = useState('');
	
	useEffect(() => {
		const db = firebase.firestore();
		let appData = {}
		db.collection("trends").get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				if (doc.data().data.length > 0) {
					appData[doc.data().state] = doc.data().data[0].trends;
				}
			});
			setData(appData);
			setIsLoading(false);
	  });
	}, []);

	return(
		<div>
			{isLoading ? <Loading/> : 
				<div>
					{selectedState !== '' ? <h1>Selected State: {selectedState}</h1> : <h1>No State Selected</h1>}
					<div>
						<MenuBar data={data} />
					</div>
					<div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr' }}>
						<Map data={data} selectedState={selectedState} onSelectState={(stateCode) => setSelectedState(stateCode)}/>
						<SideBar data={data} selectedState={selectedState} />
					</div>
				</div>
			}
		</div>
	)
};

export default App;
