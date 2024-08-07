import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import func from './_configRoles.js';
import { CommandChannelDM, CommandError } from '../../CommandsError.js';

export default {
  data: new SlashCommandBuilder()
    .setName('config-roles')
    .setNameLocalizations({
      ru: 'конфигурация-ролей',
    })
    .setDescription('Конфигурация ролей сервера.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addRoleOption((option) =>
      option
        .setName('журналист')
        .setDescription('Роль журналиста.')
        .setRequired(false)
    )
    .addRoleOption((option) =>
      option
        .setName('человек')
        .setDescription('Роль человека.')
        .setRequired(false)
    )
    .addRoleOption((option) =>
      option.setName('нежить').setDescription('Роль нежить.').setRequired(false)
    )
    .addRoleOption((option) =>
      option
        .setName('лесной_эльф')
        .setDescription('Роль лесного эльфа.')
        .setRequired(false)
    )
    .addRoleOption((option) =>
      option
        .setName('темный_эльф')
        .setDescription('Роль темного эльфа.')
        .setRequired(false)
    )
    .addRoleOption((option) =>
      option.setName('орк').setDescription('Роль орка.').setRequired(false)
    )
    .addRoleOption((option) =>
      option.setName('гном').setDescription('Роль гнома.').setRequired(false)
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
