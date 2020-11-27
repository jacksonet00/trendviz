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
         <h3>Tweet Data</h3>
         <p>==========</p>
         <pre>{JSON.stringify(tweets, 0, 3)}</pre>
      </div>
   );
};

export default SideBar;