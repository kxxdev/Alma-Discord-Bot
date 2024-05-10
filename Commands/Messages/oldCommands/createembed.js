return;

import {
  PermissionsBitField,
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  Events,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} from 'discord.js';
import { client } from '../../../index.js';

import Guild from '../../../Models/Guilds/Guild.js';

import checkHex from '../../../Functions/checkHex.js';

const messages = [];

// Функция проверки ссылок.
const getUrl = (url) => {
  try {
    const link = new URL(url);

    return link;
  } catch (err) {
    return false;
  }
};

const isDate = (dateToTest) => {
  return new Date(dateToTest);
};

// Захватываем сообщения.
client.on('messageCreate', async (message) => {
  // Ищем объект в массиве.
  const obj = messages.find((el) => el.member.id === message.member.id);

  // Проверяем найден ли объект или написан ли он в том же канале.
  if (!obj || obj.channel.id != message.channel.id) return;

  // Получаем индекс.
  const index = messages.findIndex((el) => el.member.id === message.member.id);

  // Создаем компоненты.
  const components = [];

  // Если есть ссылка добавляем кнопку.
  if (getUrl(obj.link.url) && obj.urlCheck)
    components.push(
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel(obj.link.name)
          .setURL(messages[index].link.url)
          .setStyle(ButtonStyle.Link)
      )
    );

  // Создаем кнопки.
  components.push(
    new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`title-${message.member.id}`)
          .setLabel('Заголовок')
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`description-${message.member.id}`)
          .setLabel('Описание')
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`color-${message.member.id}`)
          .setLabel('Цвет')
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`image-${message.member.id}`)
          .setLabel('Изображение')
          .setStyle(ButtonStyle.Primary)
      )
  );

  // Если есть ссылка - добавляем кнопки редактуры ссылки.
  if (obj.urlCheck)
    components.push(
      new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`link-${message.member.id}`)
            .setLabel('Ссылка')
            .setStyle(ButtonStyle.Primary)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`linkName-${message.member.id}`)
            .setLabel('Название ссылки')
            .setStyle(ButtonStyle.Primary)
        )
    );

  // Добавляем кнопки отправить и отмена.
  components.push(
    new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`send-${obj.member.id}`)
          .setLabel('Отправить')
          .setStyle(ButtonStyle.Success)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`cancel-${obj.member.id}`)
          .setLabel('Отмена')
          .setStyle(ButtonStyle.Danger)
      )
  );

  // Стадия заголовка.
  if (obj.stage === 'title') {
    // Задаем свойство эмбеда.
    messages[index].embed.setTitle(message.content);

    // Выводим ответ.
    return await message
      .reply({
        content:
          'Что вы хотите изменить? Либо напишите пункт еще раз для его изменения.',
        embeds: [messages[index].embed],
        components,
      })
      .catch(async (err) => {
        // Выводим информацию об ошибке.
        await message
          .reply({
            content: `Ошибка! Попробуйте еще раз.\n\n\`\`\`${err}\`\`\``,
          })
          .catch((err) => console.log(err));
      });
  }

  // Стадия описания.
  if (obj.stage === 'description') {
    // Задаем свойство эмбеда.
    messages[index].embed.setDescription(message.content);

    // Выводим ответ.
    return await message
      .reply({
        content:
          'Что вы хотите изменить? Либо напишите пункт еще раз для его изменения.',
        embeds: [messages[index].embed],
        components,
      })
      .catch(async (err) => {
        // Выводим информацию об ошибке.
        await message
          .reply({
            content: `Ошибка! Попробуйте еще раз.\n\n\`\`\`${err}\`\`\``,
          })
          .catch((err) => console.log(err));
      });
  }

  // Стадия цвета.
  if (obj.stage === 'color') {
    // Проверяем hex.
    if (!checkHex(message.content)) {
      return await message
        .reply({ content: `Ошибка! Неверно указан HEX.` })
        .catch((err) => console.log(err));
    }

    // Задаем свойство эмбеда.
    try {
      messages[index].embed.setColor(Number(`0x${message.content}`));
    } catch (err) {
      // Выводим информацию об ошибке.
      return await message
        .reply({ content: `Ошибка! Попробуйте еще раз.\n\n\`\`\`${err}\`\`\`` })
        .catch((err) => console.log(err));
    }

    // Выводим ответ.
    return await message
      .reply({
        content:
          'Что вы хотите изменить? Либо напишите пункт еще раз для его изменения.',
        embeds: [messages[index].embed],
        components,
      })
      .catch(async (err) => {
        // Выводим информацию об ошибке.
        await message
          .reply({
            content: `Ошибка! Попробуйте еще раз.\n\n\`\`\`${err}\`\`\``,
          })
          .catch((err) => console.log(err));
      });
  }

  // Стадия изображения.
  if (obj.stage === 'image') {
    const image = message.attachments?.first();
    const url = image?.url;
    if (!url)
      return await message
        .reply({
          content: `Ошибка! Неверно указана ссылка. Попробуйте ввести ссылку на сайт еще раз.`,
        })
        .catch((err) => console.log(err));

    // Задаем свойство эмбеда.
    messages[index].embed.setImage(url);

    // Выводим ответ.
    return await message
      .reply({
        content:
          'Что вы хотите изменить? Либо напишите пункт еще раз для его изменения.',
        embeds: [messages[index].embed],
        components,
      })
      .catch(async (err) => {
        // Выводим информацию об ошибке.
        await message
          .reply({
            content: `Ошибка! Попробуйте еще раз.\n\n\`\`\`${err}\`\`\``,
          })
          .catch((err) => console.log(err));
      });
  }

  // Стадия ссылки.
  if (obj.stage === 'link') {
    // Проверяем ссылку.
    const url = getUrl(message.content);
    if (!url)
      return await message
        .reply({
          content: `Ошибка! Неверно указана ссылка. Попробуйте ввести ссылку на сайт еще раз.`,
        })
        .catch((err) => console.log(err));

    // Изменяем стадию сообщения.
    messages[index].link.url = url;

    components[2] = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(obj.link.name)
        .setURL(messages[index].link.url)
        .setStyle(ButtonStyle.Link)
    );

    // Выводим ответ.
    return await message
      .reply({
        content:
          'Что вы хотите изменить? Либо напишите пункт еще раз для его изменения.',
        embeds: [messages[index].embed],
        components,
      })
      .catch(async (err) => {
        // Выводим информацию об ошибке.
        await message
          .reply({
            content: `Ошибка! Попробуйте еще раз.\n\n\`\`\`${err}\`\`\``,
          })
          .catch((err) => console.log(err));
      });
  }

  // Стадия ссылки.
  if (obj.stage === 'linkName') {
    // Изменяем стадию сообщения.
    messages[index].link.name = message.content;

    // Выводим ответ.
    return await message
      .reply({
        content:
          'Что вы хотите изменить? Либо напишите пункт еще раз для его изменения.',
        embeds: [messages[index].embed],
        components,
      })
      .catch(async (err) => {
        // Выводим информацию об ошибке.
        await message
          .reply({
            content: `Ошибка! Попробуйте еще раз.\n\n\`\`\`${err}\`\`\``,
          })
          .catch((err) => console.log(err));
      });
  }
});

