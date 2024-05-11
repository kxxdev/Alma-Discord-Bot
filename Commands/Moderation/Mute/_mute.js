import { EmbedBuilder } from 'discord.js';
import ms from 'ms';

const command = async (interaction) => {
  // Получаем конфигурацию дизайна.
  const designConfig = interaction.client.designConfig;

  const { guild, options, member } = interaction;

  const targetUser = options.getUser('пользователь');
  const targetMember = guild.members.cache.get(targetUser.id);
  const time = options.getString('время');
  const convertedTime = ms(time);
  const reason = options.getString('причина') || 'Причина не указана.';

  const errEmbed = new EmbedBuilder()
    .setColor(Number(designConfig.error))
    .setImage(designConfig.footerURL);

  if (targetMember.roles.highest.position >= member.roles.highest.position) {
    errEmbed.setDescription(
      `Вы не можете заглушить <@${targetUser.id}> так как у него есть высшая роль.`
    );
    return interaction.reply({ embeds: [errEmbed], ephemeral: true });
  }

  if (!convertedTime) {
    errEmbed.setDescription(
      `Неверно указано время мута. Соблюдайте формат: "1h 30m 10s", "6h", "30m" и тп.`
    );
    return interaction.reply({ embeds: [errEmbed], ephemeral: true });
  }

  await targetMember.timeout(convertedTime, reason);

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(
      `<@${targetMember.id}> поставлен(а) в угол таверны на \`${time}\`.
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
