import {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import colors from '../../../Config/colors.json' assert { type: 'json' };

const workValues = (workName) => {
  switch (workName) {
    case 'Фермер':
      return {
        embedImageUrl:
          'https://media.discordapp.net/attachments/836998525329473576/1179962717075943555/db1b6c7f4d32a880.png?ex=657bb0ea&is=65693bea&hm=5e4fa57975e43aff89a30b4e400061f043f25c1fd23435f400f4760179c522b4&=&format=webp&quality=lossless',
        mainImageUrl: colors.footerURL,
        title: 'Работа на ферме',
        description: 'Что вы хотите собрать?',
        selectMenu: new StringSelectMenuBuilder()
          .setCustomId('work-farmer-message')
          .setPlaceholder('Собрать..')
          .addOptions(
            {
              label: 'Пшеница',
              description: 'Собрать пшеницу',
              value: 'wheat',
              emoji: '1168512203163443210',
            },
            {
              label: 'Хмель',
              description: 'Собрать хмель',
              value: 'hops',
              emoji: '1168512200743321652',
            },
            {
              label: 'Виноград',
              description: 'Собрать виноград',
              value: 'grapes',
              emoji: '1168512197530501180',
            }
          ),
      };
    case 'Пивовар':
      return {
        embedImageUrl:
          'https://media.discordapp.net/attachments/836998525329473576/1179964759886544926/FarmWork_7.png?ex=657bb2d1&is=65693dd1&hm=4ed946c67545bbef0c69f9f71b9b2b05af3aa56077171ff504be64efdab76472&=&format=webp&quality=lossless',
        mainImageUrl: colors.footerURL,
        title: 'Работа на пивоварне',
        description: 'Что вы хотите сварить?',
        selectMenu: new StringSelectMenuBuilder()
          .setCustomId('work-brewer-message')
          .setPlaceholder('Сварить..')
          .addOptions(
            {
              label: 'Лимонад',
              description: 'Сварить лимонад',
              value: 'lemonade',
              emoji: '1180242936923963443',
            },
            {
              label: 'Светлое пиво',
              description: 'Сварить светлое пиво',
              value: 'whiteBeer',
              emoji: '1180242840459157535',
            },
            {
              label: 'Темное пиво',
              description: 'Сварить темное пиво',
              value: 'darkBeer',
              emoji: '1180242893374492693',
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
    .setColor(Number(colors.default))
    .setImage(work.embedImageUrl);

  // Создаем эмбед с основным текстом.
  const embedMain = new EmbedBuilder()
    .setColor(Number(colors.default))
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
    .setDescription(`Сообщение отправлено ${colors.successEmoji}`)
    .setColor(Number(colors.success))
    .setImage(colors.footerURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
