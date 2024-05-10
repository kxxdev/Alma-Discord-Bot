import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../commandsError.js';
import func from './_signature.js';

export default {
  data: new SlashCommandBuilder()
    .setName('signature')
    .setDescription('Указать подпись.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName('текст')
        .setDescription('Текст вашей подписи.')
        .setRequired(true)
    ),
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
