import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import { CommandChannelDM, CommandError } from '../../CommandsError.js';
import func from './_questStart.js';

export default {
  data: new SlashCommandBuilder()
    .setName('start')
    .setNameLocalizations({
      ru: 'старт',
    })
    .setDescription('Восстановить или запустить квест.')
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
