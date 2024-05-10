import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../commandsError.js';
import func from './_pay.js';

export default {
  data: new SlashCommandBuilder()
    .setName('pay')
    .setNameLocalizations({
      ru: 'передать-эрис',
    })
    .setDescription('Передать эрис пользователю.')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .addUserOption((option) =>
      option
        .setName('пользователь')
        .setDescription('Кому передаем мору.')
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName('количество')
        .setDescription('Сколько моры передаем.')
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
