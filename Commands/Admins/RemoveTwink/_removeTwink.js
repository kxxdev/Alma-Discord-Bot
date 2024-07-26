import { EmbedBuilder } from 'discord.js';

import User from '../../../Models/Users/User.js';

// Получаем конфигурации.
import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  // Получаем свойства и интеракции.
  const { options, guild } = interaction;

  // Получаем введенные значения с команды.
  const targetUser = await options.getUser('пользователь');
  const reason = (await options.getString('причина')) || 'Причина не указана.';

  // Создаем экземпляр класса пользователя.
  const targetUserDb = await User.get({ id: targetUser.id, guildId: guild.id });

  // Устанавливаем стату твинка.
  await targetUserDb.setTwink({ value: false, notice: reason });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(
      `Твинк статус с пользователя <@${targetUser.id}> снят ${DesignConfig.emojis.success}`
    )
    .setColor(DesignConfig.colors.success)
    .setThumbnail(targetUser.displayAvatarURL())
    .setImage(DesignConfig.footer.greyLineURL);

  // Отвечаем на интеракцию.
  await interaction.reply({
    ephemeral: true,
    embeds: [embed],
  });
};

export default command;
