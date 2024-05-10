import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../CommandsFunctions/commandsError.js';
import func from './commandsFunctions/_creatework.js';

export default {
  data: new SlashCommandBuilder()
    .setName('creatework')
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
