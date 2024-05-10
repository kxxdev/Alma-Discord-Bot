export default {
  name: 'presenceUpdate',
  async execute(oldPresence, newPresence) {
    // Загружаем пользователя из БД.
    // const userDb = await User.get({
    //   id: newPresence.member.id,
    //   guildId: config.guildId,
    // });
    // // Сброс временного голосового ограничения
    // await userDb.nullTempVoiceStates();
  },
};
