import React, { useEffect, useState } from 'react';
import firebase from './config/firebase';
import { codes } from './data/states';
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
			codes.forEach((stateCode) => {
				// 1. check if stateCode is in appData
				if(!appData.hasOwnProperty(stateCode)) {
					// 2. if not fill with default data
					appData[stateCode] = [];
				}
			})
			setData(appData);
			setIsLoading(false);
	  });
	}, []);

	useEffect(() => {
      if (data[selectedState] && data[selectedState].length > 0) {
         setSelectedTrend(data[selectedState][0].name);
		}
		else if (data[selectedState] && data[selectedState].length === 0) {
			setSelectedTrend('No Data');
		}
	}, [data, selectedState]);

	return(
		<div>
			{isLoading ? <Loading /> : 
				<div style = {{"color" : "white", backgroundColor : "black"}}>
					<div style={{border: "5px solid white"}}>
						<MenuBar
							data={data}
						/>
						<div style={{paddingLeft: "10px"}}>
							{selectedState !== '' ? <h1>Selected State: {selectedState} | Selected Trend: {selectedTrend}</h1> : <h1>No State Selected</h1>}
						</div>
					</div>
					<div style={{borderLeft: "5px solid white", borderRight: "5px solid white", borderBottom: "5px solid white",display: 'grid', gridTemplateColumns: '3fr 1fr' }}>
						<Map
							data={data}
							selectedState={selectedState}
							onSelectState={(stateCode) => setSelectedState(stateCode)}
						/>
						<div style={{borderLeft: "5px solid white"}}>
							<SideBar
								data={data}
								selectedState={selectedState}
								selectedTrend={selectedTrend}
								onSelectTrend={(trend) => setSelectedTrend(trend)}
							/>
						</div>
					</div>
				</div>
			}
		</div>
	)
};

export default App;
