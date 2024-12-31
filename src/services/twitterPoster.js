import { formatNewsForTwitter, formatPriceForTwitter } from '../utils/formatters.js';

export async function postNewsToTwitter(twitterClient, news) {
  try {
    const formattedTweet = formatNewsForTwitter(news);
    await twitterClient.v2.tweet(formattedTweet);
  } catch (error) {
    console.error('Failed to post news to Twitter:', error);
  }
}

export async function postPriceToTwitter(twitterClient, coin, price) {
  try {
    const formattedTweet = formatPriceForTwitter(coin, price);
    await twitterClient.v2.tweet(formattedTweet);
  } catch (error) {
    console.error('Failed to post price to Twitter:', error);
  }
}