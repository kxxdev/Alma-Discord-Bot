import {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

const command = async (interaction) => {
  // Получаем конфигурацию дизайна.
  const designConfig = interaction.client.designConfig;

  const { client, channel, guild } = interaction;
  // Создаем эмбед с изображением.
  const embedImage = new EmbedBuilder()
    .setColor(Number(designConfig.default))
    .setImage(
      'https://media.discordapp.net/attachments/836998525329473576/1172880224925515786/4.png?ex=6561ecd4&is=654f77d4&hm=280370aa140aabde24791831b08db94d87e9e7befb2db03d73ef26c14005ad8f&='
    );

  // Создаем эмбед с основным текстом.
  const embedMain = new EmbedBuilder()
    .setColor(Number(designConfig.default))
    .setImage(designConfig.footerURL)
    .setTitle('A X E L')
    .setDescription(`${designConfig.gsEmoji} *« Погрузитесь в аниме мир разнообразнейших приключений и квестов с нашей очаровательной богиней Альмой! »* 

${designConfig.psEmoji} Данное место станет для тебя твоим уютным уголком в аниме мире. Оно славится своим бурным разнообразием и пестрыми красками.
            
${designConfig.gsEmoji} Тут вы сможете найти новых друзей и приятные знакомства, компанию для просмотра и обсуждении любимых аниме, персонажей. Хоть и атмосфера здесь приятная, вам нужно быть осторожными. Никто не знает что вас будет ожидать в очередном приключении…`);

  // Создаем селект меню.
  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('info-message')
      .setPlaceholder('Выбрать раздел..')
      .addOptions(
        {
          label: '🗺 Карта города',
          description: 'Ознакомиться с гайдом',
          value: 'map',
        },
        {
          label: '🎭 Роли',
          description: 'Информация о серверных ролях',
          value: 'roles',
        },
        {
          label: '👾 Команды',
          description: 'Узнать о командах ботов',
          value: 'commands',
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
