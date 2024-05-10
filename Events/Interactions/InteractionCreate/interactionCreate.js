import User from '../../../Models/Users/User.js';

import quests from '../../../Quests/quests.js';
import inventoryStore from './_inventoryStore.js';
import infoMessage from './_infoMessage.js';
import shopMessage from './_shopMessage.js';
import workMessage from './_workMessage.js';
import sendCommand from './_sendCommand.js';

const event = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    const { user } = interaction;

    // Загружаем пользователя из БД.
    const userDb = await User.get({
      id: user.id,
      guildId: client.tokens.GUILD_ID,
    });

    if (!userDb) {
      return interaction
        .reply(
          'Ой-ой, что-то мне не удалось связаться с высшими силами. Попробуйте позже..'
        )
        .catch((err) => console.error('Ошибка ответа: ', err));
    }

    // Сброс временного голосового ограничения
    await userDb.nullTempVoiceStates();

    // Если это слеш команда.
    if (interaction.isChatInputCommand()) {
      await sendCommand(interaction, client);
    }

    if (!interaction?.customId) return;

    // Получаем разделители команды.
    const interactionValues = interaction.customId?.split('-');

    try {
      // Если это интеракция квеста.
      if (interactionValues[0] === 'quest') {
        quests(interaction, interactionValues);
      }

      // Если это интеракция инвентаря магазина.
      else if (
        interactionValues[0] === 'storeInventory' &&
        user.id === interactionValues[1]
      ) {
        inventoryStore(interaction);
      }

      // Если это интеракция инфо-сообщения.
      else if (
        interaction.customId === 'info-message' ||
        interaction.customId === 'age-message' ||
        interaction.customId === 'gender-message'
      ) {
        await infoMessage(interaction);
      }

      // Если это интеракция магазина.
      else if (
        interaction.customId === 'shop-message' ||
        interaction.customId === 'profile-cards-message-backgrounds' ||
        interaction.customId === 'profile-cards-message-frames' ||
        interaction.customId === 'profile-cards-message-shadows'
      ) {
        await shopMessage(interaction);
      }

      // Если это сообщения с работой.
      else if (
        interaction.customId === 'work-farmer-message' ||
        interaction.customId === 'work-join-message' ||
        interaction.customId === 'work-brewer-message'
      ) {
        await workMessage(interaction);
      }
    } catch (err) {
      console.log(err);
    }
  },
};

export default event;
