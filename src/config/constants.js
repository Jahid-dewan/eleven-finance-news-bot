export const NEWS_SOURCES = [
  {
    name: 'CryptoCompare',
    url: 'https://min-api.cryptocompare.com/data/v2/news/?categories=Crypto',
    priority: 1
  },
  {
    name: 'CoinGecko',
    url: 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1',
    priority: 2
  },
  {
    name: 'Nomics', // Requires API Key
    url: 'https://api.nomics.com/v1/currencies/ticker?key=YOUR_API_KEY',
    priority: 3
  }
];

// Optional: RSS feed for CoinTelegraph (if API is unavailable)
export const COIN_TELEGRAPH_RSS_URL = 'https://cointelegraph.com/rss';

// Adjust the hashtags for more specific tracking
export const HASHTAGS = {
  default: ['#CryptoNews', '#Bitcoin', '#Blockchain', '#Ethereum', '#Crypto', '#Eleven_Finance_News'],
  trending: {
    bitcoin: ['#BTC', '#BitcoinNews'],
    ethereum: ['#ETH', '#EthereumNews'],
    defi: ['#DeFi', '#DecentralizedFinance'],
    nft: ['#NFT', '#NFTCommunity']
  }
};

// Bot configuration
export const BOT_CONFIG = {
  name: 'Eleven_Finance_News',
  newsInterval: 15 * 60 * 1000, // 15 minutes to fetch latest news
  engagementInterval: 30 * 60 * 1000, // 30 minutes to engage (like/retweet)
  maxTweetsPerHour: 20,
  maxRetweetsPerHour: 10,
  maxLikesPerHour: 50
};
