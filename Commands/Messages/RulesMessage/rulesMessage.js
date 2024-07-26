import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import func from './_rulesMessage.js';
import { CommandChannelDM, CommandError } from '../../CommandsError.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rules-message')
    .setNameLocalizations({
      ru: 'сообщение-правил',
    })
    .setDescription('Вывод сообщения с правилами.')
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
