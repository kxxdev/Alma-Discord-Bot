import User from '../../../Models/Users/User.js';
export default {
  name: 'messageUpdate',
  async execute(oldMessage, newMessage) {
    if (!newMessage?.author?.id) {
      return;
    }
    // Загружаем пользователя из БД.
    const userDb = await User.get({
      id: newMessage.author.id,
      guildId: newMessage.client.tokens.GUILD_ID,
    });

    // Сброс временного голосового ограничения
    await userDb.nullTempVoiceStates();
  },
};
