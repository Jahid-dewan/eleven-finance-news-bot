import { fetchCryptoNews } from '../../utils/cryptoApi.js';

export function handleNewsCommand(bot) {
  return async (msg) => {
    const chatId = msg.chat.id;
    
    try {
      const news = await fetchCryptoNews();
      const message = news.map(item => 
        `🔥 ${item.title}\n${item.url}\n`
      ).join('\n');
      
      await bot.sendMessage(chatId, message);
    } catch (error) {
      await bot.sendMessage(
        chatId,
        '❌ Sorry, I couldn\'t fetch the latest news. Please try again later.'
      );
    }
  };
}