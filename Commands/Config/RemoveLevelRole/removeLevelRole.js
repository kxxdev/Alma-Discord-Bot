import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import func from './_removeLevelRole.js';
import { CommandChannelDM, CommandError } from '../../CommandsError.js';

export default {
  data: new SlashCommandBuilder()
    .setName('remove-level-role')
    .setNameLocalizations({
      ru: 'удалить-роль-уровня',
    })
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
