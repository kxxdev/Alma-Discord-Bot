import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

import commandsError from '../../commandsError.js';
import func from './_configChannels.js';

export default {
  data: new SlashCommandBuilder()
    .setName('config-channels')
    .setDescription('Конфигурация каналов сервера.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName('спам')
        .setDescription('Канал для спама.')
        .setRequired(false)
    )
    .addChannelOption((option) =>
      option
        .setName('новости')
        .setDescription('Канал с новостями.')
        .setRequired(false)
    )
    .addChannelOption((option) =>
      option
        .setName('жалобы')
        .setDescription('Канал куда приходят жалобы.')
        .setRequired(false)
    )
    .addChannelOption((option) =>
      option
        .setName('обратная-связь')
        .setDescription('Форум обратной связи.')
        .setRequired(false)
    )
    .addChannelOption((option) =>
      option
        .setName('день-рождения')
        .setDescription('Канал с уведомлением о днях рождения.')
        .setRequired(false)
    )
    .addChannelOption((option) =>
      option
        .setName('мемы')
        .setDescription('Канал с мемами.')
        .setRequired(false)
    )
    .addChannelOption((option) =>
      option
        .setName('скриншоты')
        .setDescription('Канал с скринами.')
        .setRequired(false)
    )
    .addChannelOption((option) =>
      option
        .setName('повышение-уровня')
        .setDescription('Канал с уведомлением о повышении уровня.')
        .setRequired(false)
    )
    .addChannelOption((option) =>
      option
        .setName('логи')
        .setDescription('Канал с логами сервера.')
        .setRequired(false)
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
