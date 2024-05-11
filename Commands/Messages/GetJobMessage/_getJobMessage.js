import {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

const command = async (interaction) => {
  // Получаем конфигурацию дизайна.
  const designConfig = interaction.client.designConfig;

  const { channel } = interaction;
  // Создаем эмбед с изображением.
  const embedImage = new EmbedBuilder()
    .setColor(Number(designConfig.default))
    .setImage(
      'https://media.discordapp.net/attachments/836998525329473576/1179962734293549067/db6a7b9e5eb035c7.png?ex=6584eb6e&is=6572766e&hm=eeb89ff6704a91bea9325236c6d370e35c56f59d759f43f622bd40afd4b04aa6&=&format=webp&quality=lossless&width=810&height=386'
    );

  // Создаем эмбед с основным текстом.
  const embedMain = new EmbedBuilder()
    .setColor(Number(designConfig.default))
    .setImage(designConfig.footerURL)
    .setTitle('Трудоустройство')
    .setDescription(`${designConfig.gsEmoji} Выберите подходящую вам работу`);

  // Создаем селект меню.
  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('work-join-message')
      .setPlaceholder('Выбрать работу..')
      .addOptions(
        {
          label: 'Фермер',
          description: 'Работа фермером',
          value: 'Фермер',
          emoji: '1168515973482037339',
        },
        {
          label: 'Пивовар',
          description: 'Работа пивоваром',
          value: 'Пивовар',
          emoji: '1180186970920599583',
        },
        {
          label: 'Уволиться',
          description: 'Бросить работу',
          value: 'Безработный',
          emoji: '❌',
        }
      )
  );

  // Выводим сообщения.
  await channel
    .send({ embeds: [embedImage, embedMain], components: [row] })
    .catch((err) => console.log(err));

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(`Сообщение отправлено ${designConfig.successEmoji}`)
    .setColor(Number(designConfig.success))
    .setImage(designConfig.footerURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
