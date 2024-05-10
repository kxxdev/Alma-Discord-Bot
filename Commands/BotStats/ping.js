import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../CommandsFunctions/commandsError.js';
import func from './commandsFunctions/_ping.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Просмотр моего тугодумия.')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
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
