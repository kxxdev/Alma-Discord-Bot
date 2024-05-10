import User from '../../Models/Users/User.js';
import config from '../../Config/config.json' assert { type: 'json' };

export default {
  name: 'guildMemberUpdate',
  async execute(oldMember, newMember) {
    // Загружаем пользователя из БД.
    const userDb = await User.get({
      id: newMember.id,
      guildId: newMember.client.tokens.GUILD_ID,
    });

    // Сброс временного голосового ограничения
    await userDb.nullTempVoiceStates();
  },
};
