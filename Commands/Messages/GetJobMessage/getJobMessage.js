import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../commandsError.js';
import func from './_getJobMessage.js';

export default {
  data: new SlashCommandBuilder()
    .setName('get-job-message')
    .setNameLocalizations({
      ru: 'сообщение-трудоустройства',
    })
    .setDescription('Создать сообщение с трудоустройством.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    // Если команда была прописана в личке.
    if (interaction.channel.type === 1) {
      return await commandsError.commandChannelDM(interaction);
    }

    // Запускаем команду.
    try {
      await func(interaction);
    } catch (err) {
      console.log(err);
      commandsError.commandError(interaction);
    }
  },
};
