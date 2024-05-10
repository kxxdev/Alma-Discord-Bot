import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../../CommandsFunctions/commandsError.js';
import func from './_removeLevelRole.js';

export default {
  data: new SlashCommandBuilder()
    .setName('removelevelrole')
    .setDescription('Удалить уровневую роль.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addNumberOption((option) =>
      option
        .setName('уровень')
        .setDescription('Уровень, на котором выдаётся эта роль.')
        .setRequired(false)
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
