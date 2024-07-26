import User from '../../../Models/Users/User.js';

import quests from '../../../Quests/quests.js';
import inventoryStore from './_inventoryStore.js';
import infoMessage from './_infoMessage.js';
import shopMessage from './_shopMessage.js';
import workMessage from './_workMessage.js';
import sendCommand from './_sendCommand.js';
import upgradeGun from './Guns/_upgradeGun.js';
import inventoryCommand from '../../../Commands/UserStats/Inventory/_inventory.js';
import attributesCommand from '../../../Commands/UserStats/Attributes/_attributes.js';
import upgradeGunCommand from '../../../Commands/UserStats/UpgradeGun/_upgradeGun.js';
import upgradeAttributesCommand from '../../../Commands/UserStats/Upgrade/_upgrade.js';
import activeSpellsCommand from '../../../Commands/UserStats/Spells/_activeSpells.js';
import buySpellsCommand from '../../../Commands/UserStats/Spells/_buySpell.js';
import upgradeSpellCommand from '../../../Commands/UserStats/Spells/_upgradeSpell.js';
import profileCommand from '../../../Commands/UserStats/Profile/_profile.js';
import equipGun from './Guns/_equipGun.js';
import upgradeAttrubutes from './_upgrageAttributes.js';
import moreAttributesInfo from './_moreAttributesInfo.js';
import resetAttributes from './ResetAttributes/_resetAttributes.js';
import resetAttributesSucess from './ResetAttributes/_resetAttributesSuccess.js';
import resetAttributesCancel from './ResetAttributes/_resetAttributesCancel.js';
import sellGun from './Guns/_sellGun.js';
import sellGunSelect from './Guns/_sellGunSelect.js';
import sellGunSelectPriceInput from './Guns/_sellGunSelectPriceInput.js';
import removeGunFromSale from './Guns/_removeGunFromSale.js';
import buyGun from './Guns/_buyGun.js';
import selectPerkForUpgrade from './_selectPerkForUpgrade.js';
import {
  CommandError,
  CommandNotYoursError,
} from '../../../Commands/CommandsError.js';
import accessBuySpell from './Spells/_accessBuySpell.js';
import buySpellsSelect from './Spells/_buySpellsSelect.js';
import denieBuySpell from './Spells/_denieBuySpell.js';
import equipSpell from './Spells/_equipSpell.js';
import upgradeSpellSelect from './Spells/_upgradeSpellSelect.js';

