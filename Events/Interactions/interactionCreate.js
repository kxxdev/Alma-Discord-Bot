import User from '../../Models/Users/User.js';

import quests from '../../Quests/quests.js';
import shopinventory from '../eventsFunctions/userStats/shopinventoryMessage.js';

const event = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    const { user } = interaction;

    // Загружаем пользователя из БД.
    const userDb = await User.get({
      id: user.id,
      guildId: client.tokens.GUILD_ID,
    });

    // Сброс временного голосового ограничения
    await userDb.nullTempVoiceStates();

    // Если это слеш команда.
    if (interaction.isChatInputCommand()) {
      // Получаем команду из клиента.
      const command = client.commands.get(interaction.commandName)?.default;

      // Если команда не найдена выводим ошибку.
      if (!command) {
        return interaction.reply({
          content:
            'Ой-ой, что-то я совсем забыла такую команду... Попробуй позже, может я вспомню..',
        });
      }

      // Запускаем команду с обработкой ошибок.
      try {
        command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          interaction.followUp({
            content:
              'Ой-ой, что-то я не могу выполнить эту команду.. Попробуй позже..',
            ephemeral: true,
          });
        } else {
          interaction.reply({
            content:
              'Ой-ой, что-то я не могу выполнить эту команду.. Попробуй позже..',
            ephemeral: true,
          });
        }
      }
    }

    if (!interaction?.customId) return;

    // Получаем разделители команды.
    const interactionValues = interaction.customId?.split('-');

    try {
      if (interactionValues[0] === 'quest') {
        quests(interaction, interactionValues);
      } else if (
        interactionValues[0] === 'shopinventory' &&
        user.id === interactionValues[1]
      ) {
        shopinventory(interaction);
      }
    } catch (err) {
      console.log(err);
    }
  },
};

export default event;
