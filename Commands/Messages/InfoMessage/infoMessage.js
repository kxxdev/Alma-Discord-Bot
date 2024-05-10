import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../../CommandsFunctions/commandsError.js';
import func from './_infoMessage.js';

export default {
  data: new SlashCommandBuilder()
    .setName('info-message')
    .setDescription('Создание сообщения с информацией.')
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
