import React, { useEffect, useState } from 'react';
import fetchTweets from '../actions/fetchTweets';
import {TwitterTweetEmbed} from 'react-twitter-embed';
import Loading from './Loading'


const SideBar = (props) => {
   const { data, selectedState, selectedTrend } = props;
   const [tweets, setTweets] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   // const [isPressed, setIsPressed] = useState("normal");

   // const changeWeight = (trend) => {
   //    (trend.style.fontWeight === "normal") ? setIsPressed("bold") : setIsPressed("bold")
   // }

   useEffect(() => {
      setIsLoading(true);
      async function fetchData(trend) {
         const tweetData = await fetchTweets(trend);
         setTweets(tweetData.data);
         setIsLoading(false);
      }
      if(selectedTrend !== 'No Data') {
         fetchData(selectedTrend);
      }
   }, [data, selectedTrend]);

   return (
      <div style={{paddingLeft: "10px"}}>
         {
            selectedTrend === 'No Data' ? <></> :
            <div>
               <h2>Trending Now <span role="img" aria-label="fire">🔥</span></h2>
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
               <div style={{overflowY:"scroll", maxHeight: "600px"}}>
                  {
                     tweets.map((tweet) => {
                        if (!isLoading) {
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
                        else {
                           return <Loading />
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