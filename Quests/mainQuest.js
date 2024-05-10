import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
} from 'discord.js';

import User from '../Models/Users/User.js';
import Guild from '../Models/Guilds/Guild.js';
import config from '../Config/config.json' assert { type: 'json' };

const startQuest = async (interaction, userDb, questId, embed, components) => {
  await userDb.questStart({ id: questId });

  await updateInteraction(interaction, embed, components);
};

const updateInteraction = async (interaction, embed, components) => {
  if (interaction?.channel?.type === 0 || interaction.value === 'fake') {
    if (interaction.value != 'fake') {
      await interaction
        .reply({
          content:
            'Квест отправлен вам в личные сообщения! Если сообщение не пришло, проверьте настройки приватности и напишите команду еще раз.',
          ephemeral: true,
        })
        .catch((err) => console.log(err));
    }
    return await interaction.member
      .send({ embeds: [embed], components })
      .catch();
  }

  await interaction
    .reply({ embeds: [embed], components })
    .catch((err) => console.log(err));
};

const errorInteraction = async (interaction) => {
  await interaction.reply({
    content: 'Неизвестная ошибка. Обратитесь к администрации. ',
  });
};

const quest = async (interaction, values) => {
  try {
    if (interaction.user.id != values[3]) return;
    const guild = await interaction?.client?.guilds?.cache.find(
      (guild) => guild.id === interaction.client.tokens.GUILD_ID
    );
    const member = await guild?.members?.cache.find(
      (member) => member.id === interaction.user.id
    );
    let selected;
    const embed = new EmbedBuilder().setColor(0x2f3136);
    const components = [];
    const userDb = await User.get({
      id: interaction.user.id,
      guildId: interaction.client.tokens.GUILD_ID,
    });
    const guildDb = await new Guild().get({
      id: interaction.client.tokens.GUILD_ID,
    });

    const quest = await userDb.getQuest({ id: values[1] });
    if (quest) {
      values[2] = quest.stage;
    }

    switch (values[2]) {
      case 'start':
        // Устанавливаем описание эмбеда.
        embed.setTitle('Добро пожаловать!');
        embed.setDescription(
          'Чтобы тебе было проще понять, где ты оказался мы приготовили для тебя квест. Прими же его!'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage(
          'https://media.discordapp.net/attachments/836998525329473576/1172887162803462235/3.png?ex=6561f34a&is=654f7e4a&hm=3d236ef01998a36b94015b5d287a38364bd2ad9fabe4ed073830db3285cddd9a&='
        );

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage1-${interaction.user.id}`)
              .setLabel('Принять квест')
              .setStyle(ButtonStyle.Success)
          )
        );

        // Запускаем квест.
        await startQuest(interaction, userDb, values[2], embed, components);

        // Апаем стадию
        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage1',
        });
        break;
      case 'stage1':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          'Лёгкое покачивание повозки и ритмичный цокот копыт пробуждают ваш разум от сна. ' +
            'Первые лучи солнца не дают вам открыть глаза полностью, от чего вы щуритесь и пытаетесь привыкнуть к свету.'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage2-${interaction.user.id}`)
              .setLabel('...')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage2',
        });

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage2':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          'Продрав немного глаза, вы замечаете орка, сидящего напротив вас.\n' +
            '- *О, ты наконец-то проснулся, чудила!*\n' +
            'Вы с непониманием смотрите на него, пока пытаетесь оклематься.\n' +
            '- *Стража схватила тебя тоже как и того задохлика?* – ехидно улыбаясь спросил орк и качнул головой куда-то в сторону.\n'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage3-${interaction.user.id}`)
              .setLabel('Осмотреться')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage3',
        });

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage3':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          'Вы осматриваетесь и видите темного эльфа в маске, сидящего рядом. Его принадлежность выдали длинные уши и темный, словно смола, цвет кожи.\n' +
            '- *Не обращай внимания на него, он всю дорогу глушил своего... Как это на низком готике? А, "Хрыбное хрючево"!* - сказал темный эльф, посмотрев на вас.'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage4-${interaction.user.id}`)
              .setLabel('...')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage4',
        });

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage4':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          '- *Вагх, а оно ведь прекрасное. Вам задохликам этого не понять. Воть эта вот руками собирал хрыбы.*\n' +
            '- *Завязывай давай!* - эльф указывает пальцем на огромные крепостные ворота, - кажется, я наконец-то избавлюсь от твоей компании.'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage5-${interaction.user.id}`)
              .setLabel('Посмотреть вдаль')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage5',
        });

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage5':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          'Спустя некоторое время, ваша повозка тормозит у ворот. Рядом стоит небольшая сторожка, из нее выходит белокурый эльф.\n' +
            'Он подходит к кучеру и получает от него какие-то бумажки, после осматривает повозку.\n' +
            '- *Всем сойти с повозки для подтверждения личности,* - скомандовал он и достал потрёпанную записную книжку.'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage6-${interaction.user.id}`)
              .setLabel('Сойти с повозки')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage6',
        });

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage6':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          'Темный эльф и орк проходят осмотр. \n' +
            'Так называемое "Хрыбное пиво" изымают у зеленокожего пьянчуги, на что он недовольно зарычал и проговорил какие-то проклятья ' +
            'с использованием таких слов как "Задохлики", "Чоппа", ещё несколько нецензурных выражений.\n' +
            'И теперь наступает ваша очередь. Белокурый эльф подходит к вам и с надменным видом спрашивает:\n' +
            '- *И так, а кто ты?*'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId(`quest-Main-stage7-${interaction.user.id}`)
              .setPlaceholder('Выбрать расу..')
              .addOptions(
                {
                  label: 'Человек',
                  description: 'Ваша раса человек.',
                  value: 'human',
                  emoji: '1072353757007986750',
                },
                {
                  label: 'Нежить',
                  description: 'Ваша раса нежить.',
                  value: 'undead',
                  emoji: '1072353757007986750',
                },
                {
                  label: 'Лесной эльф',
                  description: 'Ваша раса лесные эльфы.',
                  value: 'forestelf',
                  emoji: '1072353757007986750',
                },
                {
                  label: 'Темный эльф',
                  description: 'Ваша раса темные эльфы.',
                  value: 'darkelf',
                  emoji: '1072353757007986750',
                },
                {
                  label: 'Орк',
                  description: 'Ваша раса орки.',
                  value: 'ork',
                  emoji: '1072353757007986750',
                },
                {
                  label: 'Гном',
                  description: 'Ваша раса гномы.',
                  value: 'gnome',
                  emoji: '1072353757007986750',
                }
              )
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage7',
        });

        await updateInteraction(interaction, embed, components);
        break;
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          '- *Вагх, а оно ведь прекрасное. Вам задохликам этого не понять. Воть эта вот руками собирал хрыбы.*\n\n' +
            '- *Завязывай давай!* - эльф указывает пальцем на огромные крепостные ворота, - кажется, я наконец-то избавлюсь от твоей компании.'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage5-${interaction.user.id}`)
              .setLabel('Посмотреть вдаль')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage5',
        });

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage7':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          '- *Ur Agli Mazer faker*\n' +
            'Видимо, поблагодарив вас на эльфийском, он пропускает вашу повозку дальше в город.\n' +
            'Перед вашим взором распахнулся прекрасный вид на город. От самих ворот виднелся большой собор в виде двух крыльев. Тут и там маячили люди разных рас. Вы могли слышать крики торгашей, доносившиеся с рыночного района.\n' +
            'Пока вы осматривались, кучер остановил повозку.\n' +
            '- *Приехали, город Аксель, конечная.*'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage8-${interaction.user.id}`)
              .setLabel('Сойти с повозки')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage8',
        });
        selected = interaction?.values[0];
        switch (selected) {
          case 'human':
            await member.roles.add(guildDb.roles.human.id).catch();
            break;
          case 'undead':
            await member.roles.add(guildDb.roles.undead.id).catch();
            break;
          case 'forestelf':
            await member.roles.add(guildDb.roles.forestelf.id).catch();
            break;
          case 'darkelf':
            await member.roles.add(guildDb.roles.darkelf.id).catch();
            break;
          case 'ork':
            await member.roles.add(guildDb.roles.ork.id).catch();
            break;
          case 'gnome':
            await member.roles.add(guildDb.roles.gnome.id).catch();
            break;
          default:
            break;
        }

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage8':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          'Ваши спутники попрощались с вами и разошлись каждый в свою сторону. На прощание орк вам вручил рекламный буклет пивоварни "Хрючево от сморкалы".\n' +
            'Странное конечно название, но вы думаете, что можно и попробовать.\n' +
            'Не успев проститься со своими новыми знакомыми, к вам подходит стражник.'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage9-${interaction.user.id}`)
              .setLabel('Спросить в чем дело')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage9',
        });

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage9':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          '- *Приветствую тебя незнакомый, но почтенный путешественник, - пробормотал он из-под закрытого забрала, скрывающего его лицо.*\n' +
            'Сам стражник был невысокого роста, но с широким торсом. Из-под шлема вылезала длиннющая борода. Судя по всему, он принадлежал к расе дворфов.\n' +
            '- *Дальше вы не пройдете, пока не получите бумаги.*'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage10-${interaction.user.id}`)
              .setLabel('Попытаться что-то возразить')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage10',
        });

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage10':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          '- *Ну же, вы ведь даже не гражданин!* - сказал он, попытавшись почесать нос, но лишь потёр забрало своего шлема.\n' +
            '- *Это всего лишь обычная формальность учета деятельности людей в городе. Я вас проведу в наши казармы, там вам помогут оформить бумажки и обучат основам жизни в Акселе.*\n' +
            'Он вежливо подошел к вам, взяв вас за руку, потянул за собой. Со стороны это бы выглядело как прогулка с маленьким сыном, но уж больно сильно от него  несёт перегаром.'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage11-${interaction.user.id}`)
              .setLabel('Пройти со стражником')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage11',
        });

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage11':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          'Через некоторое время вы достигаете казарм. Дворф проводит вас к стойке регистрации, за которой сидела очаровательная эльфийка. По её светлому тону кожи, не сложно было догадаться, что она из расы лесных эльфов.\n' +
            '- *Мэй, я привел к тебе путешественника. Он тут впервые, помоги ему с оформлением.*\n' +
            'Эльфийка что-то учуяв, стала принюхиваться, после чего скривила гримасу отвращения.\n' +
            '- *Лоскутик! Ты опять пьешь на работе!* \n' +
            'Её голос был утончён, но от того как она произнесла данную фразу, у вас по спине пробежали мурашки, а в голове забегали мысли, -  «Надеюсь я не попаду под горячую руку".\n' +
            '- *Я знал, что у вас, б***дских,* - в это время, неповоротливая служанка уронила груду книг, и они шлепками посыпались на пол, - *эльфов, нет уважения! Нет чести! НЕТ ПИВА!* \n' +
            'Сделав жест пальцем, эльфийка даёт команду гвардейцам. Молниеносным движением, они сбивают дворфа с ног. Схватив его за обе конечности, утаскивают бедолагу в подземелье. За ними с громким хлопком закрывается железная дверь и запирается на засов.'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage12-${interaction.user.id}`)
              .setLabel('Взглотнуть слюну')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage12',
        });

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage12':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          '- *И так!* - сказала эльфийка серьёзным голосом, поправляя свои очки точным движением, блеск линз ослепил ваши глаза.\n' +
            '- *Значится, ты у нас новенький в городе?* - в это время, она достала огромную стопку бумаг и папок после чего положила их на стол.\n' +
            '- *Это законы, правила этикета и морали, кодексы astartes, базовые заклинания,  молитвы, праздники, рецепты, руководства эксплуатации инвентаря, алхимия для чайников, гайды D&D, лайфхаки, ну и полсотни полезных статей.*\n' +
            'Вам стало дурно от количества макулатуры. Большую часть слов, вы и вовсе не понял, сославшись на то, что они были на эльфийском.'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage13-${interaction.user.id}`)
              .setLabel(
                'Закатить глаза и начать обдумывать о поиске нового сервера'
              )
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage13',
        });

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage13':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          '- *Ты что дурында!*\n' +
            'Где то — за регистраторшей прозвучал нежный голос маленькой девочки и через мгновение за её спиной возникает чуть различимый силуэт. Эльфийка смачно получает книжкой по затылку, вам даже показалось, что на секунду вы увидели её череп и как в момент удара он треснул. Бедняга падает на землю и со слезами на глазах начинает всхлипывать:\n' +
            '- *Что я сделала не так?* - просипела она сквозь слезы.\n' +
            'Маленькая девчушка запрыгивает на стойку, быстро осматривая вас. Встав в элегантную позу и немного поправив платьице, она поклонилась вам.\n' +
            '- *Простите пожалуйста за некомпетентность моего персонала, в качестве компенсации позвольте мне оказать вам услуги.*\n' +
            'Вы все еще слышите, как ранее грозная эльфийка тихонько хнычет под столом.'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage14-${interaction.user.id}`)
              .setLabel('Принять извинения')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage14',
        });

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage14':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          '- *И так дорогой гость, позвольте ознакомить вас с правилами города*\n' +
            'Она протягивает вам основной свод правил <#1071585831799763025>\n' +
            '- *После того как ознакомитесь, прошу вас росписью дать согласие.*'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage15-${interaction.user.id}`)
              .setLabel('Дать согласие')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage15',
        });

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage15':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          '- *А тут, дорогой гость, основные заклинания города, прошу, ознакомься с ними, они очень тебе пригодятся.*\n' +
            'Она протягивает небольшой томик заклинаний, открыв его, перед вами предстают магические схемы и символы. Там же описан принцип их работы, свойств и побочные эффекты. <#1071602367197368321>\n' +
            '- *Некоторые заклинания работают только в определённых местах, и не стоит ими злоупотреблять! Стража может вас не правильно понять и посадить вас на бутылку с манной, во избежание критического истощения оной у вас*'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage16-${interaction.user.id}`)
              .setLabel('Принять том и поблагодарить')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage16',
        });

        await updateInteraction(interaction, embed, components);
        break;
      case 'stage16':
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          '- *Вот вы и ознакомились с основами жизни в городе, прошу расписаться тут и тут.*\n' +
            'Своим маленьким указательным пальцем указывает вам на пункты в протянутой ею бумаге. Вы подписываете ее, не прочитав, и лишь краем глаза замечаете что-то про кредит и залог тела после смерти на опыты.\n' +
            '- *А теперь дорогой гость ступайте в город и пообщайтесь с её горожанами.*\n' +
            'Она вручает вам документ о гражданстве и, мило улыбаясь, машет ручкой. \n' +
            'Попрощавшись с ней, вы уходите, и также в след машете рукой, однако вам не дают покоя всхлипывания и поскуливания эльфийки, лежавшей под столом.\n' +
            '\n\n**Вы получили награду: 1000 эрис.**'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-stage17-${interaction.user.id}`)
              .setLabel('Продолжение следует..')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await userDb.setQuestStage({
          id: values[1],
          stage: 'stage17',
        });

        await userDb.giveEris({ num: 1000 });

        await updateInteraction(interaction, embed, components);
        break;
      default:
        //await userDb.setQuestStage({ id: 'Main', stage: 'start' });
        // Устанавливаем описание эмбеда.
        embed.setDescription(
          'Продолжение квеста еще не готово! В новостях мы обязательно сообщим когда оно появится! ^-^'
        );

        // Устанавливаем изображение эмбеда.
        embed.setImage('https://i.imgur.com/EbcNZBA.png');

        // Добавляем компоненты эмбеду.
        components.push(
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`quest-Main-none-${interaction.user.id}`)
              .setLabel('Ждать..')
              .setStyle(ButtonStyle.Secondary)
          )
        );

        await updateInteraction(interaction, embed, components);
        break;
    }
  } catch (err) {
    console.log(err);
  }
};

export default quest;
