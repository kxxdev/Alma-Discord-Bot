import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../commandsError.js';
import func from './_storeInventory.js';

export default {
  data: new SlashCommandBuilder()
    .setName('store-inventory')
    .setNameLocalizations({
      ru: 'инвентарь-магазина',
    })
    .setDescription('Посмотреть свой инвентарь магазина')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
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
