import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import func from './_setBirthday.js';
import { CommandChannelDM, CommandError } from '../../CommandsError.js';

export default {
  data: new SlashCommandBuilder()
    .setName('set-birthday')
    .setNameLocalizations({
      ru: 'установить-др',
    })
    .setDescription('Указать день рождения пользователю.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName('пользователь')
        .setDescription('Кому меняем дату рождения.')
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName('день')
        .setDescription('День месяца рождения. Без 0 в начале.')
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
