import { EmbedBuilder } from 'discord.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
import { CommandCustomError } from '../../CommandsError.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { options, member } = interaction;

  const user = options.getUser('пользователь');
  const reason = options.getString('причина') || 'Причина не указана.';

  const targetMember = await interaction.guild.members.fetch(user.id);

  if (targetMember.roles.highest.position >= member.roles.highest.position) {
    return CommandCustomError(
      interaction,
      `Вы не можете выгнать <@${user.id}> так как у него есть высшая роль.`
    );
  }

  await member.kick(reason);

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(
      `<@${user.id}> выгнан(а) с таверны.
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
