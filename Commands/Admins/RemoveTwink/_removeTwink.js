import { EmbedBuilder } from 'discord.js';

import User from '../../../Models/Users/User.js';

const command = async (interaction) => {
  // Получаем конфигурацию дизайна.
  const designConfig = interaction.client.designConfig;

  // Получаем свойства и интеракции.
  const { options, guild } = interaction;

  // Получаем введенные значения с команды.
  const user = options.getUser('пользователь');
  const reason = options.getString('причина') || 'Причина не указана.';

  // Создаем экземпляр класса пользователя.
  const userDb = await User.get({ id: user.id, guildId: guild.id });

  // Устанавливаем стату твинка.
  await userDb.setTwink({ value: false, notice: reason });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(
      `Твинк статус с пользователя <@${user.id}> снят ${designConfig.successEmoji}`
    )
    .setColor(Number(designConfig.success))
    .setImage(designConfig.footerURL);

  // Отвечаем на интеракцию.
  await interaction.reply({
    ephemeral: true,
    embeds: [embed],
  });
};

export default command;
