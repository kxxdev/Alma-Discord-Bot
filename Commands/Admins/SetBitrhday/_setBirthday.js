import { EmbedBuilder } from 'discord.js';

import User from '../../../Models/Users/User.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
import { CommandCustomError } from '../../commandsError.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { guild, options } = interaction;

  // Загружаем данные из команды.
  const targetUser = options.getUser('пользователь');
  const day = options.getNumber('день');
  const month = options.getNumber('месяц');

  // Проверяем значения.
  if (day > 31 || day < 0 || month < 0 || month > 12) {
    return CommandCustomError(interaction, `Неверно указана дата рождения.`);
  }

  // Загружаем экземпляр пользователя.
  const targetUserDb = await User.get({ id: targetUser.id, guildId: guild.id });

  // Устанавливаем дату рождения.
  await targetUserDb.setBirthday({ day, month });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setTitle('Дата рождения обновлена!')
    .setDescription(
      `Пользователю <@${targetUser.id}> установлена новая дата рождения ${DesignConfig.emojis.success}`
    )
    .setColor(DesignConfig.colors.success)
    .setImage(DesignConfig.footer.greyLineURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
