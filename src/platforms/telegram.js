import TelegramBot from 'node-telegram-bot-api';
import { handlePriceCommand } from './commands/price.js';
import { handleNewsCommand } from './commands/news.js';
import { handleHelpCommand } from './commands/help.js';

export function startTelegramBot() {
  const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

  // Command handlers
  bot.onText(/\/start/, handleHelpCommand(bot));
  bot.onText(/\/help/, handleHelpCommand(bot));
  bot.onText(/\/price (.+)/, handlePriceCommand(bot));
  bot.onText(/\/news/, handleNewsCommand(bot));

  // Handle user comments
  bot.on('message', async (msg) => {
    if (msg.reply_to_message && msg.reply_to_message.from.username === bot.username) {
      await handleUserComment(bot, msg);
    }
  });

  console.log('Telegram bot started successfully');
  return bot;
}