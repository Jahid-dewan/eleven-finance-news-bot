import { TwitterApi } from 'twitter-api-v2';
import { formatNewsForTwitter } from '../utils/formatters.js';

export function startTwitterBot() {
  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
  });

  console.log('Twitter bot started successfully');
  return client;
}