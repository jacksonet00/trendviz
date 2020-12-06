import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import { makeStyles, Typography } from '@material-ui/core';
import Tweet from './Tweet';
import fetchTweets from '../actions/fetchTweets';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
   root: {
      paddingLeft: '10px',
      margin: '0',
      overflow: 'hidden'
   },
   title: {
      paddingBottom: '1vh',
      fontSize: '2vw'
   },
   buttonGroup: {
      paddingBottom: '1vh',
   },
   selectionSection: {
      height: '45vh',
   },
   tweetsContainer: {
      overflow: 'scroll',
      height: '100%',
      maxHeight: '50vh',
   },
   trendContainer: {
      textIndent: '30px',
   },
   trend: {
      fontSize: '18px',
      cursor: 'pointer',
      paddingBottom: '1vh',
   },
   trendSelected: {
      fontSize: '18px',
      cursor: 'pointer',
      paddingBottom: '1vh',
      fontWeight: 'bold',
   },
   tweetsHeading: {
   },
}));

export default function SideBar(props) {
   const { dataHt, dataSet, selectedState, selectedTrend, } = props;

   const [toggleSet, setToggleSet] = useState(false);
   const [tweets, setTweets] = useState([]);
   const [similarity, setSimilarity] = useState({});

   const classes = useStyles();

   useEffect(() => {
      async function fetchData(trend) {
         const tweetData = await fetchTweets(trend);
         setTweets(tweetData.data);
      }
      if(selectedTrend !== 'No Data' && selectedTrend !== '' && selectedTrend !== undefined) {
         fetchData(selectedTrend);
      }
   }, [selectedTrend]);

   useEffect(() => {
      let t0 = 0;
      let t1 = 0;
      if (!toggleSet && dataHt !== {} && selectedState !== 'No Data' && selectedState !== '') {
         t0 = performance.now();
         let mostSimilarState = '';
         let maxSimilarity = 0;
         Object.keys(dataHt).forEach((state) => {
            let currSimilarity = 0;
            if (state !== selectedState) {
               dataHt[selectedState].forEach((trend, i) => {
                  if (dataHt[state].includes(trend)) {
                     currSimilarity++;
                  }
               });
               if (currSimilarity > maxSimilarity) {
                  maxSimilarity = currSimilarity;
                  mostSimilarState = state;
               }
            }
         });
         t1 = performance.now();
         setSimilarity({
            state: mostSimilarState,
            percentage: ((maxSimilarity / dataHt[selectedState].length) * 100).toFixed(0),
            time: (t1 - t0).toFixed(4),
         });
      } else if (toggleSet && dataSet !== {} && selectedState !== 'No Data' && selectedState !== '') {
         t0 = performance.now();
         let mostSimilarState = '';
         let maxSimilarity = 0;
         Object.keys(dataSet).forEach((state) => {
            if (state !== selectedState) {
               let a = dataSet[selectedState];
               let b = dataSet[state];
               console.log(a, b);
               let intersection = new Set([...dataSet[selectedState]].filter((trend) => {
                  return dataSet[state].has(trend);
               }));
               if (intersection.size > maxSimilarity) {
                  maxSimilarity = intersection.size;
                  mostSimilarState = state;
               }
            }
         });
         t1 = performance.now();
         setSimilarity({
            state: mostSimilarState,
            percentage: ((maxSimilarity / dataSet[selectedState].size) * 100).toFixed(0),
            time: (t1 - t0).toFixed(4),
         });
      }
   }, [toggleSet, selectedState, dataHt, dataSet]);

   return (
      <List className={classes.root}>
         {
            selectedTrend === 'No Data' || selectedTrend === '' || selectedTrend === undefined ? <></> :
            <List>
               <div className={classes.selectionSection}>
                     <Typography className={classes.title} variant="h4">Trending Now <span role="img" aria-label="fire">🔥</span> in {selectedState}</Typography>
                     <ButtonGroup className={classes.buttonGroup} color="primary">
                        <Button variant={toggleSet ? '' : 'contained'} onClick={() => setToggleSet(false)}>Hash Table</Button>
                        <Button variant={toggleSet ? 'contained' : ''} onClick={() => setToggleSet(true)}>Set</Button>
                     </ButtonGroup>
                     <Typography variant="h6">{similarity.state} is {similarity.percentage}% Similar</Typography>
                     <Typography variant="subtitle1">(Found in {similarity.time}ms)</Typography>
                  {dataHt[selectedState] && (
                        <List className={classes.trendContainer}>
                           {dataHt[selectedState].map((trend, i) => {
                              if (i < 5) { 
                                 return (
                                    <Typography
                                       variant="body1"
                                       className={selectedTrend !== trend ? classes.trend : classes.trendSelected}
                                       key={trend}
                                       onClick={() => {props.onSelectTrend(trend)}}
                                    > 
                                       <span role="img" aria-label="fire">🔥</span>{trend}
                                    </Typography>
                                 )
                              }
                              return <></>
                           })}
                        </List>
                     )}
                  <Typography className={classes.tweetsHeading} variant="h5">Top Tweets about {selectedTrend}</Typography>
               </div>
               <List className={classes.tweetsContainer}>
                  {
                     tweets.map((tweet, i) => {
                           return <Tweet tweet={tweet} key={tweet.id} />;
                     })
                  }
               </List>
            </List>
         }
      </List>
   );
};
