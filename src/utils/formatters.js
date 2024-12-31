export function formatNewsForTwitter(news) {
  const title = news.title.substring(0, 100);
  const hashtags = '#crypto #DeppXBT';
  const url = news.url;
  
  return `${title}...\n\n${url}\n\n${hashtags}`;
}

export function formatPriceForTwitter(coin, price) {
  return `💰 ${coin.toUpperCase()} Price Update:\n$${price.toLocaleString()}\n\n#crypto #${coin} #DeppXBT`;
}