import User from '../../../Models/Users/User.js';
import quests from '../../../Quests/quests.js';
import config from '../../../Config/config.json' assert { type: 'json' };

const command = async (interaction) => {
  const { user } = interaction;

  // Загружаем экземпляр пользователя.
  const userDb = await new User().get({
    id: user?.id,
    guildId: interaction.client.tokens.GUILD_ID,
  });

  // Устанавливаем дату рождения.
  await userDb.questStart({ id: 'Main' });

  const values = ['quest', 'Main', 'start', user.id];

  return quests(interaction, values);
};

export default command;
