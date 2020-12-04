import React from 'react';
import Chip from '@material-ui/core/Chip';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
   topBar: {
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      color: '#5CDB95',
   },
   chip: {
      fontWeight: 'bold',
      color: 'white',
   }
}));

const MenuBar = ({ data }) => {
   const classes = useStyles();

   return (
      <div>
         <div className={classes.topBar}> 
            <h1>TrendViz! <span role="img" aria-label="sheep">📈</span> </h1>
            <Grid container spacing={1}>
               {
                  Object.keys(data).map((trend) => {
                     return ( 
                        <Grid item key={trend} >
                           <Chip className={classes.chip} label={trend} style={{ backgroundColor: data[trend].color }} />
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