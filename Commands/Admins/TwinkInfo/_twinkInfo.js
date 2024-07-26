import { EmbedBuilder } from 'discord.js';

import User from '../../../Models/Users/User.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { options, guild } = interaction;

  // Получаем значение переменной.
  const user = options.getUser('пользователь');

  // Получаем пользователя.
  const userDb = await User.get({ id: user.id, guildId: guild.id });

  // Записываем статус пользователя.
  const twinkStatus = userDb.notice.twink.status
    ? `__Подозрение на твинк__ ${DesignConfig.emojis.danger}`
    : `Нет подозрений на твинк ${DesignConfig.emojis.clear}`;

  // Создаем эмбед-ответ.
  const embed = new EmbedBuilder()
    .setDescription(
      `**Статус пользователя <@${user.id}>: - ${twinkStatus}**
        
        **Причина:** ${userDb.notice.twink.notice}`
    )
    .setColor(DesignConfig.colors.default)
    .setImage(DesignConfig.footer.greyLineURL);

  // Отвечаем на интеракцию
  await interaction.reply({
    ephemeral: true,
    embeds: [embed],
  });
};

export default command;
