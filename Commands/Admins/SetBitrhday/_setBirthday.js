import { EmbedBuilder } from 'discord.js';

import User from '../../../Models/Users/User.js';

const command = async (interaction) => {
  // Получаем конфигурацию дизайна.
  const designConfig = interaction.client.designConfig;

  const { guild } = interaction;

  // Загружаем данные из переменных.
  const user = options.getUser('пользователь');
  const day = options.getUser('день');
  const month = options.getUser('месяц');

  // Проверяем значения.
  if (day > 31 || day < 0 || month < 0 || month > 12) {
    // Создаем эмбед.
    const embed = new EmbedBuilder()
      .setDescription(`Неверно указана дата рождения`)
      .setColor(Number(designConfig.error))
      .setImage(designConfig.footerURL);

    // Возвращаем ответ.
    return await interaction
      .reply({ embeds: [embed], ephemeral: true })
      .catch((err) => console.log(err));
  }

  // Загружаем экземпляр пользователя.
  const userDb = await User.get({ id: user.id, guildId: guild.id });

  // Устанавливаем дату рождения.
  await userDb.setBirthday({ day, month });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setTitle('Дата рождения обновлена!')
    .setDescription(
      `Пользователю установлена новая дата рождения ${designConfig.successEmoji}`
    )
    .setColor(Number(designConfig.success))
    .setImage(designConfig.footerURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
