import { EmbedBuilder } from 'discord.js';

import Guild from '../../../Models/Guilds/Guild.js';
import User from '../../../Models/Users/User.js';
import colors from '../../../Config/colors.json' assert { type: 'json' };

const command = async (interaction) => {
  const { guild, member, options } = interaction;

  // Загружаем экземпляр гильдии.
  const guildDb = await new Guild().get({ id: guild.id });

  // Загружаем экземпляр пользователя.
  const userDb = await new User().get({ id: member.id, guildId: guild.id });

  if (userDb.birthday?.day || userDb.birthday?.month) {
    const embed = new EmbedBuilder()
      .setDescription(
        `У вас уже указан день рождения. Для смены обратитесь в <#${guildDb.channels.feedback.id}>`
      )
      .setColor(Number(colors.error))
      .setImage(colors.footerURL);

    // Возвращаем ответ.
    return await interaction
      .reply({ embeds: [embed], ephemeral: true })
      .catch((err) => console.log(err));
  }

  // Загружаем данные из переменных.
  const day = options.getNumber('день');
  const month = options.getNumber('месяц');

  // Проверяем значения.
  if (day > 31 || day < 1 || month < 1 || month > 12) {
    const embed = new EmbedBuilder()
      .setDescription(`Неверно указана дата рождения.`)
      .setColor(Number(colors.error))
      .setImage(colors.footerURL);

    // Возвращаем ответ.
    return await interaction
      .reply({ embeds: [embed], ephemeral: true })
      .catch((err) => console.log(err));
  }

  // Устанавливаем дату рождения.
  await userDb.setBirthday({ day, month });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setTitle('Дата рождения установлена!')
    .setDescription(
      `Теперь ваша дата рождения будет указываться в вашем профиле. Для смены напишите в <#${guildDb.channels.feedback.id}>.`
    )
    .setColor(Number(colors.default))
    .setImage(colors.footerURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
