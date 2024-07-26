import { EmbedBuilder } from 'discord.js';

import Guild from '../../../Models/Guilds/Guild.js';
import User from '../../../Models/Users/User.js';

import { CommandCustomError } from '../../CommandsError.js';
import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { guild, member, options } = interaction;

  // Загружаем данные из переменных.
  const user = options.getUser('пользователь');
  const num = Math.floor(options.getNumber('количество'));

  if (user.id === member.id) {
    return CommandCustomError(
      interaction,
      `Вы не можете передавать эрис ${DesignConfig.guildEmojis.eris} самому себе.`
    );
  }

  // Загружаем БД автора команды.
  const userDb = await User.get({ id: member.id, guildId: guild.id });

  // Загружаем БД гильдии.
  const guildDb = await new Guild().get({ id: guild.id });

  // Проверка на мультиакк.
  if (userDb.notice.twink.status) {
    return CommandCustomError(
      interaction,
      `Ваш аккаунт подозревается в мультиаккаунтинге.\n\nНапишите администрации для решения проблемы в <#${guildDb.channels.feedback.id}>`
    );
  }

  // Проверяем значения.
  if (num < 1 || num > userDb.money.eris.value) {
    return CommandCustomError(
      interaction,
      `Неверно указано количество.\nВозможно у вас не хватает эрис ${DesignConfig.guildEmojis.eris}`
    );
  }

  // Загружаем БД таргет мембера.
  const targetDb = await User.get({ id: user.id, guildId: guild.id });

  // Устанавливаем значения в БД.
  await userDb.subEris({ num });
  await targetDb.giveEris({ num });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(
      `<@${member.id}> передал(а) \`${num}\` ${DesignConfig.guildEmojis.eris} <@${user.id}>.`
    )
    .setColor(DesignConfig.colors.success)
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: false })
    .catch((err) => console.log(err));
};

export default command;
