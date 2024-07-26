import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import Inventory from '../../../../Models/Inventorys/Inventory.js';
import GunSales from '../../../../Models/GunSales/GunSales.js';
import { getGunConfig } from '../../../../Functions/getConfig.js';
import { CommandCustomError } from '../../../../Commands/CommandsError.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const sellGunSelect = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { guild, member } = interaction;

  // Получаем значение выбранного пункта select menu.
  const selected = interaction.values[0];

  // Получаем инвентарь пользоваеля.
  const inventory = await Inventory.get({
    userId: member.id,
    guildId: guild.id,
  });

  // Проверяем было ли такое оружие уже выставлено на площадку.
  const gunSalesDB = await GunSales.get({ uniqId: selected });
  if (gunSalesDB.id && gunSalesDB.price != -1) {
    await gunSalesDB.delete();
    return CommandCustomError(
      interaction,
      'Данное оружие уже было выставлено на торговую площадку. Сначала удалите его от туда.'
    );
  }

  // Ищем это оружие в инвентаре.
  const inventoryGun = inventory.getGun({ uniqId: selected });

  // Получаем это оружие из конфигурации.
  const configGun = getGunConfig({
    id: inventoryGun.id,
    level: inventoryGun.level,
  });

  // Добавляем оружие в торговую площадку.
  await GunSales.create({
    userId: member.id,
    id: inventoryGun.id,
    uniqId: selected,
    level: inventoryGun.level,
  });

  // Создаем модальное окно.
  const modal = new ModalBuilder()
    .setCustomId(`sellGunSelectPrice-${member.id}-${selected}`)
    .setTitle(
      `${DesignConfig.guildEmojis.gun} Продажа оружия ${DesignConfig.guildEmojis.gun}`
    );

  // Добавляем компоненты в модальное окно.
  const gunPriceInput = new TextInputBuilder()
    .setCustomId(`sellGunSelectPriceInput-${member.id}`)
    .setLabel(`Введите цену для продажи:`)
    .setStyle(TextInputStyle.Short)
    .setValue('0');

  // Создаем строки действия.
  const gunPriceActionRow = new ActionRowBuilder().addComponents(gunPriceInput);

  // Добавляем строки в модальное окно.
  modal.addComponents(gunPriceActionRow);

  // Показываем модальное окно.
  await interaction.showModal(modal);
};

export default sellGunSelect;
