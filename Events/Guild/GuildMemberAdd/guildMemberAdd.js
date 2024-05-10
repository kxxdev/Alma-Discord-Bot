import giveLevelRole from '../../../Functions/giveLevelRole.js';
import Guild from '../../../Models/Guilds/Guild.js';
import User from '../../../Models/Users/User.js';

import quests from '../../../Quests/quests.js';

export default {
  name: 'guildMemberAdd',
  async execute(member) {
    // const values = ['quest', 'Main', 'start', member.id];
    const info = {
      type: 'quest',
      id: 'Main',
      stage: 'start',
      userId: member.id,
    };
    const interaction = {
      value: 'fake',
      member,
      user: { value: 'fake', id: member.id },
    };

    // Стартуем квест
    quests(interaction, info);

    // Загружаем экземпяр класса гильдии и пользователя.
    const guildDb = await new Guild().get({ id: member.guild.id });
    const userDb = await User.get({ id: member.id, guildId: member.guild.id });

    // Если на сервере есть роль первого уровня, она выдается.
    await giveLevelRole({
      guildDb,
      member,
      guild: member.guild,
      level: userDb.levels.level,
    });
  },
};
