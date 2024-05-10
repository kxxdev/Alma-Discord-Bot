import {
  EmbedBuilder,
  Events,
  StringSelectMenuBuilder,
  ActionRowBuilder,
} from 'discord.js';

const gs = '<:green:1072353757007986750>';
const ps = '<:pink:1072353875958444082>';

const arRoles = {
  ar1: '1072361079176450068',
  ar2: '1072361139746381874',
  ar3: '1072361176098410598',
  ar4: '1072361191411814503',
  ar5: '1072361205664067685',
  ar6: '1072361218230202370',
  ar7: '1072361238568390667',
  ar8: '1072361256666800168',
};

const serverRoles = {
  europe: '1072566099293515916',
  asia: '1072566177366278206',
  amerika: '1072566163072102522',
};

const ageRoles = {
  min14: '1072572457413779577',
  plus14: '1072572504796831784',
  plus16: '1072572536602239077',
  plus18: '1072572555191386203',
};

const genderRoles = {
  male: '1072572309430337576',
  female: '1072572355156639744',
};

export default {
  name: 'interactionCreate',
  async execute(interaction) {
    // Проверяем, было ли это селект-меню.
    if (!interaction.isStringSelectMenu()) return;

    // Проверяем, нужное ли это селект-меню.
    if (
      interaction.customId != 'pers-message' &&
      interaction.customId != 'anemo-message' &&
      interaction.customId != 'geo-message' &&
      interaction.customId != 'electro-message' &&
      interaction.customId != 'dendro-message' &&
      interaction.customId != 'gidro-message' &&
      interaction.customId != 'piro-message' &&
      interaction.customId != 'crio-message'
    )
      return;

    // Записываем выбранное значение.
    const selected = interaction.values[0];

    // Создаем эмбеды.
    const embeds = [];

    // Создаем аттачмент.
    let files = [];

    // Создаем компоненты.
    const components = [];

    // Если выбрана карта города.
    if (selected === 'anemo') {
      // Записываем эмбед.
      embeds.push(
        new EmbedBuilder()
          .setColor(0x2f3136)
          .setImage('https://i.imgur.com/EbcNZBA.png')
          .setDescription(`Выберите персонажа стихии Анемо`)
      );

      // Добавляем селект-меню.
      components.push(
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('anemo-message')
            .setPlaceholder('Выбрать персонажа..')
            .addOptions(
              {
                label: 'Хэйдзо',
                description: 'Посмотреть прокачку Хэйдзо.',
                value: 'heidzo',
              },
              {
                label: 'Сяо',
                description: 'Посмотреть прокачку Сяо.',
                value: 'xiao',
              },
              {
                label: 'Фарузан',
                description: 'Посмотреть прокачку Фарузан.',
                value: 'faruzan',
              },
              {
                label: 'Странник',
                description: 'Посмотреть прокачку Странника.',
                value: 'wanderer',
              },
              {
                label: 'Саю',
                description: 'Посмотреть прокачку Саю.',
                value: 'sayu',
              },
              {
                label: 'Сахароза',
                description: 'Посмотреть прокачку Сахарозы.',
                value: 'sucrose',
              },
              {
                label: 'Кадзуха',
                description: 'Посмотреть прокачку Кадзухи.',
                value: 'kazuha',
              },
              {
                label: 'Венти',
                description: 'Посмотреть прокачку Венти.',
                value: 'venti',
              },
              {
                label: 'Джин',
                description: 'Посмотреть прокачку Джин.',
                value: 'jean',
              }
            )
        )
      );
    } else if (interaction.customId === 'anemo-message') {
      if (selected === 'heidzo') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076456820597588038/7b36a37d2e784b81.png?width=988&height=545'
        );
      } else if (selected === 'xiao') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076737291189497897/456809265a4f9505.png?width=912&height=503'
        );
      } else if (selected === 'faruzan') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076742506689073152/751c629fc49db084.png?width=912&height=503'
        );
      } else if (selected === 'wanderer') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076745056310013952/8865223b36441953.png?width=912&height=503'
        );
      } else if (selected === 'sayu') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076975401965981697/3314cf4fdbec3654.png?width=912&height=503'
        );
      } else if (selected === 'sucrose') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076981221084639242/901e066ce3e62da3.png?width=912&height=503'
        );
      } else if (selected === 'kazuha') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1121937233470038139/50c8c21248ccaa6d.png?width=1067&height=588'
        );
      } else if (selected === 'venti') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122599338275766362/996e5368473e4e71.png?width=1071&height=591'
        );
      } else if (selected === 'jean') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122599552986390578/38650598a6f3ba1c.png?width=1071&height=591'
        );
      }
    } else if (selected === 'geo') {
      // Записываем эмбед.
      embeds.push(
        new EmbedBuilder()
          .setColor(0x2f3136)
          .setImage('https://i.imgur.com/EbcNZBA.png')
          .setDescription(`Выберите персонажа стихии Гео`)
      );

      // Добавляем селект-меню.
      components.push(
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('geo-message')
            .setPlaceholder('Выбрать персонажа..')
            .addOptions(
              {
                label: 'Чжун Ли',
                description: 'Посмотреть прокачку Чжун Ли.',
                value: 'zhongli',
              },
              {
                label: 'Юнь Цзинь',
                description: 'Посмотреть прокачку Юнь Цзинь.',
                value: 'yundzin',
              },
              {
                label: 'Альбедо',
                description: 'Посмотреть прокачку Альбедо.',
                value: 'albedo',
              },
              {
                label: 'Ноэлль',
                description: 'Посмотреть прокачку Ноэлль.',
                value: 'noelle',
              },
              {
                label: 'Нин Гуан',
                description: 'Посмотреть прокачку Нин Гуан.',
                value: 'ningguang',
              },
              {
                label: 'Горо',
                description: 'Посмотреть прокачку Горо.',
                value: 'gorou',
              },
              {
                label: 'Итто',
                description: 'Посмотреть прокачку Итто.',
                value: 'itto',
              }
            )
        )
      );
    } else if (interaction.customId === 'geo-message') {
      if (selected === 'zhongli') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076698203380006952/0a37a0660061cf6f.png?width=912&height=503'
        );
      } else if (selected === 'yundzin') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076456820895391834/51d587a2dabd6acc.png?width=1006&height=555'
        );
      } else if (selected === 'albedo') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076999588197703740/0a3aef67ba349aca.png?width=912&height=503'
        );
      } else if (selected === 'noelle') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1077009758692851823/c04d05ca380c2b20.png?width=912&height=503'
        );
      } else if (selected === 'ningguang') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1077012814931165285/2c59e1a0656d1948.png?width=912&height=503'
        );
      } else if (selected === 'gorou') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122599459335962746/3de21b61eabdd9e5.png?width=1071&height=591'
        );
      } else if (selected === 'itto') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122599991060475914/47c96c0b9cdd5be9.png?width=1071&height=591'
        );
      }
    } else if (selected === 'electro') {
      // Записываем эмбед.
      embeds.push(
        new EmbedBuilder()
          .setColor(0x2f3136)
          .setImage('https://i.imgur.com/EbcNZBA.png')
          .setDescription(`Выберите персонажа стихии Электро`)
      );

      // Добавляем селект-меню.
      components.push(
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('electro-message')
            .setPlaceholder('Выбрать персонажа..')
            .addOptions(
              {
                label: 'Яэ Мико',
                description: 'Посмотреть прокачку Яэ Мико.',
                value: 'yaemiko',
              },
              {
                label: 'Фишль',
                description: 'Посмотреть прокачку Фишль.',
                value: 'fischl',
              },
              {
                label: 'Синобу',
                description: 'Посмотреть прокачку Синобу.',
                value: 'shinobu',
              },
              {
                label: 'Сара',
                description: 'Посмотреть прокачку Сары.',
                value: 'sara',
              },
              {
                label: 'Сайно',
                description: 'Посмотреть прокачку Сайно.',
                value: 'cyno',
              },
              {
                label: 'Рэйзор',
                description: 'Посмотреть прокачку Рэйзора.',
                value: 'razor',
              },
              {
                label: 'Райдэн',
                description: 'Посмотреть прокачку Райдэн.',
                value: 'raiden',
              },
              {
                label: 'Лиза',
                description: 'Посмотреть прокачку Лизы.',
                value: 'lisa',
              },
              {
                label: 'Кэ Цин',
                description: 'Посмотреть прокачку Кэ Цин.',
                value: 'keqing',
              },
              {
                label: 'Бэй Доу',
                description: 'Посмотреть прокачку Бэй Доу.',
                value: 'beidou',
              },
              {
                label: 'Дори',
                description: 'Посмотреть прокачку Дори.',
                value: 'dori',
              }
            )
        )
      );
    } else if (interaction.customId === 'electro-message') {
      if (selected === 'yaemiko') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076456821818134609/b6a631feeef2e6d4.png?width=1006&height=555'
        );
      } else if (selected === 'fischl') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076735113385226260/bc8179b7fbca6f98.png?width=912&height=503'
        );
      } else if (selected === 'shinobu') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076750839777087548/c7c0c53b265812bf.png?width=912&height=503'
        );
      } else if (selected === 'sara') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076990706389876776/fdcdfe3659d2c0ff.png?width=912&height=503'
        );
      } else if (selected === 'cyno') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076996723924291594/e3df192c8efd0b7d.png?width=912&height=503'
        );
      } else if (selected === 'razor') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1077002951584923748/8395c862eb980abb.png?width=912&height=503'
        );
      } else if (selected === 'raiden') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1077007162179592303/5a6d366b9c439c7b.png?width=912&height=503'
        );
      } else if (selected === 'lisa') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1077022836444631090/513fc394f07f096a.png?width=912&height=503'
        );
      } else if (selected === 'keqing') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1121936752559542383/23c4b9b4ff900e01.png?width=1067&height=588'
        );
      } else if (selected === 'beidou') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122599253387259944/093ae806a9e3cd58.png?width=1071&height=591'
        );
      } else if (selected === 'dori') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122599792749584576/b2e746c8477fa2c4.png?width=1071&height=591'
        );
      }
    } else if (selected === 'dendro') {
      // Записываем эмбед.
      embeds.push(
        new EmbedBuilder()
          .setColor(0x2f3136)
          .setImage('https://i.imgur.com/EbcNZBA.png')
          .setDescription(`Выберите персонажа стихии Дендро`)
      );

      // Добавляем селект-меню.
      components.push(
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('dendro-message')
            .setPlaceholder('Выбрать персонажа..')
            .addOptions(
              {
                label: 'Яо Яо',
                description: 'Посмотреть прокачку Яо Яо.',
                value: 'yaoyao',
              },
              {
                label: 'Тигнари',
                description: 'Посмотреть прокачку Тигнари.',
                value: 'tighnari',
              },
              {
                label: 'Нахида',
                description: 'Посмотреть прокачку Нахиды.',
                value: 'nahida',
              },
              {
                label: 'Коллеи',
                description: 'Посмотреть прокачку Коллеи.',
                value: 'collei',
              },
              {
                label: 'Кирара',
                description: 'Посмотреть прокачку Кирары.',
                value: 'kirara',
              },
              {
                label: 'Кавех',
                description: 'Посмотреть прокачку Кавеха.',
                value: 'kaveh',
              },
              {
                label: 'Аль-Хайтам',
                description: 'Посмотреть прокачку Аль-Хайтама.',
                value: 'alhaitham',
              },
              {
                label: 'Бай Чжу',
                description: 'Посмотреть прокачку Бай Чжу.',
                value: 'baizhu',
              }
            )
        )
      );
    } else if (interaction.customId === 'dendro-message') {
      if (selected === 'yaoyao') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076456821553897502/d38c7b4ffa5cc116.png?width=1006&height=555'
        );
      } else if (selected === 'tighnari') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076742944129814559/f26ed155f75c563f.png?width=912&height=503'
        );
      } else if (selected === 'nahida') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1077019077492604948/518cfae64355c8f4.png?width=912&height=503'
        );
      } else if (selected === 'collei') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1121936848600694855/695b296037398d62.png?width=1067&height=588'
        );
      } else if (selected === 'kirara') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1121937066134085672/d8c5839c2860ecdc.png?width=1067&height=588'
        );
      } else if (selected === 'kaveh') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1121937332132651018/7eeb73245fab748b.png?width=1067&height=588'
        );
      } else if (selected === 'alhaitham') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122597752690442400/4eb76a8c0e2ccc4e.png?width=1071&height=591'
        );
      } else if (selected === 'baizhu') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122598978396102656/a2d9da28936e1e40.png?width=1071&height=591'
        );
      }
    } else if (selected === 'gidro') {
      // Записываем эмбед.
      embeds.push(
        new EmbedBuilder()
          .setColor(0x2f3136)
          .setImage('https://i.imgur.com/EbcNZBA.png')
          .setDescription(`Выберите персонажа стихии Гидро`)
      );

      // Добавляем селект-меню.
      components.push(
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('gidro-message')
            .setPlaceholder('Выбрать персонажа..')
            .addOptions(
              {
                label: 'Тарталья',
                description: 'Посмотреть прокачку Тарталья.',
                value: 'tartaglia',
              },
              {
                label: 'Син Цю',
                description: 'Посмотреть прокачку Син Цю.',
                value: 'xingqiu',
              },
              {
                label: 'Нилу',
                description: 'Посмотреть прокачку Нилу.',
                value: 'nilou',
              },
              {
                label: 'Мона',
                description: 'Посмотреть прокачку Моны.',
                value: 'mona',
              },
              {
                label: 'Кокоми',
                description: 'Посмотреть прокачку Кокоми.',
                value: 'kokomi',
              },
              {
                label: 'Кандакия',
                description: 'Посмотреть прокачку Кандакии.',
                value: 'candace',
              },
              {
                label: 'Аято',
                description: 'Посмотреть прокачку Аято.',
                value: 'ayato',
              },
              {
                label: 'Барбара',
                description: 'Посмотреть прокачку Барбары.',
                value: 'barbara',
              },
              {
                label: 'Е Лань',
                description: 'Посмотреть прокачку Е Лань.',
                value: 'yelan',
              }
            )
        )
      );
    } else if (interaction.customId === 'gidro-message') {
      if (selected === 'tartaglia') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076456820291412058/f385e72c9441cb8e.png?width=1006&height=555'
        );
      } else if (selected === 'xingqiu') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076971571152945152/a9bc5a76331234de.png?width=912&height=503'
        );
      } else if (selected === 'nilou') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1077015014076059768/3e9a45192069d093.png?width=912&height=503'
        );
      } else if (selected === 'mona') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1077021709338677359/3a7fe84036827fce.png?width=912&height=503'
        );
      } else if (selected === 'kokomi') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1121936922894409880/ff23e052165ff55b.png?width=1067&height=588'
        );
      } else if (selected === 'candace') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1121937159436382342/211adeaf329a52d2.png?width=1067&height=588'
        );
      } else if (selected === 'ayato') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122597861725573120/cba95587d983eb48.png?width=1071&height=591'
        );
      } else if (selected === 'barbara') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122599059899809822/67610c0b5169e92c.png?width=1071&height=591'
        );
      } else if (selected === 'yelan') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122599858105221230/36c37c6ec29b3ba9.png?width=1071&height=591'
        );
      }
    } else if (selected === 'piro') {
      // Записываем эмбед.
      embeds.push(
        new EmbedBuilder()
          .setColor(0x2f3136)
          .setImage('https://i.imgur.com/EbcNZBA.png')
          .setDescription(`Выберите персонажа стихии Пиро`)
      );

      // Добавляем селект-меню.
      components.push(
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('piro-message')
            .setPlaceholder('Выбрать персонажа..')
            .addOptions(
              {
                label: 'Янь Фэй',
                description: 'Посмотреть прокачку Янь Фэй.',
                value: 'yanfei',
              },
              {
                label: 'Дэхья',
                description: 'Посмотреть прокачку Дехьи.',
                value: 'dehya',
              },
              {
                label: 'Эмбер',
                description: 'Посмотреть прокачку Эмбер.',
                value: 'ember',
              },
              {
                label: 'Ху Тао',
                description: 'Посмотреть прокачку Ху Тао.',
                value: 'hutao',
              },
              {
                label: 'Тома',
                description: 'Посмотреть прокачку Томы.',
                value: 'thoma',
              },
              {
                label: 'Сян Лин',
                description: 'Посмотреть прокачку Сян Лин.',
                value: 'xiangling',
              },
              {
                label: 'Синь Янь',
                description: 'Посмотреть прокачку Синь Янь.',
                value: 'xinyan',
              },
              {
                label: 'Кли',
                description: 'Посмотреть прокачку Кли.',
                value: 'klee',
              },
              {
                label: 'Беннет',
                description: 'Посмотреть прокачку Беннета.',
                value: 'bennett',
              },
              {
                label: 'Дилюк',
                description: 'Посмотреть прокачку Дилюка.',
                value: 'diluc',
              },
              {
                label: 'Ёимия',
                description: 'Посмотреть прокачку Ёимии.',
                value: 'yoimiya',
              }
            )
        )
      );
    } else if (interaction.customId === 'piro-message') {
      if (selected === 'yanfei') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076456821155430420/1e0e1927647c8a46.png?width=1006&height=555'
        );
      } else if (selected === 'dehya') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076456819641290802/45b0e7d443def620.png?width=1006&height=555'
        );
      } else if (selected === 'ember') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076673500015771678/0a6f4b8e5dc8cbd2.png?width=912&height=503'
        );
      } else if (selected === 'hutao') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076734986729828372/bd01d0bf2db7e6a0.png?width=912&height=503'
        );
      } else if (selected === 'thoma') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076735348962496512/0bf5e34f8775365b.png?width=912&height=503'
        );
      } else if (selected === 'xiangling') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076739092378832906/cc88644b47d1bbcc.png?width=912&height=503'
        );
      } else if (selected === 'xinyan') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076746471816298576/2225e4495d0c55d9.png?width=912&height=503'
        );
      } else if (selected === 'klee') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1121936994017226793/a4fcb7532d687fa8.png?width=1067&height=588'
        );
      } else if (selected === 'bennett') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122599183631790120/1fbb42d25b4d372f.png?width=1071&height=591'
        );
      } else if (selected === 'diluc') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122599626776784926/2bd3ac904a23c4e2.png?width=1071&height=591'
        );
      } else if (selected === 'yoimiya') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122599929978818701/22f2a0a672bdbdce.png?width=1071&height=591'
        );
      }
    } else if (selected === 'crio') {
      // Записываем эмбед.
      embeds.push(
        new EmbedBuilder()
          .setColor(0x2f3136)
          .setImage('https://i.imgur.com/EbcNZBA.png')
          .setDescription(`Выберите персонажа стихии Крио`)
      );

      // Добавляем селект-меню.
      components.push(
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('crio-message')
            .setPlaceholder('Выбрать персонажа..')
            .addOptions(
              {
                label: 'Ци Ци',
                description: 'Посмотреть прокачку Ци Ци.',
                value: 'qiqi',
              },
              {
                label: 'Шэнь Хэ',
                description: 'Посмотреть прокачку Шэнь Хэ.',
                value: 'shenhe',
              },
              {
                label: 'Мика',
                description: 'Посмотреть прокачку Мики.',
                value: 'mika',
              },
              {
                label: 'Эола',
                description: 'Посмотреть прокачку Эолы.',
                value: 'eola',
              },
              {
                label: 'Элой',
                description: 'Посмотреть прокачку Элой.',
                value: 'eloy',
              },
              {
                label: 'Чун Юнь',
                description: 'Посмотреть прокачку Чунь Юня.',
                value: 'chongyun',
              },
              {
                label: 'Розария',
                description: 'Посмотреть прокачку Розарии.',
                value: 'rosaria',
              },
              {
                label: 'Лайла',
                description: 'Посмотреть прокачку Лайлы.',
                value: 'layla',
              },
              {
                label: 'Кэйа',
                description: 'Посмотреть прокачку Кэйи.',
                value: 'kaeya',
              },
              {
                label: 'Аяка',
                description: 'Посмотреть прокачку Аяки.',
                value: 'ayaka',
              },
              {
                label: 'Гань Юй',
                description: 'Посмотреть прокачку Гань Юй.',
                value: 'ganyu',
              },
              {
                label: 'Диона',
                description: 'Посмотреть прокачку Диона.',
                value: 'diona',
              }
            )
        )
      );
    } else if (interaction.customId === 'crio-message') {
      if (selected === 'qiqi') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076706792077262888/687df73a320c98a4.png?width=912&height=503'
        );
      } else if (selected === 'mika') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076456819943276635/ca9f97c3edebd90e.png?width=1006&height=555'
        );
      } else if (selected === 'eola') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076667669631217734/2fee5e5458ae2543.png?width=912&height=503'
        );
      } else if (selected === 'eloy') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076679243368513606/8a9f0919ef9cb27c.png?width=912&height=503'
        );
      } else if (selected === 'shenhe') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076688371847540757/977ab5393511e94c.png?width=912&height=503'
        );
      } else if (selected === 'chongyun') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1076692070900711495/78c997495ba66844.png?width=912&height=503'
        );
      } else if (selected === 'rosaria') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1077004799226163270/cad72a4ccdc1b254.png?width=912&height=503'
        );
      } else if (selected === 'layla') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1121936530575986698/3b0b9f05dcf03138.png?width=1067&height=588'
        );
      } else if (selected === 'kaeya') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1121936661035622490/7d157215ecaeca99.png?width=1067&height=588'
        );
      } else if (selected === 'ayaka') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122598878198386688/b93f462abe96dca8.png?width=1071&height=591'
        );
      } else if (selected === 'ganyu') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122599397071536308/aae1597072b15f64.png?width=1071&height=591'
        );
      } else if (selected === 'diona') {
        files.push(
          'https://media.discordapp.net/attachments/836998525329473576/1122599719936475247/20466a7942bbdeeb.png?width=1071&height=591'
        );
      }
    }

    // Отправляем ответ пользователю.
    if (files.length > 0) {
      await interaction
        .reply({ ephemeral: true, files })
        .catch((err) => console.log(err));
    } else {
      await interaction
        .reply({ embeds, components, ephemeral: true })
        .catch((err) => console.log(err));
    }
  },
};
