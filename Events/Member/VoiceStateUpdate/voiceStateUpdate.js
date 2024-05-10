import User from '../../../Models/Users/User.js';

export default {
  name: 'voiceStateUpdate',
  async execute(oldState, newState) {
    // Загружаем пользователя из БД.
    const userDb = await User.get({
      id: newState.member.id,
      guildId: newState.client.tokens.GUILD_ID,
    });

    // Сброс временного голосового ограничения
    await userDb.nullTempVoiceStates();
  },
};
