import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import func from './_giveGun.js';
import { CommandChannelDM, CommandError } from '../../CommandsError.js';

export default {
  data: new SlashCommandBuilder()
    .setName('give-gun')
    .setNameLocalizations({
      ru: 'выдать-оружие',
    })
    .setDescription('Выдать оружие пользователю')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName('пользователь')
        .setDescription('Кому выдаем оружие.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('id')
        .setDescription('ID оружия для выдачи.')
        .setRequired(true)
    ),
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
