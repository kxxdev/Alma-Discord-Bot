import {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const workValues = (workName) => {
  switch (workName) {
    case 'Фермер':
      return {
        embedImageUrl:
          'https://media.discordapp.net/attachments/836998525329473576/1179962717075943555/db1b6c7f4d32a880.png?ex=657bb0ea&is=65693bea&hm=5e4fa57975e43aff89a30b4e400061f043f25c1fd23435f400f4760179c522b4&=&format=webp&quality=lossless',
        mainImageUrl: DesignConfig.footer.greyLineURL,
        title: '🌽 Работа на ферме 🌽',
        description: `${DesignConfig.guildEmojis.gs} Что вы хотите собрать?`,
        selectMenu: new StringSelectMenuBuilder()
          .setCustomId('work-farmer-message')
          .setPlaceholder('🌿 Собрать..')
          .addOptions(
            {
              label: 'Пшеница',
              description: 'Собрать пшеницу',
              value: 'wheat',
              emoji: DesignConfig.guildEmojis.wheat,
            },
            {
              label: 'Хмель',
              description: 'Собрать хмель',
              value: 'hops',
              emoji: DesignConfig.guildEmojis.hops,
            },
            {
              label: 'Виноград',
              description: 'Собрать виноград',
              value: 'grapes',
              emoji: DesignConfig.guildEmojis.grape,
            }
          ),
      };
    case 'Пивовар':
      return {
        embedImageUrl:
          'https://media.discordapp.net/attachments/836998525329473576/1179964759886544926/FarmWork_7.png?ex=657bb2d1&is=65693dd1&hm=4ed946c67545bbef0c69f9f71b9b2b05af3aa56077171ff504be64efdab76472&=&format=webp&quality=lossless',
        mainImageUrl: DesignConfig.footer.greyLineURL,
        title: '🍺 Работа на пивоварне 🍺',
        description: `${DesignConfig.guildEmojis.gs} Что вы хотите сварить?`,
        selectMenu: new StringSelectMenuBuilder()
          .setCustomId('work-brewer-message')
          .setPlaceholder('🍻 Сварить..')
          .addOptions(
            {
              label: 'Лимонад',
              description: 'Сварить лимонад',
              value: 'lemonade',
              emoji: DesignConfig.guildEmojis.lemonade,
            },
            {
              label: 'Светлое пиво',
              description: 'Сварить светлое пиво',
              value: 'whiteBeer',
              emoji: DesignConfig.guildEmojis.lightBeer,
            },
            {
              label: 'Темное пиво',
              description: 'Сварить темное пиво',
              value: 'darkBeer',
              emoji: DesignConfig.guildEmojis.darkBeer,
            }
          ),
      };
  }
};

const command = async (interaction) => {
  const { channel } = interaction;

  const workName = interaction.options.getString('работа');
  const work = workValues(workName);

  // Создаем эмбед с изображением.
  const embedImage = new EmbedBuilder()
    .setColor(DesignConfig.colors.work)
    .setImage(work.embedImageUrl);

  // Создаем эмбед с основным текстом.
  const embedMain = new EmbedBuilder()
    .setColor(DesignConfig.colors.work)
    .setImage(work.mainImageUrl)
    .setTitle(work.title)
    .setDescription(work.description);

  // Создаем селект меню.
  const row = new ActionRowBuilder().addComponents(work.selectMenu);

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
