import axios from 'axios';

const fetchTweets = async (_trend) => {
   let trend = _trend;
   if (_trend.charAt(0) === '#') {
      trend = _trend.substring(1, _trend.length);
   }
   const tweets = await axios.get(
      `http://localhost:5000/tweets/${trend}`).then((res) => {
         return res.data;
      });
   return tweets;
};

export default fetchTweets;