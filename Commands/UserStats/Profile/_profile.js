import {
  EmbedBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from 'discord.js';
import { GlobalFonts, createCanvas, Image } from '@napi-rs/canvas';
import Canvas from '@napi-rs/canvas';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { request } from 'undici';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Регистрируем шрифт.
GlobalFonts.registerFromPath(
  join(__dirname, '..', 'fonts', 'genshin-font.ttf'),
  'Default_JP'
);

// Подключаем классы.
import User from '../../../Models/Users/User.js';
import Guild from '../../../Models/Guilds/Guild.js';

// Конфиги команды
const canvasWidth = 840;
const canvasHeight = 400;

// Все позиции канваса.
const crd = {
  fontColor1: '#ffffff',
  fontColor2: 'rgba(255, 255, 255, 0.7)',

  // Аватар.
  avatar: {
    width: 160,
    x: 80,
    y: 40,
  },

  // Ник.
  nickname: {
    size: 36,
    x: 320,
    y: 86,
  },

  // Ранг приключений текст.
  levelText: {
    text: 'Ранг приключений:',
    size: 24,
    x: 312,
    y: 260,
  },

  // Ранг приключений.
  level: {
    size: 24,
    x: 724,
    y: 260,
  },

  // Опыт текст.
  expText: {
    text: 'Опыт приключений',
    size: 16,
    x: 352,
    y: 292,
  },

  // Опыт.
  exp: {
    size: 16,
    x: 742,
    y: 292,
  },

  // Дата рождения текст.
  birthdayText: {
    text: 'Дата рождения:',
    size: 24,
    x: 312,
    y: 344,
  },

  // Дата рождения.
  birthday: {
    size: 24,
    x: 724,
    y: 344,
  },

  // Подпись.
  signature: {
    size: 20,
    x: 328,
    y: 139,
  },

  // Мора.
  eris: {
    size: 24,
    x: 174,
    y: 258,
  },

  // Прогресс бар
  expBar: {
    color: '#cdff65',
    width: 390,
    height: 6,
    x: 352,
    y: 300,
  },
};

// Получение фона профиля.
const getProfileBackgroundName = (userDb) => {
  return userDb.inventory.shop.profileCards.active;
};
// Получение рамки профиля.
const getProfileFrameName = (userDb) => {
  return userDb.inventory.shop.profileFrames.active;
};
// Получение тени профиля.
const getProfileShadowName = (userDb) => {
  return userDb.inventory.shop.profileShadows.active;
};

// Функция сокращения текста.
const shorten = (text, len) => {
  if (typeof text !== 'string') return '';
  if (text.length - 1 <= len) return text;
  return text.substr(0, len).trim() + `..`;
};

// Функция вырезки из текста с символа по символ (до пробела)
const truncText = (text) => {
  const maxLineSize = 35;
  if (text.length < maxLineSize) return [text];

  // В этот массив добавим результат построчно.
  const result = [];

  // Высчитываем количество строчек.
  let numberOfLines = 1;
  if (text.length >= maxLineSize * 3) numberOfLines = 4;
  else if (text.length >= maxLineSize * 2) numberOfLines = 3;
  else if (text.length >= maxLineSize * 1) numberOfLines = 2;

  let stopLine = 0;
  for (let i = 1; i < numberOfLines + 1; i++) {
    const start = stopLine;
    const stop = i * maxLineSize;
    const array = [];

    // Чекер указывает на то, началась ли строка.
    let checker = false;
    for (let j = start; j < text.length; j++) {
      if (j === 0 && i === 1) {
        array.push(text[j]);
        checker = true;
      } else if (!checker && text[j - 1] === ' ') {
        checker = true;
        array.push(text[j]);
      } else if (checker && j < stop) {
        array.push(text[j]);
      } else if (!stopLine && j >= stop && text[j + 1] != ' ') {
        array.push(text[j]);
      } else if (!stopLine && j >= stop && text[j + 1] === ' ') {
        array.push(text[j]);
        stopLine = j;
        break;
      }
    }

    result.push(array.join(''));
  }

  if (text.length > maxLineSize * 3) result[3] = `${result[3]}...`;

  return result;
};

const command = async (interaction) => {
  // Даем боту время подумать.
  await interaction.deferReply();

  // Получаем значения с интеракции.
  const { guild, channel, options } = interaction;

  // Загружаем экземпляр класса гильдии.
  const guildDb = await new Guild().get({ id: guild.id });

  // Загружаем переменные
  const targetUser = options?.getUser('пользователь');

  const user = targetUser || interaction.user;

  // Загружаем экземпляр класса пользователя.
  const userDb = await User.get({ id: user.id, guildId: guild.id });

  // Объект мембера.
  const member = await guild.members.cache.find(
    (member) => member.id === user.id
  );

  // Создаем переменную для проверки эфермальности сообщения.
  const ephemeral = channel.id != guildDb.channels.spam.id;

  // Получаем дату рождения.
  let birthday = 'Не указано';
  if (userDb.birthday?.day > 0 && userDb.birthday?.month > 0) {
    const day =
      userDb.birthday.day >= 10
        ? userDb.birthday.day
        : `0${userDb.birthday.day}`;
    const month =
      userDb.birthday.month >= 10
        ? userDb.birthday.month
        : `0${userDb.birthday.month}`;
    birthday = `${day}.${month}`;
  }

  // Получаем имя фона карточки.
  const backgroundName = getProfileBackgroundName(userDb);
  // Получаем имя рамки карточки.
  const frameName = getProfileFrameName(userDb);
  // Получаем имя тени карточки.
  const shadowName = getProfileShadowName(userDb);

  // Получаем подпись.
  const notice = userDb.signature;
  const notices = truncText(notice);

  // Расчет процентов прогресс бара
  const progressBarExpProcent =
    (crd.expBar.width / ((userDb.levels.level + 1) * 100)) * userDb.levels.exp;

  // // // Рисуем // // //
  // Создаем канвас.
  const canvas = createCanvas(canvasWidth, canvasHeight);

  // Загружаем контекст.
  const ctx = canvas.getContext('2d');

  // Аватар
  // Получаем аватар пользователя.
  const { body } = await request(user.displayAvatarURL({ format: 'jpg' }));
  const avatar = new Image();
  avatar.src = Buffer.from(await body.arrayBuffer());
  ctx.drawImage(
    avatar,
    crd.avatar.x,
    crd.avatar.y,
    crd.avatar.width,
    crd.avatar.width
  );

  // Фон
  const backgroundImage = await Canvas.loadImage(
    join(__dirname, `../../../Images/Profile/${backgroundName}-Background.png`)
  );
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Рисуем Свечение аватара.
  const avatarShadow = await Canvas.loadImage(
    join(__dirname, `../../../Images/Profile/${shadowName}-AvatarShadow.png`)
  );
  ctx.drawImage(avatarShadow, 57, 16, 202, 202);

  // Рисуем Элементы.
  const textsImage = await Canvas.loadImage(
    join(__dirname, '../../../Images/Profile/ProfileCard-Elements.png')
  );
  ctx.drawImage(textsImage, 0, 0, canvas.width, canvas.height);

  // Рисуем Рамку.
  const frameImage = await Canvas.loadImage(
    join(__dirname, `../../../Images/Profile/${frameName}-Frame.png`)
  );
  ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

  // Рисуем тестовый профиль.
  // const testProfile = await Canvas.loadImage(join(__dirname, `../../../Images/profile-test.png`));
  // ctx.drawImage(testProfile, 0, 0, canvas.width, canvas.height);

  // Ник
  ctx.font = `${crd.nickname.size}px Default_JP`;
  ctx.fillStyle = crd.fontColor1;
  ctx.textAlign = 'left';
  ctx.fillText(shorten(member.displayName, 20), crd.nickname.x, crd.nickname.y);

  // Опыт текст
  ctx.font = `${crd.expText.size}px Default_JP`;
  ctx.fillStyle = crd.fontColor1;
  ctx.textAlign = 'left';
  ctx.fillText(crd.expText.text, crd.expText.x, crd.expText.y);

  // Опыт
  ctx.font = `${crd.exp.size}px Default_JP`;
  ctx.fillStyle = crd.fontColor1;
  ctx.textAlign = 'right';
  ctx.fillText(
    `${userDb.levels.exp.toLocaleString('ru')} / ${(
      (userDb.levels.level + 1) *
      100
    ).toLocaleString('ru')}`,
    crd.exp.x,
    crd.exp.y
  );

  // Уровень.
  ctx.font = `${crd.level.size}px Default_JP`;
  ctx.fillStyle = crd.fontColor1;
  ctx.textAlign = 'right';
  ctx.fillText(`${userDb.levels.level}`, crd.level.x, crd.level.y);

  // Уровень текст
  ctx.font = `${crd.levelText.size}px Default_JP`;
  ctx.fillStyle = crd.fontColor1;
  ctx.textAlign = 'left';
  ctx.fillText(crd.levelText.text, crd.levelText.x, crd.levelText.y);

  // Подпись.
  for (let i = 0; i < notices.length; i++) {
    ctx.font = `${crd.signature.size}px Default_JP`;
    ctx.fillStyle = crd.fontColor2;
    ctx.textAlign = 'left';
    ctx.fillText(notices[i], crd.signature.x, crd.signature.y + i * 22);
  }

  // Мора.
  ctx.font = `${crd.eris.size}px Default_JP`;
  ctx.fillStyle = crd.fontColor1;
  ctx.textAlign = 'center';
  ctx.fillText(`${userDb.money.eris.value}`, crd.eris.x, crd.eris.y);

  // Дата рождения текст
  ctx.font = `${crd.birthdayText.size}px Default_JP`;
  ctx.fillStyle = crd.fontColor1;
  ctx.textAlign = 'left';
  ctx.fillText(crd.birthdayText.text, crd.birthdayText.x, crd.birthdayText.y);

  // Дата рождения.
  ctx.font = `${crd.birthday.size}px Default_JP`;
  ctx.fillStyle = crd.fontColor1;
  ctx.textAlign = 'right';
  ctx.fillText(birthday, crd.birthday.x, crd.birthday.y);

  // Прогресс бар опыта
  ctx.beginPath();
  ctx.fillStyle = crd.expBar.color;
  ctx.rect(
    crd.expBar.x,
    crd.expBar.y,
    progressBarExpProcent,
    crd.expBar.height
  );
  ctx.strokeStyle = crd.expBar.color;
  ctx.stroke();
  ctx.fill();
  ctx.closePath();

  // Создаем итоговое изображение.
  const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), {
    name: 'profile.png',
  });

  // Создаем пустой эмбед.
  const embed = new EmbedBuilder().setDescription(
    `Не удалось загрузить профиль`
  );

  // Добавляем кнопки
  const upgradeAttrubutesButton = new ButtonBuilder()
    .setCustomId(`attributes-${member.id}`)
    .setLabel(`${DesignConfig.emojis.perks}`)
    .setStyle(ButtonStyle.Secondary);
  const inventoryButton = new ButtonBuilder()
    .setCustomId(`inventory-${member.id}`)
    .setLabel(`${DesignConfig.emojis.inventory}`)
    .setStyle(ButtonStyle.Secondary);
  const activeSpellsButton = new ButtonBuilder()
    .setCustomId(`activeSpells-${member.id}`)
    .setLabel(`${DesignConfig.emojis.spells}`)
    .setStyle(ButtonStyle.Secondary);
  const row = new ActionRowBuilder().addComponents(
    upgradeAttrubutesButton,
    inventoryButton,
    activeSpellsButton
  );

  // Отправляем ответ.
  await interaction
    .editReply({
      embed: [embed],
      components: [row],
      files: [attachment],
      ephemeral,
    })
    .catch((err) => console.log(err));
};

export default command;
