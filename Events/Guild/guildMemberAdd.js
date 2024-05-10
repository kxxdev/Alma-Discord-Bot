import Guild from '../../Models/Guilds/Guild.js';

import quests from '../../Quests/quests.js';

export default {
  name: 'guildMemberAdd',
  async execute(member) {
    const values = ['quest', 'Main', 'start', member.id];
    const interaction = {
      value: 'fake',
      member,
      user: { value: 'fake', id: member.id },
    };

    quests(interaction, values);

    // Загружаем экземпяр класса гильдии.
    const guildDb = await new Guild().get({ id: member.guild.id });

    // Если на сервере есть роль первого уровня, она выдается.
    if (guildDb.roles.levels.length != 0)
      await member.roles
        .add(guildDb.roles.levels[0].role.id)
        .catch((err) => console.log(err));
  },
};
