import { EmbedBuilder } from 'discord.js';

import User from '../../../Models/Users/User.js';
import colors from '../../../Config/colors.json' assert { type: 'json' };

const command = async (interaction) => {
  const { guild, member } = interaction;
  // Загружаем экземпляр пользователя.
  const userDb = await User.get({ id: member.id, guildId: guild.id });

  // Загружаем данные из переменных.
  const signature = options.getString('текст');

  // Проверяем длинну подписи.
  if (signature.length > 130) {
    return interaction.reply({
      content: 'Длина подписи не может превышать 130 символов.',
      ephemeral: true,
    });
  }

  // Устанавливаем подпись.
  await userDb.setSignature({ signature });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setTitle('Подпись установлена!')
    .setDescription(
      `Теперь ваша подпись будет указываться в вашем профиле. Для смены напишите команду еще раз.`
    )
    .setColor(Number(colors.success))
    .setThumbnail(member.displayAvatarURL())
    .setImage(colors.footerURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
