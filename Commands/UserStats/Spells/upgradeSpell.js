import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import func from './_upgradeSpell.js';
import { CommandChannelDM, CommandError } from '../../CommandsError.js';

export default {
  data: new SlashCommandBuilder()
    .setName('upgrade-spells')
    .setNameLocalizations({
      ru: 'улучшить-заклинания',
    })
    .setDescription('Улучшить свои заклинания.')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
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
