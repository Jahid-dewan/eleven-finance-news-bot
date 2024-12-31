export function handleHelpCommand(bot) {
  return async (msg) => {
    const chatId = msg.chat.id;
    const helpMessage = 
      '🤖 Welcome to DeppXBT Bot!\n\n' +
      'Available commands:\n' +
      '/price [symbol] - Get current price (e.g., /price btc)\n' +
      '/news - Get latest crypto news\n' +
      '/help - Show this help message\n\n' +
      'I also post crypto news every 2 hours and respond to comments!';

    await bot.sendMessage(chatId, helpMessage);
  };
}