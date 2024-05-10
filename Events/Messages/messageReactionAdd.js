import User from'../../Models/Users/User.js';
import config from '../../Config/config.json' assert { type: "json" };
export default {
  name: 'messageReactionAdd',
  async execute(messageReaction, user) {
    // Загружаем пользователя из БД.
    const userDb = await new User().get({ id: user.id, guildId: messageReaction.client.tokens.GUILD_ID });

    // Сброс временного голосового ограничения
    await userDb.nullTempVoiceStates();
  },
};
