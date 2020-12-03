import React, { useEffect, useState } from 'react';
import fetchTweets from '../actions/fetchTweets';
import {TwitterTweetEmbed} from 'react-twitter-embed';
import List from '@material-ui/core/List';

const SideBar = (props) => {
   const { dataHt, dataSet, selectedState, selectedTrend, } = props;
   const [toggleSet, setToggleSet] = useState(false);
   const [tweets, setTweets] = useState([]);
   const [similarity, setSimilarity] = useState({});

   useEffect(() => {
      async function fetchData(trend) {
         const tweetData = await fetchTweets(trend);
         setTweets(tweetData.data);
      }
      if(selectedTrend !== 'No Data' && selectedTrend !== '') {
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
      <div style={{paddingLeft: "10px"}}>
         {
            selectedTrend === 'No Data' || selectedTrend === '' ? <></> :
            <div>
               <h2>Trending Now <span role="img" aria-label="fire">🔥</span></h2>
               <button onClick={() => setToggleSet(!toggleSet)}>{toggleSet ? 'Use Hashtable' : 'Use Set'}</button>
               <h2>{similarity.state} is {similarity.percentage}% Similar (Found in {similarity.time}ms)</h2>
               {
                  data[selectedState] ? <div style = {{textIndent: "30px", paddingBottom: "10px"}}>
                     {data[selectedState].map((trend, i) => {
                        if (i < 5) { 
                           return <p style={{fontSize: "18px", cursor: 'pointer', fontWeight: selectedTrend === trend.name ? "bold" : "normal"}} key={i} onClick={() => {props.onSelectTrend(trend.name)}}> <span role="img" aria-label="fire">🔥</span>{trend.name}</p>
                        }
                        return <></>
                     })}
                  </div> : <div></div>
               }
               <h2>Top Tweets about {selectedTrend}</h2>
               <p>==========</p>
               <List style={{ overflowY: 'scroll', minHeight: '500px', maxHeight: '500px' }}>
                  {
                     tweets.map((tweet, i) => {
                           return (
                              <Tweet
                                 tweet={tweet}  
                                 key={i}
                              />
                           );
                     })
                  }
               </List>
            </div>
         }
      </div>
   );
};

export default SideBar;

function Tweet({ tweet }) {
   return (
      <div className="centerContent" key = {tweet.id} style= {{paddingLeft: '1em', paddingRight: '1em'}}>
         <div className="selfCenter" style={{justifyContent: 'center', width: '100%'}}>
            <TwitterTweetEmbed 
               tweetId={tweet.id_str}
               options={{
                  cards: 'hidden',
                  theme: 'dark'
               }}
            />
         </div>
      </div>
   );
}