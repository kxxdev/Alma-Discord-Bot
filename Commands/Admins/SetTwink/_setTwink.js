import { EmbedBuilder } from 'discord.js';

import User from '../../../Models/Users/User.js';
import colors from '../../../Config/colors.json' assert { type: 'json' };

const command = async (interaction) => {
  // Получаем свойства и интеракции.
  const { options, guild } = interaction;

  // Получаем введенные значения с команды.
  const user = options.getUser('пользователь');
  const reason = options.getString('причина') || 'Причина не указана.';

  // Создаем экземпляр класса пользователя.
  const userDb = await new User().get({ id: user.id, guildId: guild.id });

  // Устанавливаем стату твинка.
  await userDb.setTwink({ value: false, notice: reason });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(
      `Твинк статус у пользователя <@${user.id}> установлен ${colors.successEmoji}`
    )
    .setColor(Number(colors.success))
    .setImage(colors.footerURL);

  // Устанавливаем стату твинка.
  await userDb.setTwink({ value: true, notice: reason });

  // Отвечаем на интеракцию
  await interaction.reply({
    ephemeral: true,
    embeds: [embed],
  });
};

export default command;
