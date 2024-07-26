import { EmbedBuilder } from 'discord.js';

import User from '../../../Models/Users/User.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
import { CommandCustomError } from '../../CommandsError.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { guild, member, options } = interaction;
  // Загружаем экземпляр пользователя.
  const userDb = await User.get({ id: member.id, guildId: guild.id });

  // Загружаем данные из переменных.
  const signature = options.getString('текст');

  // Проверяем длинну подписи.
  if (signature.length > 130) {
    return CommandCustomError(
      interaction,
      'Длина подписи не может превышать 130 символов.'
    );
  }

  // Устанавливаем подпись.
  await userDb.setSignature({ signature });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setTitle(`Подпись установлена ${DesignConfig.emojis.success}`)
    .setDescription(
      `Теперь ваша подпись будет указываться в вашем профиле. Для смены напишите команду еще раз.`
    )
    .setColor(DesignConfig.colors.success)
    .setThumbnail(member.displayAvatarURL())
    .setImage(DesignConfig.footer.greyLineURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
