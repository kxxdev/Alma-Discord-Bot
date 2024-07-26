import { EmbedBuilder } from 'discord.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
import { CommandCustomError } from '../../CommandsError.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { options, member, guild } = interaction;

  const targetUser = options.getUser('пользователь');
  const targetMember = guild.members.cache.get(targetUser.id);
  const reason = options.getString('причина') || 'Причина не указана.';

  const errEmbed = new EmbedBuilder().setColor(0xc723b);

  if (targetMember.roles.highest.position >= member.roles.highest.position) {
    return CommandCustomError(
      interaction,
      `Вы не можете снять заглушку с <@${targetUser.id}> так как у него есть высшая роль.`
    );
  }

  try {
    await targetMember.timeout(null);

    // Создаем эмбед.
    const embed = new EmbedBuilder()
      .setDescription(
        `<@${userId}> выходит из угла.\nПричина: *${reason}*\nТавернщик: <@${member.id}>`
      )
      .setColor(DesignConfig.colors.success)
      .setImage(DesignConfig.footer.greyLineURL);

    // Возвращаем ответ.
    await interaction
      .reply({ embeds: [embed], ephemeral: true })
      .catch((err) => console.log(err));
  } catch (err) {
    CommandCustomError(
      interaction,
      `Не удалось снять заглушку с пользователя ${DesignConfig.emojis.denie}`
    );
  }
};

export default command;
