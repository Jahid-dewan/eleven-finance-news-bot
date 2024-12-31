import { supabase } from '../index.js';

export const pointsCommands = (bot) => {
  // Check points command
  bot.onText(/\/points/, async (msg) => {
    const chatId = msg.chat.id;
    
    const { data: user } = await supabase
      .from('users')
      .select('points')
      .eq('telegram_id', msg.from.id)
      .single();

    const points = user?.points || 0;
    
    await bot.sendMessage(chatId,
      `💎 Your Points: ${points}\n\n` +
      `Complete more tasks to earn points!`
    );
  });
};