import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
   root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '5vh',
   }
}));

export default function NoData() {
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <Typography variant="h2" align="center">TrendViz <span role="img" aria-label="sheep">🐦</span></Typography>
         <Typography variant="body1" align="center">
            Sorry, no data at this time.
            <br />
            Please come back soon.
         </Typography>
      </div>
   );
}