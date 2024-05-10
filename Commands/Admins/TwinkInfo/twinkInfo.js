import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../commandsError.js';
import func from './_twinkInfo.js';

export default {
  data: new SlashCommandBuilder()
    .setName('twink-info')
    .setNameLocalizations({
      ru: 'твинк-инфо',
    })
    .setDescription('Проверяем пользователя ни твинк.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option
        .setName('пользователь')
        .setDescription('Пользователь которого проверяем.')
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