const event = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    const { user } = interaction;

    // Вносим в интеракцию информацию о вызове.
    interaction.executeType = 'interactionCreate';

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
        interactionValues[1] === user.id
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

      // Если это сообщение с улучшением оружия.
      else if (
        interactionValues[0] === 'upgradeGunSelect' &&
        interactionValues[1] === user.id
      ) {
        await upgradeGun(interaction);
      }

      // Если это клик по кнопке инвентаря в профиле.
      else if (
        (interactionValues[0] === 'inventory' ||
          interactionValues[0] === 'inventoryNext' ||
          interactionValues[0] === 'inventoryPrev') &&
        interactionValues[1] === user.id
      ) {
        await inventoryCommand(interaction);
      }

      // Если это улучшения оружия.
      else if (
        interactionValues[0] === 'upgradeGun' ||
        interactionValues[0] === 'upgradeGunNext' ||
        (interactionValues[0] === 'upgradeGunPrev' &&
          interactionValues[1] === user.id)
      ) {
        await upgradeGunCommand(interaction);
      }

      // Если выбор селект меню по экипировке оружия.
      else if (
        interactionValues[0] === 'equipGun' &&
        interactionValues[1] === user.id
      ) {
        await equipGun(interaction);
      }

      // Если выбрано улучшение характеристик.
      else if (
        interactionValues[0] === 'upgradeAttributes' &&
        interactionValues[1] === user.id
      ) {
        await upgradeAttributesCommand(interaction);
      }

      // Если выбрана характеристика на улучшение в селект меню.
      else if (
        interactionValues[0] === 'selectPerk' &&
        interactionValues[1] === user.id
      ) {
        await selectPerkForUpgrade(interaction);
      }

      // Если активированно модальное окно улучшения атрибутов.
      else if (
        interaction.isModalSubmit() &&
        interactionValues[0] === 'upgradeAttributesModal' &&
        interactionValues[1] === user.id
      ) {
        await upgradeAttrubutes(interaction);
      }

      // Если нажата кнопка атрибутов
      else if (
        interactionValues[0] === 'attributes' &&
        interactionValues[1] === user.id
      ) {
        await attributesCommand(interaction);
      }

      // Если нажата кнопка атрибутов
      else if (
        interactionValues[0] === 'moreAttributesInfo' &&
        interactionValues[1] === user.id
      ) {
        await moreAttributesInfo(interaction);
      }

      // Если нажата кнопка сброса атрибутов
      else if (
        interactionValues[0] === 'resetAttributes' &&
        interactionValues[1] === user.id
      ) {
        await resetAttributes(interaction);
      }

      // Если нажата кнопка сброса атрибутов
      else if (
        interactionValues[0] === 'resetAttributesSuccess' &&
        interactionValues[1] === user.id
      ) {
        await resetAttributesSucess(interaction);
      }

      // Если нажата кнопка сброса атрибутов
      else if (
        interactionValues[0] === 'resetAttributesCancel' &&
        interactionValues[1] === user.id
      ) {
        await resetAttributesCancel(interaction);
      }

      // Если нажата кнопка продажи оружия
      else if (
        interactionValues[0] === 'sellGun' &&
        interactionValues[1] === user.id
      ) {
        await sellGun(interaction);
      }

      // Если выбрано оружие на продажу
      else if (
        interactionValues[0] === 'sellGunSelect' &&
        interactionValues[1] === user.id
      ) {
        await sellGunSelect(interaction);
      }

      // Если выбран прайс для продажи оружия.
      else if (
        interactionValues[0] === 'sellGunSelectPrice' &&
        interactionValues[1] === user.id
      ) {
        await sellGunSelectPriceInput(interaction);
      }

      // Если отменили продажу оружия
      else if (
        interactionValues[0] === 'sellGunCancel' &&
        interactionValues[1] === user.id
      ) {
        await removeGunFromSale(interaction);
      }

      // Если купили оружие
      else if (interactionValues[0] === 'sellGunBuy') {
        await buyGun(interaction);
      }

      // Если выбрали активные заклинания
      else if (
        interactionValues[0] === 'activeSpells' &&
        interactionValues[1] === user.id
      ) {
        await activeSpellsCommand(interaction);
      }

      // Если выбрали купить заклинания
      else if (
        interactionValues[0] === 'buySpellsButton' &&
        interactionValues[1] === user.id
      ) {
        await buySpellsCommand(interaction);
      }

      // Если выбрали какое заклинание покупаем.
      else if (
        interactionValues[0] === 'buySpellsSelect' &&
        interactionValues[1] === user.id
      ) {
        await buySpellsSelect(interaction);
      }

      // Если подтвердили покупку заклинания
      else if (
        interactionValues[0] === 'accessBuySpellButton' &&
        interactionValues[1] === user.id
      ) {
        await accessBuySpell(interaction);
      }

      // Если отменили покупку заклинания
      else if (
        interactionValues[0] === 'denieBuySpellButton' &&
        interactionValues[1] === user.id
      ) {
        await denieBuySpell(interaction);
      }

      // Если это экипировка заклинания
      else if (
        interactionValues[0] === 'equipSpell' &&
        interactionValues[1] === user.id
      ) {
        await equipSpell(interaction);
      }

      // Если это кнопка улучшений заклинаний
      else if (
        interactionValues[0] === 'upgradeSpellsButton' &&
        interactionValues[1] === user.id
      ) {
        await upgradeSpellCommand(interaction);
      }

      // Если выбрано заклинание для улучшения.
      else if (
        interactionValues[0] === 'upgradeSpellSelect' &&
        interactionValues[1] === user.id
      ) {
        await upgradeSpellSelect(interaction);
      }

      // Если подтвердили улучшение заклинания
      else if (
        interactionValues[0] === 'accessUpgradeSpellButton' &&
        interactionValues[1] === user.id
      ) {
        await accessBuySpell(interaction);
      }

      // Если отменили улучшение заклинания
      else if (
        interactionValues[0] === 'denieUpgradeSpellButton' &&
        interactionValues[1] === user.id
      ) {
        await denieBuySpell(interaction);
      }

      // Если вызов профиля
      else if (
        interactionValues[0] === 'profile' &&
        interactionValues[1] === user.id
      ) {
        await profileCommand(interaction);
      }

      // Если кнопку нажал не автор команды.
      else if (interactionValues[1] != user.id) {
        await CommandNotYoursError(interaction);
      }

      // Если это что-то иное.
      else {
        console.log(
          `НЕ УДАЛОСЬ ОТСЛЕДИТЬ ИНТЕРАКЦИЮ! CustomID: ${interaction.customId}`
        );
        await CommandError(interaction);
      }
    } catch (err) {
      console.log(err);
    }
  },
};

export default event;
