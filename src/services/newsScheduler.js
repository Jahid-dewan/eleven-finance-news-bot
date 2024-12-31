import cron from 'node-cron';
import { fetchCryptoNews } from '../utils/cryptoApi.js';
import { broadcastNews } from '../utils/broadcast.js';
import { postNewsToTwitter } from './twitterPoster.js';

export function setupCryptoNewsScheduler(telegramBot, twitterClient) {
  // Post news every 2 hours
  cron.schedule('0 */2 * * *', async () => {
    try {
      const news = await fetchCryptoNews();
      await broadcastNews(telegramBot, news);
      
      // Post each news item to Twitter
      for (const newsItem of news) {
        await postNewsToTwitter(twitterClient, newsItem);
        // Wait 2 minutes between tweets to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 120000));
      }
    } catch (error) {
      console.error('Error in news scheduler:', error);
    }
  });
}