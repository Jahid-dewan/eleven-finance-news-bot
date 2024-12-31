import { supabase } from '../index.js';

export const taskCommands = (bot) => {
  // View available tasks
  bot.onText(/\/tasks/, async (msg) => {
    const chatId = msg.chat.id;
    const { data: tasks } = await supabase
      .from('tasks')
      .select('*')
      .eq('active', true);

    if (!tasks?.length) {
      await bot.sendMessage(chatId, 'No tasks available at the moment.');
      return;
    }

    const taskList = tasks.map(task => 
      `🎯 ${task.title}\n` +
      `Points: ${task.points}\n` +
      `Description: ${task.description}\n` +
      `Complete with: /complete_${task.id}\n`
    ).join('\n');

    await bot.sendMessage(chatId, 
      '📋 Available Tasks:\n\n' + taskList
    );
  });

  // Complete task command
  bot.onText(/\/complete_(\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const taskId = match[1];

    // Verify task completion (you'll need to implement specific verification logic)
    const { data: task } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .single();

    if (!task) {
      await bot.sendMessage(chatId, 'Task not found.');
      return;
    }

    // Add points to user
    const { data: user } = await supabase
      .from('users')
      .upsert({
        telegram_id: msg.from.id,
        points: task.points
      })
      .select();

    await bot.sendMessage(chatId, 
      `✅ Task completed!\n` +
      `You earned ${task.points} points!`
    );
  });
};