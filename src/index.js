import dotenv from 'dotenv';
import { TwitterBot } from './services/twitterBot.js';

dotenv.config();

const credentials = {
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
};

async function startBot() {
  const bot = new TwitterBot(credentials);
  await bot.start();
}

startBot().catch(console.error);