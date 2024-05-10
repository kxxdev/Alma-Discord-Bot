import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../../CommandsFunctions/commandsError.js';
import func from './_workMessage.js';

export default {
  data: new SlashCommandBuilder()
    .setName('work-message')
    .setDescription('Создать сообщение с работами.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName('работа')
        .setDescription('Для какой работы создается сообщение')
        .setRequired(true)
        .addChoices(
          { name: 'Фермер', value: 'Фермер' },
          { name: 'Пивовар', value: 'Пивовар' }
        )
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
