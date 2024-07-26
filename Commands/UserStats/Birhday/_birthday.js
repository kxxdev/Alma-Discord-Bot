import { EmbedBuilder } from 'discord.js';

import Guild from '../../../Models/Guilds/Guild.js';
import User from '../../../Models/Users/User.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
import { CommandCustomError } from '../../CommandsError.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { guild, member, options } = interaction;

  // Загружаем экземпляр гильдии.
  const guildDb = await new Guild().get({ id: guild.id });

  // Загружаем экземпляр пользователя.
  const userDb = await User.get({ id: member.id, guildId: guild.id });

  if (userDb.birthday?.day || userDb.birthday?.month) {
    return CommandCustomError(
      interaction,
      `У вас уже указан день рождения. Для смены обратитесь в <#${guildDb.channels.feedback.id}>`
    );
  }

  // Загружаем данные из переменных.
  const day = options.getNumber('день');
  const month = options.getNumber('месяц');

  // Проверяем значения.
  if (day > 31 || day < 1 || month < 1 || month > 12) {
    return CommandCustomError(interaction, `Неверно указана дата рождения.`);
  }

  // Устанавливаем дату рождения.
  await userDb.setBirthday({ day, month });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setTitle('Дата рождения установлена!')
    .setDescription(
      `Теперь ваша дата рождения будет указываться в вашем профиле. Для смены напишите в <#${guildDb.channels.feedback.id}>.`
    )
    .setColor(DesignConfig.colors.success)
    .setImage(DesignConfig.footer.greyLineURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
