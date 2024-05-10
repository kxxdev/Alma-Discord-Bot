import User from '../../../Models/Users/User.js';

const command = async (interaction) => {
  const { channel, member, guild, client } = interaction;

  // Выводим сообщение с вычислением пинга.
  await interaction.reply('Вычисляю задержку..');

  // Сообщение с итогом.
  channel
    .send('Загрузка..')
    .then((resultMessage) => {
      // Вычисляем время между запросом и отправкой сообщения.
      const ping =
        resultMessage.createdTimestamp - interaction.createdTimestamp;

      // Редактируем сообщение на результат пинга.
      resultMessage
        .edit({
          content: `Тугодумие ${client.user.username}: ${ping}ms, Связь с дискордом: ${client.ws.ping}ms`,
        })
        .catch((err) => console.log(err));

      // Выводим пинг в консоль.
      console.log(
        `Тугодумие ${client.user.username} ${ping}ms, Связь с дискордом: ${client.ws.ping}ms`
      );
    })
    .catch((err) => console.log(err));

  // Получаем текущую дату.
  const datenow = new Date();

  // Отправляем запрос в БД.
  const users = await User.get({ id: member.id, guildId: guild.id });

  // Получаем дату после загрузки БД.
  const resultDate = new Date();

  // Выводим информацию о задержке БД.
  channel
    .send(`Задержка связи с Селестией: ${resultDate - datenow}ms`)
    .catch((err) => console.log(err));

  // Выводим в консоль информацию о задержке БД.
  console.log(`Задержка связи с Селестией: ${resultDate - datenow}ms`);
};

export default command;
