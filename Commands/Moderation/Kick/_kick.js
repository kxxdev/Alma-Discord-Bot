import { EmbedBuilder } from 'discord.js';

const command = async (interaction) => {
  // Получаем конфигурацию дизайна.
  const designConfig = interaction.client.designConfig;

  const { channel, options, member } = interaction;

  const user = options.getUser('пользователь');
  const reason = options.getString('причина') || 'Причина не указана.';

  const targetMember = await interaction.guild.members.fetch(user.id);

  const errEmbed = new EmbedBuilder()
    .setDescription(
      `Вы не можете выгнать <@${user.id}> так как у него есть высшая роль.`
    )
    .setColor(0xc723b);

  if (targetMember.roles.highest.position >= member.roles.highest.position) {
    return interaction.reply({ embeds: [errEmbed], ephemeral: true });
  }

  await member.kick(reason);

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(
      `<@${user.id}> выгнан(а) с таверны.
      Причина: *${reason}*
      Тавернщик: <@${member.id}>`
    )
    .setColor(Number(designConfig.default))
    .setImage(designConfig.footerURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
