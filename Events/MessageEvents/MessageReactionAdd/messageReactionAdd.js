import User from '../../../Models/Users/User.js';
export default {
  name: 'messageReactionAdd',
  async execute(messageReaction, user) {
    // Загружаем пользователя из БД.
    const userDb = await User.get({
      id: user.id,
      guildId: messageReaction.client.tokens.GUILD_ID,
    });

    // Сброс временного голосового ограничения
    await userDb.nullTempVoiceStates();
  },
};
