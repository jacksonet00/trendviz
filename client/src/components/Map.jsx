import React from 'react';
import USAMap from "react-usa-map";
import "../constants/format.css";

const Map = (props) => {
  const { data } = props;
  var selectedMap;
   function mapHandler(event) {
      var stateName = event.target.dataset.name;
      selectedMap = stateName;
      props.onSelectState(stateName);  
     
      
   };
   const colorControl = () => {
   return{
      "NJ" : {
         fill: "navy"
      }};
   };

  return (
     <div>
      {           
         <div>
         {
            <USAMap onClick={mapHandler} customize={colorControl()}></USAMap>             
         }
         </div>
        }
     </div>
  );
};
export default Map;