import { EmbedBuilder } from 'discord.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
import { CommandCustomError } from '../../CommandsError.js';
const DesignConfig = GetDesignConfig();

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
      .setColor(DesignConfig.colors.success)
      .setImage(DesignConfig.footer.greyLineURL);

    // Возвращаем ответ.
    await interaction
      .reply({ embeds: [embed], ephemeral: true })
      .catch((err) => console.log(err));
  } catch (err) {
    CommandCustomError(
      interaction,
      `Пользователь с таким ID не заблокирован  ${DesignConfig.emojis.denie}`
    );
  }
};

export default command;
