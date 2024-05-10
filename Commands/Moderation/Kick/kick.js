import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../../CommandsFunctions/commandsError.js';
import func from './_kick.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Выгнать пользователя с таверны.')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option
        .setName('пользователь')
        .setDescription('Пользователь которого изгоняем.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('причина')
        .setDescription('Причина изгнания пользователя')
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
