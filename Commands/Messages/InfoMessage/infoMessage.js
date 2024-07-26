import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import func from './_infoMessage.js';
import { CommandChannelDM, CommandError } from '../../CommandsError.js';

export default {
  data: new SlashCommandBuilder()
    .setName('info-message')
    .setNameLocalizations({
      ru: 'сообщение-информации',
    })
    .setDescription('Создание сообщения с информацией.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
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
