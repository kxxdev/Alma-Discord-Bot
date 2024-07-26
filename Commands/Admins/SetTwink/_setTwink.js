import { EmbedBuilder } from 'discord.js';

import User from '../../../Models/Users/User.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  // Получаем свойства и интеракции.
  const { options, guild } = interaction;

  // Получаем введенные значения с команды.
  const targetUser = options.getUser('пользователь');
  const reason = options.getString('причина') || 'Причина не указана.';

  // Создаем экземпляр класса пользователя.
  const targetUserDb = await User.get({ id: targetUser.id, guildId: guild.id });

  // Устанавливаем стату твинка.
  await targetUserDb.setTwink({ value: false, notice: reason });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(
      `Твинк статус пользователю <@${targetUser.id}> установлен ${DesignConfig.emojis.success}`
    )
    .setColor(DesignConfig.colors.success)
    .setImage(DesignConfig.footer.greyLineURL);

  // Устанавливаем стату твинка.
  await targetUserDb.setTwink({ value: true, notice: reason });

  // Отвечаем на интеракцию
  await interaction.reply({
    ephemeral: true,
    embeds: [embed],
  });
};

export default command;
