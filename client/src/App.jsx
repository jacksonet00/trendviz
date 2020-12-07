import React, { useEffect, useState } from 'react';
import firebase from './config/firebase';
import { colors } from './data/colors';
import Map from './components/Map';
import SideBar from './components/SideBar';
import MenuBar from './components/MenuBar';
import Loading from './components/Loading';
import NoData from './components/NoData';
import { makeStyles } from '@material-ui/core';
import './constants/formatPage.css';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		height: '100vh',
		maxHeight: '100vh',
		width: '100vw',
		maxWidth: '100vw',
		overflow: 'hidden',
		backgroundColor: 'black',
		color: 'white',
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: '3fr 1fr',
		height: '85vh',
		maxHeight: '85vh',
		overflow: 'hidden'
	},
	content: {
		backgroundColor: 'black',
	},
	menuBarContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '25vh',
		width: '75vw',
		zIndex: 10,
	},
	sideBarContainer: {
		position: 'absolute',
		right: 0,
		top: 0,
		height: '100vh',
		width: '25vw',
		borderLeft: '5px solid white'
	},
	mapContainer: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		width: '75vw',
		height: '80vh',
		zIndex: 1,
	}
}));

const App = () => {
	const [dataSet, setDataSet] = useState({});
	const [dataHt, setDataHt] = useState({});
	const [mapData, setMapData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [noData, setNoData] = useState(true);
	const [selectedState, setSelectedState] = useState('FL');
	const [selectedTrend, setSelectedTrend] = useState('');

	const classes = useStyles();
	
	useEffect(() => {
		const db = firebase.firestore();
		let appdataSet = {};
		let appDataHt = {};
		let appMapData = {};

		db.collection("trends").get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				if (doc.data().data.length > 0) {
					appDataHt[doc.data().state] = doc.data().data;
					
					const subset = new Set();
					doc.data().data.forEach((trend) => {
						subset.add(trend);
					});
					appdataSet[doc.data().state] = subset;
				}
			});
			let colorCount = 0;
			Object.entries(appDataHt).forEach((entry) => {
				if (!appMapData.hasOwnProperty(entry[1][0])) {
					appMapData[entry[1][0]] = { states: [], color: colors[colorCount++] };
				}
				appMapData[entry[1][0]].states.push(entry[0]);
			});
			setDataSet(appdataSet);
			setDataHt(appDataHt);
			setMapData(appMapData);
			setNoData(false)
			setIsLoading(false);
	  }).catch((err) => {
		  setDataSet({});
		  setDataHt({});
		  setMapData({});
		  setNoData(true);
		  setIsLoading(false);
	  });
	}, []);

	useEffect(() => {
      if (dataHt[selectedState] && dataHt[selectedState].length > 0) {
         setSelectedTrend(dataHt[selectedState][0]);
		}
		else if (dataHt[selectedState] && dataHt[selectedState].length === 0) {
			setSelectedTrend('No Data');
		}
	}, [dataHt, selectedState]);

	const render = () => {
		if (isLoading) return <Loading />;
		if (noData) return <NoData />;
		return (
			<div className={classes.content}>
					<div className={classes.menuBarContainer}>
						<MenuBar
							data={mapData}
						/>
					</div>
					<div className={classes.grid}>
						<div className={classes.mapContainer}>
							<Map
								data={mapData}
								selectedState={selectedState}
								onSelectState={(stateCode) => setSelectedState(stateCode)}
							/>
						</div>
						<div className={classes.sideBarContainer}>
							<SideBar
								dataHt={dataHt}
								dataSet={dataSet}
								selectedState={selectedState}
								selectedTrend={selectedTrend}
								onSelectTrend={(trend) => setSelectedTrend(trend)}
							/>
						</div>
					</div>
				</div>
		);
	}

	return(
		<div className={classes.root}>
			{render()}
		</div>
	)
};

export default App;
