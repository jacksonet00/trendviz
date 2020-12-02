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
      <div style = {{"color" : "white"}}>
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
               <div style={{overflowY:"scroll", maxHeight: "600px"}}>
                  {
                     tweets.map((tweet, i) => {
                           return (
                              <Tweet tweet={tweet} key={i} />
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