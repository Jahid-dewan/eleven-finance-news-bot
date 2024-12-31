import axios from 'axios';
import CoinGecko from 'coingecko-api';

const coinGeckoClient = new CoinGecko();

export async function fetchCryptoNews() {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/news'
  );
  
  return response.data.slice(0, 5); // Get latest 5 news items
}

export async function getCryptoPrice(coinId) {
  const response = await coinGeckoClient.simple.price({
    ids: [coinId],
    vs_currencies: ['usd']
  });
  
  return response.data[coinId].usd;
}