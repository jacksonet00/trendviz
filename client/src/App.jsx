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
	const [selectedTrend, setSelectedTrend] = useState('');
	
	useEffect(() => {
		const db = firebase.firestore();
		let appData = {}
		db.collection("trends").get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				if (doc.data().data.length > 0) {
					appData[doc.data().state] = doc.data().data[0].trends;
				}
			});
			// TODO: sort trend data by tweet volume
			setData(appData);
			setIsLoading(false);
	  });
	}, []);

	useEffect(() => {
      if(data[selectedState]) {
         setSelectedTrend(data[selectedState][0].name);
      }
	}, [data, selectedState]);

	return(
		<div>
			{isLoading ? <Loading /> : 
				<div>
					<div>
						<MenuBar
							data={data}
						/>
						{selectedState !== '' ? <h1>Selected State: {selectedState} | Selected Trend: {selectedTrend}</h1> : <h1>No State Selected</h1>}
					</div>
					<div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr' }}>
						<Map
							data={data}
							selectedState={selectedState}
							onSelectState={(stateCode) => setSelectedState(stateCode)}
						/>
						<SideBar
							data={data}
							selectedState={selectedState}
							selectedTrend={selectedTrend}
							onSelectTrend={(trend) => setSelectedTrend(trend)}
						/>
					</div>
				</div>
			}
		</div>
	)
};

export default App;
