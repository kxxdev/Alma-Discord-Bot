import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../../CommandsFunctions/commandsError.js';
import func from './_mute.js';

export default {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Заглушить пользователя в таверне.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option
        .setName('пользователь')
        .setDescription('Укажите пользователя которого хотите заглушить.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('время')
        .setDescription('Укажите время в формате: 1h 30m')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('причина')
        .setDescription('Укажите причину мута')
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
