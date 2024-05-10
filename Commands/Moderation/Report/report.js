import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../commandsError.js';
import func from './_report.js';

export default {
  data: new SlashCommandBuilder()
    .setName('report')
    .setNameLocalizations({
      ru: 'жалоба',
    })
    .setDescription('Написать жалобу на пользователя.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName('пользователь')
        .setDescription(
          'На кого пишем жалобу. Если жалоба не на пользователя укажите себя.'
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('жалоба')
        .setDescription('Введите причину жалобы.')
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
