import React from 'react';

const MenuBar = ({ data }) => {
   // TODO: display unique top trends
   return (
      <div style={{borderBottom: "5px solid white"}}>
         <div className="topBar" style={{backgroundColor: "black", display: "flex", justifyContent: "center"}}> 
            <h1>TrendViz! <span role="img" aria-label="trend">📈</span> </h1>
         </div>
      </div>
   );
};

export default MenuBar;