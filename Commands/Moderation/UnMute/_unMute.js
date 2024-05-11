import { EmbedBuilder } from 'discord.js';

const command = async (interaction) => {
  // Получаем конфигурацию дизайна.
  const designConfig = interaction.client.designConfig;

  const { options, member, guild } = interaction;

  const targetUser = options.getUser('пользователь');
  const targetMember = guild.members.cache.get(targetUser.id);
  const reason = options.getString('причина') || 'Причина не указана.';

  const errEmbed = new EmbedBuilder().setColor(0xc723b);

  if (targetMember.roles.highest.position >= member.roles.highest.position) {
    errEmbed.setDescription(
      `Вы не можете снять заглушку с <@${targetUser.id}> так как у него есть высшая роль.`
    );
    return interaction.reply({ embeds: [errEmbed], ephemeral: true });
  }

  try {
    await targetMember.timeout(null);

    // Создаем эмбед.
    const embed = new EmbedBuilder()
      .setDescription(
        `<@${userId}> выходит из угла.\nПричина: *${reason}*\nТавернщик: <@${member.id}>`
      )
      .setColor(Number(designConfig.success))
      .setImage(designConfig.footerURL);

    // Возвращаем ответ.
    await interaction
      .reply({ embeds: [embed], ephemeral: true })
      .catch((err) => console.log(err));
  } catch (err) {
    const errEmbed = new EmbedBuilder()
      .setDescription(`Не удалось снять заглушку с пользователя.`)
      .setColor(Number(designConfig.error))
      .setImage(designConfig.footerURL);

    // Возвращаем ответ.
    await interaction.reply({
      embeds: [errEmbed],
      ephemeral: true,
    });
  }
};

export default command;
