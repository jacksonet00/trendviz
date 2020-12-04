import { makeStyles } from '@material-ui/core';
import React from 'react';
import USAMap from "react-usa-map";
import "../constants/formatMap.css";

const useStyles = makeStyles((theme) => ({
   mapContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
         <USAMap onClick={mapHandler} customize={colorControl()}></USAMap>             
     </div>
  );
};
export default Map;