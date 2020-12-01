import React from 'react';

const MenuBar = ({ data }) => {
   // TODO: display unique top trends
   return (
      <div>
         <div className="topBar" style={{backgroundColor: "black", display: "flex", justifyContent: "center", "color": "#5CDB95"}}> 
            <h1>TrendViz! <span role="img" aria-label="sheep">📈</span> </h1>
         </div>
      </div>
   );
};

export default MenuBar;