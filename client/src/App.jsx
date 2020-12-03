import React, { useEffect, useState } from 'react';
import firebase from './config/firebase';
import { codes } from './data/states';
import { colors } from './data/colors';
import Map from './components/Map';
import SideBar from './components/SideBar';
import MenuBar from './components/MenuBar';
import Loading from './components/Loading';

const App = () => {
	const [data, setData] = useState({});
	const [data2, setData2] = useState({});
	const [data3, setData3] = useState({});
	const [mapData, setMapData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [selectedState, setSelectedState] = useState('FL');
	const [selectedTrend, setSelectedTrend] = useState('');
	
	useEffect(() => {
		const db = firebase.firestore();
		let appData = {};
		let appData2 = {};
		let appData3 = {};
		let appMapData = {};

		db.collection("trends").get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				if (doc.data().data.length > 0) {
					appData[doc.data().state] = doc.data().data[0].trends;
					appData3[doc.data().state] = doc.data().data[0].trends.map(t => t.name);
					
					const appData2Set = new Set();
					doc.data().data[0].trends.map(t => t.name).forEach((trend) => {
						appData2Set.add(trend);
					});
					appData2[doc.data().state] = appData2Set;
				}
			});
			codes.forEach((stateCode) => {
				// 1. check if stateCode is in appData
				if(!appData.hasOwnProperty(stateCode)) {
					// 2. if not fill with default data
					appData[stateCode] = [];
				}
			});
			let colorCount = 0;
			Object.entries(appData3).forEach((entry) => {
				if (!appMapData.hasOwnProperty(entry[1][0])) {
					appMapData[entry[1][0]] = { states: [], color: colors[colorCount++] };
				}
				appMapData[entry[1][0]].states.push(entry[0]);
			});
			setData(appData);
			setData2(appData2);
			setData3(appData3);
			setMapData(appMapData);
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
		<div style={{ maxHeight: '100vh', overflow: 'hidden'}}>
			{isLoading ? <Loading /> : 
				<div>
					<div>
						<MenuBar
							data={mapData}
						/>
					</div>
					<div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr' }}>
						<Map
							data={mapData}
							selectedState={selectedState}
							onSelectState={(stateCode) => setSelectedState(stateCode)}
						/>
						<div style={{backgroundColor : "#3E3C41"}}>
							<SideBar
								dataHt={data3}
								dataSet={data2}
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
