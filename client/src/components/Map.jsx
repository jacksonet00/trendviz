import { makeStyles } from '@material-ui/core';
import React from 'react';
import USAMap from "react-usa-map";
import "../constants/formatMap.css";

const useStyles = makeStyles((theme) => ({
   mapContainer: {
      marginTop: '5vh',
      marginLeft: '5vw'
   }
}));

const Map = (props) => {
  const { data, selectedState } = props;
  
  const classes = useStyles();

  const mapHandler = (event) => {
      var stateName = event.target.dataset.name;
      props.onSelectState(stateName);  
   };

   const colorControl = () => {
      const colorObj = {};
      Object.keys(data).forEach((trend) => {
         data[trend].states.forEach((state) => {
            if (state === selectedState) {
               colorObj[state] = { fill: 'grey' };
            } else {
               colorObj[state] = { fill: data[trend].color};
            }
         })
      });
      return colorObj;
   };

  return (
     <div className={classes.mapContainer}>
         <USAMap onClick={mapHandler} customize={colorControl()} width="65vw" height="70vh"></USAMap>             
     </div>
  );
};
export default Map;