import {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { channel } = interaction;
  // Создаем эмбед с изображением.
  const embedImage = new EmbedBuilder()
    .setColor(DesignConfig.colors.info)
    .setImage(
      'https://media.discordapp.net/attachments/836998525329473576/1172880224925515786/4.png?ex=6561ecd4&is=654f77d4&hm=280370aa140aabde24791831b08db94d87e9e7befb2db03d73ef26c14005ad8f&='
    );

  // Создаем эмбед с основным текстом.
  const embedMain = new EmbedBuilder()
    .setColor(DesignConfig.colors.info)
    .setImage(DesignConfig.footer.greyLineURL)
    .setTitle('A X E L')
    .setDescription(`${DesignConfig.guildEmojis.gs} *« Погрузитесь в аниме мир разнообразнейших приключений и квестов с нашей очаровательной богиней Альмой! »* 

${DesignConfig.guildEmojis.ps} Данное место станет для тебя твоим уютным уголком в аниме мире. Оно славится своим бурным разнообразием и пестрыми красками.
            
${DesignConfig.guildEmojis.gs} Тут вы сможете найти новых друзей и приятные знакомства, компанию для просмотра и обсуждении любимых аниме, персонажей. Хоть и атмосфера здесь приятная, вам нужно быть осторожными. Никто не знает что вас будет ожидать в очередном приключении…`);

  // Создаем селект меню.
  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('info-message')
      .setPlaceholder(`${DesignConfig.emojis.selectCategory} Выбрать раздел..`)
      .addOptions(
        {
          label: 'Карта города',
          description: 'Ознакомиться с гайдом',
          value: 'map',
          emoji: '🗺',
        },
        {
          label: 'Роли',
          description: 'Информация о серверных ролях',
          value: 'roles',
          emoji: '🎭',
        },
        {
          label: 'Команды',
          description: 'Узнать о командах ботов',
          value: 'commands',
          emoji: '👾',
        }
      )
  );

  // Выводим сообщения.
  await channel
    .send({ embeds: [embedImage, embedMain], components: [row] })
    .catch((err) => console.log(err));

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(`Сообщение отправлено ${DesignConfig.emojis.success}`)
    .setColor(DesignConfig.colors.success)
    .setImage(DesignConfig.footer.greyLineURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
