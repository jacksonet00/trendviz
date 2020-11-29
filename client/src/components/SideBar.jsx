import React, { useEffect, useState } from 'react';
import fetchTweets from '../actions/fetchTweets';
import {TwitterTweetEmbed} from 'react-twitter-embed';


const SideBar = (props) => {
   const { data, selectedState, selectedTrend } = props;
   const [tweets, setTweets] = useState([]);

   useEffect(() => {
      async function fetchData(trend) {
         const tweetData = await fetchTweets(trend);
         setTweets(tweetData.data);
      }
      if(selectedTrend !== 'No Data') {
         fetchData(selectedTrend);
      }
   }, [data, selectedTrend]);

   return (
      <div>
         <h1>SideBar</h1>
         {
            selectedTrend === 'No Data' ? <></> :
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
                     tweets.map((tweet, j) => {
                        if (j < 3) {
                           return (
                              <div className="centerContent">
                                 <div className="selfCenter">
                                    <TwitterTweetEmbed 
                                       tweetId={tweet.id_str}
                                       theme="dark"
                                       options={{
                                          cards: 'hidden',
                                          width: 300,
                                          maxWidth: 800,
                                       }}
                                    />
                                 </div>
                              </div>
                           );
                        }
                        else
                        {
                           j = 100
                        }
                     })
                  }
               </div>
            </div>
         }
      </div>
   );
};

export default SideBar;