const giveLevelRole = async ({ guildDb, member, guild, level }) => {
  // Выдаем уровневую роль и снимаем не нужные
  for (let i = 0; i < guildDb.roles.levels.length; i++) {
    // Проверяем нужную роль.
    if (
      level >= guildDb.roles.levels[i].level &&
      level < guildDb.roles.levels[i + 1].level
    ) {
      // Выдаём роль.
      if (!member.roles.cache.has(guildDb.roles.levels[i].role.id))
        await member.roles
          .add(guildDb.roles.levels[i].role.id)
          .catch((err) => console.log(err));
    } else if (member.roles.cache.has(guildDb.roles.levels[i].role.id)) {
      // Снимаем ненужную роль.
      await member.roles
        .remove(guildDb.roles.levels[i].role.id)
        .catch((err) => console.log(err));
    }
  }

  // Получаем канал для повышения уровня.
  const channelUp = await guild.channels.cache.find(
    (channel) => channel.id === guildDb.channels.levelUp.id
  );

  // Проверка на наличие канала.
  if (!channelUp)
    return console.log(
      `Не найден канал для повышения уровня. ID: ${guildDb.channels.levelUp.id}`
    );

  // Высвечиваем сообщение с повышением уровня.
  await channelUp
    .send({
      content: `**<@${member.id}>, поздравляем!** Твой ранг приключений повышен до **${level}**!`,
    })
    .catch((err) => console.log(err));
};

export default giveLevelRole;