// Захватываем нажатие кнопок.
client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) return;

  // Ищем объект в массиве.
  const obj = messages.find((el) => el.member.id === interaction.user.id);

  // Проверяем найден ли объект или написан ли он в том же канале.
  if (!obj || obj.channel.id != interaction.channelId) return;

  // Получаем индекс.
  const index = messages.findIndex(
    (el) => el.member.id === interaction.member.id
  );

  // Если это кнопка изменения заголовка.
  if (interaction.customId === `title-${interaction.user.id}`) {
    // Изменяем название стадии.
    messages[index].stage = 'title';

    // Отправляем сообщение.
    await interaction
      .update({
        content: 'Введите новый заголовок.',
        embeds: [],
        components: [],
      })
      .catch((err) => console.log(err));
  }

  // Если это кнопка изменения описания.
  if (interaction.customId === `description-${interaction.user.id}`) {
    // Изменяем название стадии.
    messages[index].stage = 'description';

    // Отправляем сообщение.
    await interaction
      .update({
        content: 'Введите новое описание.',
        embeds: [],
        components: [],
      })
      .catch((err) => console.log(err));
  }

  // Если это кнопка изменения цвета.
  if (interaction.customId === `color-${interaction.user.id}`) {
    // Изменяем название стадии.
    messages[index].stage = 'color';

    // Отправляем сообщение.
    await interaction
      .update({
        content: 'Введите новый цвет без #.',
        embeds: [],
        components: [],
      })
      .catch((err) => console.log(err));
  }

  // Если это кнопка изменения изображения.
  if (interaction.customId === `image-${interaction.user.id}`) {
    // Изменяем название стадии.
    messages[index].stage = 'image';

    // Отправляем сообщение.
    await interaction
      .update({ content: 'Отправьте изображение.', embeds: [], components: [] })
      .catch((err) => console.log(err));
  }

  // Если это кнопка ссылки.
  if (interaction.customId === `link-${interaction.user.id}`) {
    // Изменяем название стадии.
    messages[index].stage = 'link';

    // Отправляем сообщение.
    await interaction
      .update({ content: 'Введите новую ссылку.', embeds: [], components: [] })
      .catch((err) => console.log(err));
  }

  // Если это кнопка названия ссылки.
  if (interaction.customId === `linkName-${interaction.user.id}`) {
    // Изменяем название стадии.
    messages[index].stage = 'linkName';

    // Отправляем сообщение.
    await interaction
      .update({
        content: 'Введите новое название ссылки.',
        embeds: [],
        components: [],
      })
      .catch((err) => console.log(err));
  }

  // Если это кнопка отправки сообщения.
  if (interaction.customId === `send-${interaction.user.id}`) {
    // Изменяем название стадии.
    messages[index].stage = 'end';

    // Ищем канал.
    const channel = await interaction.guild.channels.cache.find(
      (channel) => channel.id === messages[index].channelSend.id
    );

    // Если канал не найден.
    if (!channel) {
      messages.splice(index, 1);
      return await interaction
        .update({
          content: 'Не найден канал. Создание сообщения отменено.',
          embeds: [],
          components: [],
        })
        .catch((err) => console.log(err));
    }

    // Создаем компоненты.
    const components = [];

    // Создаем переменную с текстом действия.
    let content = 'Сообщение отправлено!';

    if (getUrl(obj.link.url) && obj.urlCheck)
      components.push(
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel(obj.link.name)
            .setURL(messages[index].link.url)
            .setStyle(ButtonStyle.Link)
        )
      );

    // Отправляем сообщение.
    if (messages[index].time) {
      content = 'Сообщение отправлено на таймер.';
      const guildDb = await new Guild().get({ id: interaction.guild.id });

      await guildDb.setMessage({
        member: messages[index].member,
        channel: messages[index].channel,
        time: messages[index].time,
        channelSend: messages[index].channelSend,
        urlCheck: messages[index].urlCheck,
        link: messages[index].link,
        messageContent: messages[index].messageContent,
        embed: messages[index].embed,
      });
    } else if (messages[index].messageContent) {
      await channel
        .send({
          content: `${messages[index].messageContent}`,
          embeds: [messages[index].embed],
          components,
        })
        .catch(async (err) => {
          console.log(err);
          messages.splice(index, 1);
          return await interaction
            .update({
              content: 'Не найден канал. Создание сообщения отменено.',
              embeds: [],
              components: [],
            })
            .catch((err) => console.log(err));
        });
    } else {
      await channel
        .send({ embeds: [messages[index].embed], components })
        .catch(async (err) => {
          console.log(err);
          messages.splice(index, 1);
          return await interaction
            .update({
              content: 'Не найден канал. Создание сообщения отменено.',
              embeds: [],
              components: [],
            })
            .catch((err) => console.log(err));
        });
    }

    await interaction
      .update({ content, embeds: [], components: [] })
      .catch((err) => console.log(err));

    messages.splice(index, 1);
  }

  // Если это отмена
  if (interaction.customId === `cancel-${interaction.user.id}`) {
    messages.splice(index, 1);
    return await interaction
      .update({
        content: 'Создание сообщения отменено.',
        embeds: [],
        components: [],
      })
      .catch((err) => console.log(err));
  }
});

