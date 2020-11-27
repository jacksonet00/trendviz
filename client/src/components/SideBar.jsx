import React, { useState } from 'react';
import fetchTweets from '../actions/fetchTweets';

const SideBar = ({ data }) => {
   const [tweets, setTweets] = useState([]);
   const [searchString, setSearchString] = useState('');

   return (
      <div>
         <h1>SideBar</h1>
         <input
			type="text"
			placeholder="trend name"
			value={searchString}
			onChange={(e) => setSearchString(e.target.value)}></input>
         <button onClick={async () => {
            setTweets(await fetchTweets(searchString));
         }}>Fetch Tweets</button>
         <h3>Tweet Data</h3>
         <p>==========</p>
         <pre>{JSON.stringify(tweets, 0, 3)}</pre>
         <pre>data: {JSON.stringify(data, 0, 3)}</pre>
      </div>
   );
};

export default SideBar;