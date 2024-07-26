import { EmbedBuilder } from 'discord.js';

import Guild from '../../../Models/Guilds/Guild.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
import { CommandCustomError } from '../../CommandsError.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { guild, member } = interaction;
  // Загружаем экземпляр гильдии.
  const guildDb = await new Guild().get({ id: guild.id });

  // Загружаем данные из переменных.
  const user = await interaction?.options?._hoistedOptions?.find(
    (option) => option.name === 'пользователь'
  )?.user;
  const reason = await interaction?.options?._hoistedOptions?.find(
    (option) => option.name === 'жалоба'
  )?.value;

  // Получаем канал уведомлений команды.
  const channel = await guild.channels.cache.find(
    (channel) => channel.id === guildDb.channels.reports.id
  );

  if (!channel) {
    return CommandCustomError(
      interaction,
      'Не задан канал для жалоб, обратитесь к администрации.'
    );
  }

  // Создаем эмбед.
  const embedReport = new EmbedBuilder()
    .setColor(DesignConfig.colors.default)
    .setTitle('Жалоба')
    .setDescription(
      `<@${member.id}> оставил(а) жалобу на пользователя <@${user.id}>: \`\`\`${reason}\`\`\``
    )
    .setImage(DesignConfig.footer.greyLineURL)
    .setThumbnail(user.displayAvatarURL());

  // Если канал уведомлений найден, то выводим сообщение.
  if (channel) {
    await channel
      .send({
        embeds: [embedReport],
      })
      .catch((err) => console.log(err));
  }

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(
      `Ваша жалоба была отправлена ${DesignConfig.emojis.success}`
    )
    .setColor(DesignConfig.colors.success)
    .setImage(DesignConfig.footer.greyLineURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
