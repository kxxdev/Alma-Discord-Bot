import { EmbedBuilder } from 'discord.js';
import ms from 'ms';

import { GetDesignConfig } from '../../../Config/design-config.js';
import { CommandCustomError } from '../../CommandsError.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { guild, options, member } = interaction;

  const targetUser = options.getUser('пользователь');
  const targetMember = guild.members.cache.get(targetUser.id);
  const time = options.getString('время');
  const convertedTime = ms(time);
  const reason = options.getString('причина') || 'Причина не указана.';

  if (targetMember.roles.highest.position >= member.roles.highest.position) {
    return CommandCustomError(
      interaction,
      `Вы не можете заглушить <@${targetUser.id}> так как у него есть высшая роль.`
    );
  }

  if (!convertedTime) {
    return CommandCustomError(
      interaction,
      `Неверно указано время мута. Соблюдайте формат: "1h 30m 10s", "6h", "30m" и тп.`
    );
  }

  await targetMember.timeout(convertedTime, reason);

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(
      `<@${targetMember.id}> поставлен(а) в угол таверны на \`${time}\`.
      Причина: *${reason}*
      Тавернщик: <@${member.id}>`
    )
    .setColor(DesignConfig.colors.success)
    .setImage(DesignConfig.footer.greyLineURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
