import React from 'react';
import USAMap from "react-usa-map";
import "../constants/format.css";

const Map = (props) => {
  const { data, selectedState } = props;
   function mapHandler(event) {
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
     <div style={{ backgroundColor: 'black', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
         <USAMap onClick={mapHandler} customize={colorControl()}></USAMap>             
     </div>
  );
};
export default Map;