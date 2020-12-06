import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   centerContent: {
      paddingLeft: '1em',
      paddingRight: '1em'
   },
   selfCenter: {
      justifyContent: 'center',
      width: '100%'
   },
}));

export default function Tweet({ tweet }) {
   const classes = useStyles();

   return (
      <div className={classes.centerContent}>
         <div className={classes.selfCenter}>
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