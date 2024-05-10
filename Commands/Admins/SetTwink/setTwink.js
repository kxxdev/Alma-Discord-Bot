import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../../CommandsFunctions/commandsError.js';
import func from './_setTwink.js';

export default {
  data: new SlashCommandBuilder()
    .setName('settwink')
    .setDescription('Установить твинк пользователя')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option
        .setName('пользователь')
        .setDescription('Пользователь которого устанавливаем твинком.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('причина')
        .setDescription(
          'Причина установки твинк пользователя (укажите чей твинк)'
        )
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
