import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import func from './_profile.js';
import { CommandChannelDM, CommandError } from '../../CommandsError.js';

export default {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setNameLocalizations({
      ru: 'профиль',
    })
    .setDescription('Карточка вашего профиля.')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .addUserOption((option) =>
      option
        .setName('пользователь')
        .setDescription('Чью карточку хотите посмотреть.')
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
