import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import func from './_birthday.js';
import { CommandChannelDM, CommandError } from '../../CommandsError.js';

export default {
  data: new SlashCommandBuilder()
    .setName('birthday')
    .setNameLocalizations({
      ru: 'указать-день-рождения',
    })
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
