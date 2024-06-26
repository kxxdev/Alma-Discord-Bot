import { EmbedBuilder } from 'discord.js';

import Guild from '../../../Models/Guilds/Guild.js';
import User from '../../../Models/Users/User.js';

const command = async (interaction) => {
  // Получаем конфигурацию дизайна.
  const designConfig = interaction.client.designConfig;

  const { guild, member, options } = interaction;

  // Загружаем данные из переменных.
  const user = options.getUser('пользователь');
  const num = Math.floor(options.getNumber('количество'));

  if (user.id === member.id) {
    return await interaction
      .reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Вы не можете передавать эрис самому себе`)
            .setColor(Number(designConfig.error))
            .setImage(designConfig.footerURL),
        ],
        ephemeral: true,
      })
      .catch((err) => console.log(err));
  }

  // Загружаем БД автора команды.
  const userDb = await User.get({ id: member.id, guildId: guild.id });

  // Загружаем БД гильдии.
  const guildDb = await new Guild().get({ id: guild.id });

  // Проверка на мультиакк.
  if (userDb.notice.twink.status) {
    return await interaction
      .reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `Ваш аккаунт подозревается в мультиаккаунтинге. Напишите администрации для решения проблемы в <#${guildDb.channels.feedback.id}>`
            )
            .setColor(Number(designConfig.error))
            .setImage(designConfig.footerURL),
        ],
        ephemeral: true,
      })
      .catch((err) => console.log(err));
  }

  // Проверяем значения.
  if (num < 1 || num > userDb.money.eris.value) {
    return await interaction
      .reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Неверно указано количество.`)
            .setColor(Number(designConfig.error))
            .setImage(designConfig.footerURL),
        ],
        ephemeral: true,
      })
      .catch((err) => console.log(err));
  }

  // Загружаем БД таргет мембера.
  const targetDb = await User.get({ id: user.id, guildId: guild.id });

  // Устанавливаем значения в БД.
  await userDb.subEris({ num });
  await targetDb.giveEris({ num });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(
      `<@${member.id}> передал(а) \`${num}\` <:eris:1169666720852615228>  <@${user.id}>.`
    )
    .setColor(Number(designConfig.success))
    .setImage(designConfig.footerURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: false })
    .catch((err) => console.log(err));
};

export default command;
