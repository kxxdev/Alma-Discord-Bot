import { EmbedBuilder } from 'discord.js';

import Guild from '../../../Models/Guilds/Guild.js';

import colors from '../../../Config/colors.json' assert { type: 'json' };

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

  // Создаем эмбед.
  const embedReport = new EmbedBuilder()
    .setColor(Number(colors.error))
    .setTitle('Жалоба')
    .setDescription(
      `<@${member.id}> оставил(а) жалобу на пользователя <@${user.id}>: \`\`\`${reason}\`\`\``
    )
    .setImage(colors.footerURL)
    .setThumbnail(user.displayAvatarURL());

  // Получаем канал уведомлений команды.
  const channel = await guild.channels.cache.find(
    (channel) => channel.id === guildDb.channels.reports.id
  );

  if (!channel) {
    return await interaction.reply({
      content: 'Не задан канал для жалоб, обратитесь к администрации.',
      ephemeral: true,
    });
  }

  // Если канал уведомлений найден, то выводим сообщение.
  if (channel) {
    await embedReport
      .send({
        embeds: [embed],
      })
      .catch((err) => console.log(err));
  }

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(`Ваша жалоба была отправлена ${colors.successEmoji}`)
    .setColor(Number(colors.success))
    .setImage(colors.footerURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
