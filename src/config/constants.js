export const NEWS_SOURCES = [
  {
    name: 'CoinDesk',
    url: 'https://api.coindesk.com/v1/news',
    priority: 1
  },
  {
    name: 'CoinTelegraph',
    url: 'https://cointelegraph.com/api/v1/news',
    priority: 1
  },
  {
    name: 'CryptoSlate',
    url: 'https://cryptoslate.com/api/v1/news',
    priority: 2
  }
];

export const HASHTAGS = {
  default: ['#CryptoNews', '#Bitcoin', '#Blockchain', '#Ethereum', '#Crypto', '#Eleven_Finance_News'],
  trending: {
    bitcoin: ['#BTC', '#BitcoinNews'],
    ethereum: ['#ETH', '#EthereumNews'],
    defi: ['#DeFi', '#DecentralizedFinance'],
    nft: ['#NFT', '#NFTCommunity']
  }
};

export const BOT_CONFIG = {
  name: 'Eleven_Finance_News',
  newsInterval: 15 * 60 * 1000, // 15 minutes
  engagementInterval: 30 * 60 * 1000, // 30 minutes
  maxTweetsPerHour: 20,
  maxRetweetsPerHour: 10,
  maxLikesPerHour: 50
};