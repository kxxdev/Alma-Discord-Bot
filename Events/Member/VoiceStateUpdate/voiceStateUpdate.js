import User from '../../../Models/Users/User.js';
import config from '../../../Config/config.json' assert { type: 'json' };

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
