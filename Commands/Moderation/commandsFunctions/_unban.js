import { EmbedBuilder } from 'discord.js';

import colors from '../../../Config/colors.json' assert { type: 'json' };

const command = async (interaction) => {
  const { options, member, guild } = interaction;

  const userId = options.getString('id-пользователя');
  const reason = options.getString('причина') || 'Причина не указана.';

  try {
    await guild.members.unban(userId);

    // Создаем эмбед.
    const embed = new EmbedBuilder()
      .setDescription(
        `<@${userId}> вычеркнут из черного списка таверны.
  Причина: *${reason}*
  Тавернщик: <@${member.id}>`
      )
      .setColor(Number(colors.success))
      .setImage(colors.footerURL);

    // Возвращаем ответ.
    await interaction
      .reply({ embeds: [embed], ephemeral: true })
      .catch((err) => console.log(err));
  } catch (err) {
    const errEmbed = new EmbedBuilder()
      .setDescription(`Пользователь с таким ID не заблокирован.`)
      .setColor(Number(colors.error))
      .setImage(colors.footerURL);

    // Возвращаем ответ.
    await interaction.reply({
      embeds: [errEmbed],
      ephemeral: true,
    });
  }
};

export default command;
