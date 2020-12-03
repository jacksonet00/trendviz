import React from 'react';
import Chip from '@material-ui/core/Chip';
import { Grid } from '@material-ui/core';

const MenuBar = ({ data }) => {
   // TODO: display unique top trends
   return (
      <div>
         <div className="topBar" style={{backgroundColor: "black", display: "flex", justifyContent: "center", "color": "#5CDB95"}}> 
            <h1>TrendViz! <span role="img" aria-label="sheep">📈</span> </h1>
            <Grid container spacing={1}>
               {
                  Object.keys(data).map((trend) => {
                     return ( 
                        <Grid item key={trend} >
                           <Chip label={trend} style={{ fontWeight: 'bold', color: 'white', backgroundColor: data[trend].color }} />
                        </Grid>
                     );
                  })
               }
            </Grid>
         </div>
      </div>
   );
};

export default MenuBar;