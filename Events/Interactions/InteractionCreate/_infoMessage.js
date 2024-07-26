import { EmbedBuilder } from 'discord.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const gs = DesignConfig.guildEmojis.gs;
const ps = DesignConfig.guildEmojis.ps;

const infoMessage = async (interaction) => {
  // Записываем выбранное значение.
  const selected = interaction.values[0];

  // Создаем эмбеды.
  const embeds = [];

  // Создаем компоненты.
  const components = [];

  // Если выбрана карта города.
  if (selected === 'map') {
    // Записываем сообщение с форумом.
    embeds.push(
      new EmbedBuilder()
        .setColor(DesignConfig.colors.info)
        .setImage('https://i.imgur.com/EbcNZBA.png')
        .setDescription(`**${gs} Газета** - форум нашего города

${ps} <#1071586393198956564> *Мы будем рады видеть любые ваши посты! Не забывайте прикреплять теги 💝*`)
    );

    // Записываем первое сообщение.
    embeds.push(
      new EmbedBuilder()
        .setColor(DesignConfig.colors.info)
        .setImage('https://i.imgur.com/EbcNZBA.png')
        .setDescription(`**${gs} Стойка информации** - информационный раздел сервера

${ps} <#1071602367197368321> - информация о городе
${gs} <#1071585831799763025> - правила города
${gs} <#809404973548306432> - городские новости`)
    );

    // Записываем второе сообщение.
    embeds.push(
      new EmbedBuilder()
        .setColor(DesignConfig.colors.info)
        .setImage('https://i.imgur.com/EbcNZBA.png')
        .setDescription(`**${gs} Округа** - основной текстовый раздел сервера

${ps} <#809426139726217226> - главный чат
${gs} <#1071587442550919219> - для команд ботов
${gs} <#1071585431776411669> - для поиска напарников или напарниц в игре
${ps} <#1074091482178408528> - делитесь вашими фоточками`)
    );

    // Записываем третье сообщение.
    embeds.push(
      new EmbedBuilder()
        .setColor(DesignConfig.colors.info)
        .setImage('https://i.imgur.com/EbcNZBA.png')
        .setDescription(`**${gs} Голосовые** - основной голосовой раздел сервера

${ps} <#809438184806154280> - один из основных войсов сервера
${gs} <#1071600146313379840> - еще один основной войс сервера
${ps} <#1071881668153065544> - войс где можно спокойно включать музыку в ботах
${gs} Ниже идут второстепенные каналы, где вы так же можете посидеть 💝`)
    );

    // Записываем четвертое сообщение.
    embeds.push(
      new EmbedBuilder()
        .setColor(DesignConfig.colors.info)
        .setImage('https://i.imgur.com/EbcNZBA.png')
        .setDescription(`**${gs} Доска посетителей** - раздел для креатива и обратной связи

${ps} <#1071793762205962281> - присылайте красивые артики
${gs} <#1072193170349236264> - ваши красивые рабочие или игровые места
${ps} <#1071789322593894460> - обратная связь`)
    );
  }

  // Если выбраны роли.
  else if (selected === 'roles') {
    // Записываем первое сообщение.
    embeds.push(
      new EmbedBuilder()
        .setColor(DesignConfig.colors.info)
        .setImage('https://i.imgur.com/EbcNZBA.png')
        .setDescription(`**${gs} Роли администрации**

${gs} <@&1133488383650439289> - главный администратор
${ps} <@&920384487207084094> - старшая администрация
${gs} <@&809405849687818261> - младшая администрация
${ps} <@&1071954387343261736> - разработчик сервера
${gs} <@&1072369754339278888> - они делают для вас новости и текстовое оформление таверны
${ps} <@&1075677525608501309> - они делают визуальное оформление города`)
    );

    // Записываем второе сообщение.
    embeds.push(
      new EmbedBuilder()
        .setColor(DesignConfig.colors.info)
        .setImage('https://i.imgur.com/EbcNZBA.png')
        .setDescription(`**${gs} Уровни**

*За общение в текстовых и голосовых каналах вы получаете опыт (1 раз в минуту), со временем вы повысите свой уровень и получите следующие роли:*

${ps} <@&1071586941566464092>
${gs} <@&1071586926513094656>
${ps} <@&1071587132172415046>
${gs} <@&1071586910880940133>
${ps} <@&1071586894464430242>
${gs} <@&1071586876584120422>
${ps} <@&1071586828987138138>
${gs} <@&1071586853490274374>
${ps} <@&1071586813136875581>
${gs} <@&1071586791678808194>
${ps} <@&1071586770455629844>
${gs} <@&1071586750473965639>
${ps} <@&1071586712125440073>`)
    );
  }

  // Если выбраны команды.
  else if (selected === 'commands') {
    // Записываем первое сообщение.
    embeds.push(
      new EmbedBuilder()
        .setColor(DesignConfig.colors.info)
        .setImage('https://i.imgur.com/EbcNZBA.png')
        .setDescription(`**${gs} Альма**

${ps} **Информация:**
${gs} \`/profile\` - просмотр вашего профиля
${ps} \`/top\` - просмотр топа
${gs} \`/birthday\` - установить день рождения
${ps} \`/signature\` - установить подпись

${ps}**Экономика:**
${gs} \`/pay\` - передать эрис

${ps} **Прочее:**
${gs} \`/report\` - отправить жалобу`)
    );
  }

  // Отправляем ответ пользователю.
  await interaction
    .reply({ embeds, components, ephemeral: true })
    .catch((err) => console.log(err));
};

export default infoMessage;
