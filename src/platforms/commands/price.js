import { getCryptoPrice } from '../../utils/cryptoApi.js';

export function handlePriceCommand(bot) {
  return async (msg, match) => {
    const chatId = msg.chat.id;
    const coin = match[1].toLowerCase();

    try {
      const price = await getCryptoPrice(coin);
      await bot.sendMessage(
        chatId,
        `💰 Current ${coin.toUpperCase()} price: $${price.toLocaleString()}`
      );
    } catch (error) {
      await bot.sendMessage(
        chatId,
        '❌ Sorry, I couldn\'t fetch the price. Please check the coin symbol and try again.'
      );
    }
  };
}