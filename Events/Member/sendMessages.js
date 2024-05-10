import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

import Guild from '../../Models/Guilds/Guild.js';

export default {
  name: 'ready',
  async execute(client) {
    setInterval(async () => {
      // Получаем все гильдии.
      const guilds = await client.guilds.cache;

      // Проходимся по гильдиям.
      guilds.forEach(async (guild) => {
        // Получаем БД гильдии.
        const guildDb = await new Guild().get({ id: guild.id });

        // Проходимся по сообщениям гильдии.
        guildDb.messages.forEach(async (message) => {
          // Выводим информацию в логи.
          console.log(`Отправляю сообщение по таймеру из гильдии ${guild.id}`);

          // Получаем канал для отправки сообщения.
          const channelSend = await guild.channels.cache.find(
            (channel) => channel.id === message.channelSendId
          );

          // Проверяем найден ли канал.
          if (!channelSend)
            return console.log(
              `Не найден канал для отправки. ID: ${message.channelSendId}`
            );

          // Создаем компоненты.
          const components = [];

          // Если есть кнопки добавляем их.
          if (message.urlCheck) {
            components.push(
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setLabel(message.link.name)
                  .setURL(message.link.url)
                  .setStyle(ButtonStyle.Link)
              )
            );
          }

          // Создаем эмбед.
          const embed = new EmbedBuilder().setColor(message.embed.color);

          if (message.embed.title) {
            embed.setTitle(message.embed.title);
          }

          if (message.embed.image?.url) {
            embed.setImage(message.embed.image);
          }

          if (message.embed.description) {
            embed.setDescription(message.embed.description);
          }

          // Отправляем сообщение.
          if (message.messageContent) {
            await channelSend
              .send({
                content: `${message.messageContent}`,
                embeds: [embed],
                components,
              })
              .catch((err) => console.log(err));
          } else {
            await channelSend
              .send({ embeds: [embed], components })
              .catch((err) => console.log(err));
          }

          await guildDb.deleteMessage({ id: message.id });
        });
      });
    }, 1000 * 60);
  },
};
