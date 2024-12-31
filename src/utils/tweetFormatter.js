import { HASHTAGS } from '../config/constants.js';

export function formatNewsTweet(news) {
  const title = news.title.substring(0, 100);
  const relevantHashtags = getRelevantHashtags(news);
  const engagementPhrase = 'Retweet if you like crypto news! Follow for more updates. #Eleven_Finance_News';
  
  return `${title}...\n\n${news.url}\n\n${relevantHashtags.join(' ')}\n\n${engagementPhrase}`;
}

function getRelevantHashtags(news) {
  const content = (news.title + ' ' + news.description).toLowerCase();
  const hashtags = [...HASHTAGS.default];
  
  // Add relevant trending hashtags based on content
  if (content.includes('bitcoin') || content.includes('btc')) {
    hashtags.push(...HASHTAGS.trending.bitcoin);
  }
  if (content.includes('ethereum') || content.includes('eth')) {
    hashtags.push(...HASHTAGS.trending.ethereum);
  }
  if (content.includes('defi') || content.includes('decentralized')) {
    hashtags.push(...HASHTAGS.trending.defi);
  }
  if (content.includes('nft')) {
    hashtags.push(...HASHTAGS.trending.nft);
  }
  
  // Return a subset of hashtags to avoid Twitter's limit
  return hashtags.slice(0, 5);
}