export default {
  data: new SlashCommandBuilder()
    .setName('createembed')
    .setDescription('Создание эмбед.')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .addChannelOption((option) =>
      option
        .setName('канал')
        .setDescription('В какой канал отправить сообщение.')
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName('проверка-ссылки')
        .setDescription(
          'Будет ли ссылка под сообщением? True - да, False - нет.'
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('время')
        .setDescription(
          'Укажите время в формате 1995-12-17T03:24:00. Для отправки сейчас не указывайте этот пункт.'
        )
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName('пинг')
        .setDescription(
          'Какую роль пинговать над эмбедом. Для отправки без пинга не указывайте этот пункт.'
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    const { guild } = interaction;
    if (!guild) return;
    // Получаем гильдию из БД.
    const guildDb = await new Guild().get({ id: guild.id });

    // Проверка прав команды.
    if (
      !member.permissions.has(PermissionsBitField.Flags.Administrator) &&
      !member.roles.cache.has(guildDb.roles?.newsCreator?.id)
    ) {
      // Возвращаем ответ.
      return {
        content: 'У вас нет прав для использования этой команды.',
      };
    }

    // Получаем переменные из команды
    const messageContent = await interaction?.options?._hoistedOptions?.find(
      (option) => option.name === 'пинг'
    )?.role;
    const channelSend = await interaction?.options?._hoistedOptions?.find(
      (option) => option.name === 'канал'
    )?.channel;
    const urlCheck = await interaction?.options?._hoistedOptions?.find(
      (option) => option.name === 'проверка-ссылки'
    )?.value;
    const time = await interaction?.options?._hoistedOptions?.find(
      (option) => option.name === 'время'
    )?.value;

    // Проверка даты.
    if (time && !isDate(time)) {
      return { content: 'Неверно указана дата.' };
    }

    // Ищем объект в массиве.
    const obj = messages.find((el) => el.member.id === member.id);

    // Если объект найден, то отменяем
    if (obj) {
      // Возвращаем ответ.
      return {
        content: `У вас уже идет процесс создания сообщения, закончите его или измените. Изменения можно делать после заполнения всех пунктов. Сейчас вам необходимо написать "${obj.stage}" в канале <#${obj.channel.id}>`,
      };
    }

    // Добавляем объект в массив.
    messages.push({
      member,
      channel,
      time,
      channelSend,
      urlCheck,
      link: {
        name: '🚩 Учавствовать',
        url: 'https://genshin.hoyoverse.com/ru/',
      },
      messageContent,
      stage: 'title',
      embed: new EmbedBuilder().setTitle('Заголовок').setColor(0x2f3136),
    });

    const components = [];

    // Создаем кнопки.
    components.push(
      new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`title-${member.id}`)
            .setLabel('Заголовок')
            .setStyle(ButtonStyle.Primary)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`description-${member.id}`)
            .setLabel('Описание')
            .setStyle(ButtonStyle.Primary)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`color-${member.id}`)
            .setLabel('Цвет')
            .setStyle(ButtonStyle.Primary)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`image-${member.id}`)
            .setLabel('Изображение')
            .setStyle(ButtonStyle.Primary)
        )
    );

    if (urlCheck) {
      components.push(
        new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`link-${member.id}`)
              .setLabel('Ссылка')
              .setStyle(ButtonStyle.Primary)
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`linkName-${member.id}`)
              .setLabel('Название ссылки')
              .setStyle(ButtonStyle.Primary)
          )
      );
    }

    components.push(
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`cancel-${member.id}`)
          .setLabel('Отмена')
          .setStyle(ButtonStyle.Danger)
      )
    );

    // Стадия 1. Указать заголовок.
    await interaction
      .reply({ content: 'Что вы хотите изменить?', components })
      .catch((err) => console.log(err));
  },
};
