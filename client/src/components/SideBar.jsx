import React, { useEffect, useState } from 'react';
import fetchTweets from '../actions/fetchTweets';

const SideBar = (props) => {
   const { data, selectedState, selectedTrend } = props;
   const [tweets, setTweets] = useState([]);

   useEffect(() => {
      async function fetchData(trend) {
         const tweetData = await fetchTweets(trend);
         setTweets(tweetData.data);
      }
      if(selectedTrend !== '') {
         fetchData(selectedTrend);
      }
   }, [data, selectedTrend]);

   return (
      <div>
         <h1>SideBar</h1>
         {
            selectedTrend === '' ? <></> :
            <div>
               <h3>Top Trends</h3>
               <p>==========</p>
               {
                  data[selectedState] ? <div>
                     {data[selectedState].map((trend, i) => {
                        if (i < 5) {
                           return <p style={{ cursor: 'pointer' }} key={i} onClick={() => props.onSelectTrend(trend.name)}>{trend.name}</p>
                        }
                        return <></>
                     })}
                  </div> : <div></div>
               }
               <h3>Top Tweets about {selectedTrend}</h3>
               <p>==========</p>
               <div>
                  {
                     tweets.map((tweet) => {
                        return (
                           <div key={tweet.id}>
                              <p>{tweet.id}</p>
                           </div>
                        );
                     })
                  }
               </div>
            </div>
         }
      </div>
   );
};

export default SideBar;