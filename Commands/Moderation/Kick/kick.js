import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import func from './_kick.js';
import { CommandChannelDM, CommandError } from '../../CommandsError.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setNameLocalizations({
      ru: 'кикнуть',
    })
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
