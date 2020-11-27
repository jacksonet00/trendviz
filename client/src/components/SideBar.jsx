import React, { useEffect, useState } from 'react';
import fetchTweets from '../actions/fetchTweets';

const SideBar = ({ data, selectedState }) => {
   const [tweets, setTweets] = useState([]);

   useEffect(() => {
      async function fetchData(trend) {
         console.log('called');
         const tweetData = await fetchTweets(trend);
         setTweets(tweetData.data);
      }
      if(data[selectedState]) {
         fetchData(data[selectedState][0].name);
      }
   }, [data, selectedState]);

   return (
      <div>
         <h1>SideBar</h1>
         <h3>Top Trends</h3>
         <p>==========</p>
         {
            data[selectedState] ? <div>
               {data[selectedState].map((trend) => {
                  return <p>{trend.name}</p>
               })}
            </div> : <div></div>
         }
         <h3>Tweet Data</h3>
         <p>==========</p>
         <div>
         {
            tweets.map((tweet) => {
               return (
                  <div>
                     <p>{tweet.id}</p>
                  </div>
               );
            })
         }
         </div>
      </div>
   );
};

export default SideBar;