import { EmbedBuilder } from 'discord.js';

import Guild from '../../../Models/Guilds/Guild.js';

const command = async (interaction) => {
  // Получаем конфигурацию дизайна.
  const designConfig = interaction.client.designConfig;

  const { options, guild } = interaction;

  // Получение переменных из команды.
  const level = options.getNumber('уровень');

  // Получаем экземпляр класса гильдии.
  const guildDb = await new Guild().get({ id: guild.id });

  // Устанавливаем значения.
  await guildDb.removeLevelRoleId({ level });

  // Получаем текущие уровневые роли.
  const roleLevels = [];
  for (let i = 0; i < guildDb.roles.levels.length; i++) {
    roleLevels.push(
      `<@&${guildDb.roles.levels[i].role.id}> (${guildDb.roles.levels[i].level})`
    );
  }

  // Возвращаем ответ.
  await interaction
    .reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Текущие уровневые роли')
          .setDescription(`${roleLevels.join('\n')}`)
          .setColor(Number(designConfig.default))
          .setImage(designConfig.footerURL),
      ],
    })
    .catch((err) => console.log(err));
};

export default command;
