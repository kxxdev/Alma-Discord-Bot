import { EmbedBuilder } from 'discord.js';

import Guild from '../../../Models/Guilds/Guild.js';
import User from '../../../Models/Users/User.js';

const happyBirthday = async (client) => {
  setInterval(async () => {
    // Получаем сегодняшную дату.
    const dateNow = new Date();
    // Получаем сегодняшний месяц.
    const monthNow = dateNow.getMonth() + 1;
    // Получаем сегодняшнее число.
    const dayNow = dateNow.getDate();

    // Загружаем все гильдии.
    const guilds = await client.guilds.cache;

    guilds.forEach(async (guild) => {
      // Загружаем класс гильдии.
      const guildDb = await new Guild().get({ id: guild.id });

      // Получаем всех пользователей.
      const users = await User.getAll({ guildId: guild.id });

      // Проходимся по пользователям.
      users.forEach(async (user) => {
        // Получаем класс пользователя.
        const userDb = await User.get({ id: user.id, guildId: guild.id });

        // Проверяем день рождения.
        if (
          userDb.birthday?.day != dayNow ||
          userDb.birthday?.month != monthNow
        )
          return;

        // Проверяем была ли отправка сегодня.
        if (
          userDb.birthday.sendDate.getFullYear() === dateNow.getFullYear() &&
          userDb.birthday.sendDate.getDate() === dayNow &&
          userDb.birthday.sendDate.getMonth() + 1 === monthNow
        )
          return;

        // Загружаем объект мембера.
        const member = await guild.members.cache.find(
          (member) => member.id === user.id
        );

        // Проверяем найден ли пользователь.
        if (!member) return;

        // Получаем канал для поздравлений.
        const channel = await guild.channels.cache.find(
          (channel) => channel.id === guildDb.channels.happyBirthday.id
        );

        // Проверяем канал.
        if (!channel) return;

        // Создаем эмбед.
        const embed = new EmbedBuilder()
          .setColor(0x2f3136)
          .setTitle('Сегодня день рождения!')
          .setImage(
            'http://mobimg.b-cdn.net/v3/fetch/9a/9ac6f45f8b2a1ba4cb604f010cd2b566.jpeg'
          )
          .setThumbnail(member.displayAvatarURL())
          .setDescription(
            `У <@${member.id}> сегодня день рождения! Поздравляем!`
          );

        // Отправляем эмбед.
        await channel
          .send({ embeds: [embed], content: `<@${member.id}>` })
          .then((message) => {
            // Ставим реакцию.
            message.react('🎁').catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

        // Устанавливаем дату оповещения.
        await userDb.setBirthdaySendDate();
      });
    });
  }, 1000 * 60 * 60);
};

export default happyBirthday;
