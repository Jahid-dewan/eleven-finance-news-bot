import { supabase } from '../services/database.js';

export async function broadcastNews(bot, newsItems) {
  const { data: channels } = await supabase
    .from('channels')
    .select('chat_id');

  for (const news of newsItems) {
    const message = formatNewsMessage(news);
    
    for (const channel of channels) {
      try {
        await bot.sendMessage(channel.chat_id, message, {
          parse_mode: 'HTML',
          disable_web_page_preview: false
        });
      } catch (error) {
        console.error(`Failed to send to ${channel.chat_id}:`, error);
      }
    }
  }
}

function formatNewsMessage(news) {
  return `🚀 <b>${news.title}</b>\n\n` +
    `${news.description}\n\n` +
    `Read more: ${news.url}\n\n` +
    `#crypto #news #${news.categories.join(' #')}`;
}