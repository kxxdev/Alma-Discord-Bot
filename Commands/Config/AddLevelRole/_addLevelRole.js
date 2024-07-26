import { EmbedBuilder } from 'discord.js';

import Guild from '../../../Models/Guilds/Guild.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
import { CommandCustomError } from '../../CommandsError.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { guild, options } = interaction;

  // Получение переменных из команды.
  const role = options.getRole('роль');
  const level = options.getNumber('уровень');

  if ((role && !level) || (level && !role)) {
    return CommandCustomError(
      interaction,
      'При добавлении роли необходимо указать оба пункта. Для просмотра текущих ролей не нужно указывать ничего.'
    );
  }

  // Получаем экземпляр класса гильдии.
  const guildDb = await new Guild().get({ id: guild.id });

  // Устанавливаем значения.
  if (role && level) await guildDb.setLevelRoleId({ level, id: role.id });

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
          .setTitle('🔝 Текущие уровневые роли 🔝')
          .setDescription(`${roleLevels.join('\n')}`)
          .setColor(DesignConfig.colors.levels)
          .setImage(DesignConfig.footer.greyLineURL),
      ],
    })
    .catch((err) => console.log(err));
};

export default command;
