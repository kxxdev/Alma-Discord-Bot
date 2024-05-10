import { EmbedBuilder } from 'discord.js';
import User from '../../Models/Users/User.js';
import colors from '../../Config/colors.json' assert { type: 'json' };

import { addHours, isPast } from 'date-fns';

import getTimeLeft from '../../Functions/dateFunctions.js';

export default {
  name: 'interactionCreate',
  async execute(interaction) {
    // Проверяем, было ли это селект-меню.
    if (!interaction.isStringSelectMenu()) return;

    // Проверяем, нужное ли это селект-меню.
    if (
      interaction.customId != 'work-farmer-message' &&
      interaction.customId != 'work-join-message' &&
      interaction.customId != 'work-brewer-message'
    )
      return;

    // Записываем выбранное значение.
    const selected = interaction.values[0];

    // Получаем данные с интеракции.
    const { guild, member } = interaction;

    // Загружаем экземпляр пользователя.
    const userDb = await new User().get({ id: member.id, guildId: guild.id });
    console.log(interaction.customId);
    // Проверяем было ли это принятие на работу
    if (interaction.customId === 'work-join-message') {
      // Проверяем был ли пользователь уже трудоустроен.
      if (userDb.work.currently != 'Безработный' && selected != 'Безработный') {
        return await interaction.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setColor(Number(colors.error))
              .setDescription(
                `**Вы уже устроены на работу. Чтобы сменить ее вам нужно уволиться.**
          
Учтите, что при смене работы сбрасывается таймер урожая.
Уровень работы не теряется.`
              )
              .setImage(
                'https://media.tenor.com/XISdXhhFDhwAAAAC/line-border.gif'
              ),
          ],
        });
      }
      // Проверяем выбрана ли работа пивовара.
      if (selected === 'Пивовар' && userDb.levels.level < 5) {
        return await interaction.reply({
          content: 'Для работы на пивоварне требуется 5 уровень.',
          ephemeral: true,
        });
      }
      await userDb.getWork({ value: selected, member });

      if (selected === 'Безработный') {
        return await interaction
          .reply({
            ephemeral: true,
            embeds: [
              new EmbedBuilder()
                .setTitle('Увольнение')
                .setColor(Number(colors.success))
                .setDescription(
                  `
Вы уволились с работы
            `
                )
                .setImage(
                  'https://media.tenor.com/XISdXhhFDhwAAAAC/line-border.gif'
                ),
            ],
          })
          .catch((err) => console.log(err));
      }

      await interaction
        .reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setTitle('Новая работа!')
              .setColor(Number(colors.success))
              .setDescription(
                `
Поздравляем, вы устроились на работу: **${selected}**
            `
              )
              .setImage(
                'https://media.tenor.com/XISdXhhFDhwAAAAC/line-border.gif'
              ),
          ],
        })
        .catch((err) => console.log(err));
    }

    // Проверяем была ли это работа фермера.
    else if (interaction.customId === 'work-farmer-message') {
      // Создаем футер.
      const footer = `Фермер. Уровень ${userDb.work.farmer.levels.level} [${
        userDb.work.farmer.levels.exp
      }/${userDb.work.farmer.levels.level * 10}]`;

      // Проверка на работу.
      if (userDb.work.currently != 'Фермер') {
        return await interaction
          .reply({
            ephemeral: true,
            embeds: [
              new EmbedBuilder()
                .setTitle('Работа на ферме')
                .setColor(Number(colors.error))
                .setFooter({
                  text: footer,
                })
                .setDescription(`Вы не устроены на работу фермера`)
                .setImage(
                  'https://media.tenor.com/XISdXhhFDhwAAAAC/line-border.gif'
                ),
            ],
          })
          .catch((err) => console.log(err));
      }

      // Записываем сколько времени осталось до сбора урожая.
      const hoursToGet = addHours(
        userDb.work.farmer.products[selected].date,
        4
      );

      // Если урожай еще не готов.
      if (!isPast(hoursToGet)) {
        return await interaction
          .reply({
            ephemeral: true,
            embeds: [
              new EmbedBuilder()
                .setTitle('Работа на ферме')
                .setColor(Number(colors.error))
                .setFooter({
                  text: footer,
                })
                .setDescription(
                  `
Урожай еще не созрел. Вернитесь позже. Урожай можно собирать раз в 4 часа. До сбора осталось: \`${getTimeLeft(
                    hoursToGet
                  )}\`
                `
                )
                .setImage(
                  'https://media.tenor.com/XISdXhhFDhwAAAAC/line-border.gif'
                ),
            ],
          })
          .catch((err) => console.log(err));
      }

      // Если это был сбор урожая.
      let obj = {
        name: ' ',
        price: 0,
      };
      switch (selected) {
        case 'wheat':
          obj.name = 'Пшеницу';
          obj.price = 25;
          obj.level = 0;
          break;
        case 'hops':
          obj.name = 'Хмель';
          obj.price = 50;
          obj.level = 3;
          break;
        case 'grapes':
          obj.name = 'Виноград';
          obj.price = 75;
          obj.level = 5;
          break;
        default:
          break;
      }

      // Проверка уровня работы.
      if (obj.level > userDb.work.farmer.levels.level) {
        return await interaction
          .reply({
            ephemeral: true,
            embeds: [
              new EmbedBuilder()
                .setTitle('Работа на ферме')
                .setColor(Number(colors.error))
                .setFooter({
                  text: footer,
                })
                .setDescription(
                  `
Ваш уровень работы не подходит для сбора этого урожая. Требуется **${
                    obj.level
                  } уровень.**\nУ вас **${userDb.work.farmer.levels.level} (${
                    userDb.work.farmer.levels.exp
                  } / ${userDb.work.farmer.levels.level * 10}) уровень.**
                `
                )
                .setImage(
                  'https://media.tenor.com/XISdXhhFDhwAAAAC/line-border.gif'
                ),
            ],
          })
          .catch((err) => console.log(err));
      }

      // Запускаем процесс работы.
      await userDb.workRun({ value: selected });

      await userDb.giveEris({ num: obj.price });
      await userDb.workUp();
      const lastText = `Собрав ${obj.name} вы заработали ${obj.price} эрис.`;

      // Выводим ответ.
      await interaction
        .reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setTitle('Работа на ферме')
              .setColor(Number(colors.success))
              .setFooter({
                text: footer,
              })
              .setDescription(
                `
Вы собрали урожай. ${lastText}
            `
              )
              .setImage(
                'https://media.tenor.com/XISdXhhFDhwAAAAC/line-border.gif'
              ),
          ],
        })
        .catch((err) => console.log(err));
    }

    // Проверяем была ли это работа пивовара.
    else if (interaction.customId === 'work-brewer-message') {
      // Создаем футер.
      const footer = `Пивовар. Уровень ${userDb.work.brewer.levels.level} [${
        userDb.work.brewer.levels.exp
      }/${userDb.work.brewer.levels.level * 10}]`;

      // Проверка на работу.
      if (userDb.work.currently != 'Пивовар') {
        return await interaction
          .reply({
            ephemeral: true,
            embeds: [
              new EmbedBuilder()
                .setTitle('Работа на пивоварне')
                .setColor(Number(colors.error))
                .setFooter({
                  text: footer,
                })
                .setDescription(`Вы не устроены на работу пивовара`)
                .setImage(
                  'https://media.tenor.com/XISdXhhFDhwAAAAC/line-border.gif'
                ),
            ],
          })
          .catch((err) => console.log(err));
      }

      // Записываем сколько времени осталось до сбора урожая.
      const hoursToGet = addHours(
        userDb.work.brewer.products[selected].date,
        4
      );

      // Если урожай еще не готов.
      if (!isPast(hoursToGet)) {
        return await interaction
          .reply({
            ephemeral: true,
            embeds: [
              new EmbedBuilder()
                .setTitle('Работа на пивоварне')
                .setColor(Number(colors.error))
                .setFooter({
                  text: footer,
                })
                .setDescription(
                  `
Сусло еще не готово. Вернитесь позже. Варить напитки раз в 4 часа. До сбора осталось: \`${getTimeLeft(
                    hoursToGet
                  )}\`
                `
                )
                .setImage(
                  'https://media.tenor.com/XISdXhhFDhwAAAAC/line-border.gif'
                ),
            ],
          })
          .catch((err) => console.log(err));
      }

      // Если это был сбор урожая.
      let obj = {
        name: ' ',
        price: 0,
      };
      switch (selected) {
        case 'lemonade':
          obj.name = 'Лимонад';
          obj.price = 30;
          obj.level = 0;
          break;
        case 'whiteBeer':
          obj.name = 'Светлое пиво';
          obj.price = 60;
          obj.level = 3;
          break;
        case 'darkBeer':
          obj.name = 'Темное пиво';
          obj.price = 80;
          obj.level = 5;
          break;
        default:
          break;
      }

      // Проверка уровня работы.
      if (obj.level > userDb.work.brewer.levels.level) {
        return await interaction
          .reply({
            ephemeral: true,
            embeds: [
              new EmbedBuilder()
                .setTitle('Работа на пивоварне')
                .setColor(Number(colors.error))
                .setFooter({
                  text: footer,
                })
                .setDescription(
                  `
Ваш уровень работы не подходит для варки этого напитка. Требуется **${
                    obj.level
                  } уровень.**\nУ вас **${userDb.work.brewer.levels.level} (${
                    userDb.work.brewer.levels.exp
                  } / ${userDb.work.brewer.levels.level * 10}) уровень.**
                `
                )
                .setImage(
                  'https://media.tenor.com/XISdXhhFDhwAAAAC/line-border.gif'
                ),
            ],
          })
          .catch((err) => console.log(err));
      }

      // Запускаем процесс работы.
      await userDb.workRun({ value: selected });

      await userDb.giveEris({ num: obj.price });
      await userDb.workUp();
      const lastText = `Приготовив ${obj.name} вы заработали ${obj.price} эрис.`;

      // Выводим ответ.
      await interaction
        .reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setTitle('Работа на пивоварне')
              .setColor(Number(colors.success))
              .setFooter({
                text: footer,
              })
              .setDescription(
                `
Вы сварили напиток. ${lastText}
            `
              )
              .setImage(
                'https://media.tenor.com/XISdXhhFDhwAAAAC/line-border.gif'
              ),
          ],
        })
        .catch((err) => console.log(err));
    }
  },
};
