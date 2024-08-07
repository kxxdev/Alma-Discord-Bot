import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import func from './_addLevelRole.js';
import { CommandChannelDM, CommandError } from '../../CommandsError.js';

export default {
  data: new SlashCommandBuilder()
    .setName('add-level-role')
    .setNameLocalizations({
      ru: 'добавить-роль-уровня',
    })
    .setDescription('Добавить уровневую роль.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addRoleOption((option) =>
      option.setName('роль').setDescription('Роль уровня.').setRequired(false)
    )
    .addNumberOption((option) =>
      option.setName('уровень').setDescription('Уровень.').setRequired(false)
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
