import { TwitterApi } from 'twitter-api-v2';
import { BOT_CONFIG } from '../config/constants.js';
import { aggregateNews } from './newsAggregator.js';
import { formatNewsTweet } from '../utils/tweetFormatter.js';

export class TwitterBot {
  constructor(credentials) {
    this.client = new TwitterApi(credentials);
    this.lastTweetTime = 0;
    this.tweetCount = 0;
  }

  async start() {
    // Start news posting schedule
    setInterval(() => this.postNews(), BOT_CONFIG.newsInterval);
    
    // Start engagement schedule
    setInterval(() => this.engageWithUsers(), BOT_CONFIG.engagementInterval);
    
    console.log(`${BOT_CONFIG.name} bot started successfully`);
  }

  async postNews() {
    try {
      const news = await aggregateNews();
      if (!news.length) return;

      // Post the most recent news item
      const latestNews = news[0];
      const tweet = formatNewsTweet(latestNews);
      await this.client.v2.tweet(tweet);

      this.lastTweetTime = Date.now();
      this.tweetCount++;

      console.log(`Posted news: ${latestNews.title}`);
    } catch (error) {
      console.error('Error posting news:', error);
    }
  }

  async engageWithUsers() {
    try {
      // Search for relevant tweets to engage with
      const tweets = await this.client.v2.search(
        'crypto OR bitcoin OR ethereum -is:retweet'
      );

      for (const tweet of tweets.data) {
        // Like the tweet
        await this.client.v2.like(tweet.id);
        
        // Reply with relevant news if available
        const news = await aggregateNews();
        if (news.length) {
          const reply = `Here's the latest crypto news for you!\n\n${formatNewsTweet(news[0])}`;
          await this.client.v2.reply(reply, tweet.id);
        }
      }
    } catch (error) {
      console.error('Error engaging with users:', error);
    }
  }
}