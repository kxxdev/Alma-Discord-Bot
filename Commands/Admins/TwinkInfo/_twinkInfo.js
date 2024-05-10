import { EmbedBuilder } from 'discord.js';

import User from '../../../Models/Users/User.js';
import colors from '../../../Config/colors.json' assert { type: 'json' };

const command = async (interaction) => {
  const { options, guild } = interaction;

  // Получаем значение переменной.
  const user = options.getUser('пользователь');

  // Получаем пользователя.
  const userDb = await new User().get({ id: user.id, guildId: guild.id });

  // Записываем статус пользователя.
  const twinkStatus = userDb.notice.twink.status
    ? 'Подозрение на твинк'
    : 'Нет подозрений на твинк';

  // Создаем эмбед-ответ.
  const embed = new EmbedBuilder()
    .setDescription(
      `**Статус пользователя <@${user.id}>:** ${twinkStatus}
        
        **Причина:** ${userDb.notice.twink.notice}`
    )
    .setColor(Number(colors.default))
    .setImage(colors.footerURL);

  // Отвечаем на интеракцию
  await interaction.reply({
    ephemeral: true,
    embeds: [embed],
  });
};

export default command;
