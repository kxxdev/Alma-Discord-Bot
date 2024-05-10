import {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import colors from '../../../Config/colors.json' assert { type: 'json' };

const command = async (interaction) => {
  const { channel } = interaction;
  // Создаем эмбед с изображением.
  const embedImage = new EmbedBuilder()
    .setColor(Number(colors.default))
    .setImage(
      'https://media.discordapp.net/attachments/836998525329473576/1179962754577223771/192ca2c2be22c6e2.png?ex=6584eb73&is=65727673&hm=f68dc1185a0023828825bfc7f1079b157f09eb7c7dc4880d35e337641ea520ac&=&format=webp&quality=lossless'
    );

  // Создаем эмбед с основным текстом.
  const embedMain = new EmbedBuilder()
    .setColor(Number(colors.default))
    .setImage(colors.footerURL)
    .setTitle('Магазин')
    .setDescription(
      `${colors.gsEmoji} Что вы хотите купить?\n\n${colors.psEmoji} Каждый фон профиля добавляет вам цветовую роль\n\n${colors.gsEmoji} Если фон уже был куплен, в магазине вы можете его надеть бесплатно`
    );

  // Создаем селект меню.
  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('shop-message')
      .setPlaceholder('Витрина..')
      .addOptions(
        {
          label: 'Карточки профиля',
          description:
            'Уникальные карточки вашего профиля, каждая карточка добавляет вам цветную роль',
          value: 'profile-backgrounds',
          emoji: '1169666624031293551',
        },
        {
          label: 'Рамки профиля',
          description: 'Уникальные рамки для вашего профиля',
          value: 'profile-frames',
          emoji: '1169666624031293551',
        },
        {
          label: 'Рамки аватара',
          description: 'Уникальные рамки для аватара вашего профиля',
          value: 'profile-shadows',
          emoji: '1169666624031293551',
        }
      )
  );

  // Выводим сообщения.
  await channel
    .send({ embeds: [embedImage, embedMain], components: [row] })
    .catch((err) => console.log(err));

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(`Сообщение отправлено ${colors.successEmoji}`)
    .setColor(Number(colors.success))
    .setImage(colors.footerURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
