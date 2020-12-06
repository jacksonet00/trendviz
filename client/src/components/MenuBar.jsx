import React from 'react';
import Chip from '@material-ui/core/Chip';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
   topBar: {
      width: '70vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   chip: {
      fontWeight: 'bold',
      color: 'white',
   },
   keys: {
      padding: '15px',
   },
   center: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
}));

const MenuBar = ({ data }) => {
   const classes = useStyles();

   return (
      <div style={{ display: 'flex', paddingLeft: '5vw'}}>
         <div className={classes.topBar}> 
            <Container className={classes.center}>
               <Typography variant="h2">TrendViz <span role="img" aria-label="sheep">🐦</span></Typography>
            </Container>
            <Grid container spacing={1} className={classes.keys}>
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