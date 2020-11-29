import axios from 'axios';
import { URL } from '../constants/url';

const fetchTweets = async (_trend) => {
   let trend = _trend;
   if (_trend.charAt(0) === '#') {
      trend = _trend.substring(1, _trend.length);
   }
   const tweets = await axios.get(
      `${URL}/tweets/${trend}`).then((res) => {
         return res.data;
      });
   return tweets;
};

export default fetchTweets;