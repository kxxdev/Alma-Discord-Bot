import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../commandsError.js';
import func from './_birthday.js';

export default {
  data: new SlashCommandBuilder()
    .setName('birthday')
    .setDescription('Указать день рождения.')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .addNumberOption((option) =>
      option
        .setName('день')
        .setDescription('День месяца вашего рождения. Без 0 в начале.')
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName('месяц')
        .setDescription('Месяц вашего рождения. Без 0 в начале.')
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
