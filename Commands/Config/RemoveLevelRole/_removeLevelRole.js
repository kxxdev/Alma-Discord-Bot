import { EmbedBuilder } from 'discord.js';

import Guild from '../../../Models/Guilds/Guild.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
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
      `**${guildDb.roles.levels[i].level}** - <@&${guildDb.roles.levels[i].role.id}>`
    );
  }

  // Возвращаем ответ.
  await interaction
    .reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Текущие уровневые роли')
          .setDescription(`${roleLevels.join('\n')}`)
          .setColor(DesignConfig.colors.levels)
          .setImage(DesignConfig.footer.greyLineURL),
      ],
    })
    .catch((err) => console.log(err));
};

export default command;
