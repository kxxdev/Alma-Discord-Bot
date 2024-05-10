import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../CommandsFunctions/commandsError.js';
import func from './commandsFunctions/_rules.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Вывод сообщения с правилами.')
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
