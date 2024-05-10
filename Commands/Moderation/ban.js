import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../CommandsFunctions/commandsError.js';
import func from './commandsFunctions/_ban.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Заблокировать пользователя в таверне.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option
        .setName('пользователь')
        .setDescription('Пользователь которого блокируем.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('причина')
        .setDescription('Причина блокировки пользователя')
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
