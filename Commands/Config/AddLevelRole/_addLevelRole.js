import { EmbedBuilder } from 'discord.js';

import Guild from '../../../Models/Guilds/Guild.js';

const command = async (interaction) => {
  // Получаем конфигурацию дизайна.
  const designConfig = interaction.client.designConfig;

  const { guild, options } = interaction;

  // Получение переменных из команды.
  const role = options.getRole('роль');
  const level = options.getNumber('уровень');

  if ((role && !level) || (level && !role))
    return await interaction
      .reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              'При добавлении роли необходимо указать оба пункта. Для просмотра текущих ролей не нужно указывать ничего.'
            )
            .setColor(Number(designConfig.error))
            .setImage(designConfig.footerURL),
        ],
      })
      .catch((err) => console.log(err));

  // Получаем экземпляр класса гильдии.
  const guildDb = await new Guild().get({ id: guild.id });

  // Устанавливаем значения.
  if (role && level) await guildDb.setLevelRoleId({ level, id: role.id });

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
