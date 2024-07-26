import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import func from './_upgrade.js';
import { CommandChannelDM, CommandError } from '../../CommandsError.js';

export default {
  data: new SlashCommandBuilder()
    .setName('upgrade')
    .setNameLocalizations({
      ru: 'прокачаться',
    })
    .setDescription('Улучшить ваши характеристики.')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  async execute(interaction) {
    // Если команда была прописана в личке.
    if (interaction.channel.type === 1) {
      return await CommandChannelDM(interaction);
    }

    // Запускаем команду.
    try {
      await func(interaction);
    } catch (err) {
      console.log(err);
      CommandError(interaction);
    }
  },
};
