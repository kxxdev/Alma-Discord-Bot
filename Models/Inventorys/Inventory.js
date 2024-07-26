import { InventoryService } from './InventoryService.js';
import gunsConfig from '../../Config/guns-config.js';
import uniqid from 'uniqid';
import { GetDesignConfig } from '../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

// Функция для возврата списка инвентаря по типу.
const inventoryList = (items, config) => {
  // Если оружия нет.
  if (items.length === 0) {
    return '*Пусто*';
  }

  // Создаем массив, куда будем загружать весь лист инвентаря.
  const text = [];

  // Проходимся по всем итемам.
  for (let i = 0; i < items.length; i++) {
    // Создаем переменную куда загружаем из конфига определенный итем.
    const item = config.find((item) => item.id === items[i].id);
    // Создаем переменную куда загружаем определенный левел итема.
    const itemLevel = item.levels.find(
      (itemLevel) => itemLevel.level === items[i].level
    );

    const emoji =
      (i + 1) % 2 === 0
        ? DesignConfig.guildEmojis.ps
        : DesignConfig.guildEmojis.gs;

    // Добавляем текст об итеме в массив
    text.push(
      `${emoji} **${i + 1}) ${
        itemLevel.name
      } ${DesignConfig.emojis.textStar.repeat(itemLevel.level)}**\nУрон: \`${
        itemLevel.damage
      }\`\nРедкость: **${item.rarity}**\nТип: \`${item.type}\``
    );
  }

  // Возвращаем строку со списком.
  return text.join('\n');
};

// Класс инвентаря.
export default class Inventory {
  // Конструктор класса.
  constructor(obj) {
    this.userId = obj?.userId;
    this.guildId = obj?.guildId;
    this.guns = obj?.guns;
    this.armors = obj?.armors;
    this.artifacts = obj?.artifacts;
  }

  // Получаем инвентарь пользователя.
  static async get({ userId, guildId }) {
    try {
      // Получаем из бд запись инвентаря.
      const db = await InventoryService.get({ userId, guildId });

      // Возвращаем экземпляр класса инвентаря.
      return new Inventory(db);
    } catch (err) {
      console.log(err);
    }
  }

  // Получение инвентаря оружия.
  getGunsList(min = 0, max = this.guns.all.length) {
    return inventoryList(this.guns.all.slice(min, max), gunsConfig);
  }

  // Получение оружия по uniqId.
  getGun({ uniqId }) {
    return this.guns.all.find((item) => item.uniqId === uniqId);
  }

  // Выдача оружия.
  async giveGun({ gun }) {
    // Добавляем оружию уникальный id.
    gun.uniqId = uniqid();

    // Добавляем в массив объект оружия.
    this.guns.all.push(gun);

    // Обновляем запись в БД.
    await this.update({ guns: this.guns });
  }

  // Отнятие оружия.
  async removeGun({ uniqId }) {
    // Вносим в массив оружий изменения удаляя необходимое оружие.
    this.guns.all = this.guns.all.filter((item) => item.uniqId !== uniqId);

    // Обновляем запись в БД.
    await this.update({ guns: this.guns });
  }

  // Получение активного оружия.
  getActiveGun() {
    return this.guns.all.find(
      (item) => item.uniqId === this.guns.active.uniqId
    );
  }

  // Получение текста активного оружия.
  getActiveGunText() {
    // Получаем активное оружие из инвентаря.
    const activeGun = this.getActiveGun();

    // Проверяем есть ли такое оружие в инвентаре
    if (!activeGun) {
      return 'Безоружный';
    }

    // Получаем оружие из конфигурации
    const item = gunsConfig.find((item) => item.id === activeGun.id);
    // Создаем переменную куда загружаем определенный левел итема.
    const itemLevel = item.levels.find(
      (itemLevel) => itemLevel.level === activeGun.level
    );

    return `**${itemLevel.name} ${DesignConfig.emojis.textStar.repeat(
      itemLevel.level
    )}** ${item.type}\nРедкость: ${item.rarity}`;
  }

  // Экипировка оружия.
  async equipGun({ uniqId }) {
    // Экипируем оружие.
    this.guns.active.uniqId = uniqId;

    // Обновляем запись в БД.
    await this.update({ guns: this.guns });
  }

  // Снятие оружия с активных.
  async unEquipGun() {
    // Снимаем оружие.
    this.guns.active.uniqId = 'none';

    // Обновляем запись в БД.
    await this.update({ guns: this.guns });
  }

  // Получения списка оружий возможных для улучшения.
  getUpgradeList() {
    // Создаем массив, куда запишем все оружия возможные для апгрейда.
    const gunsForUpgrade = [];
    // Создаем массив с лишними элементами.
    const extraGuns = [];

    // Проходимся по всем оружиям в инвентаре.
    this.guns.all.forEach((gun) => {
      // Получаем конфиг оружия.
      const gunConfig = gunsConfig.find((item) => item.id === gun.id);
      // Проверяем есть ли это оружие уже в массиве с лишними элементами.
      const checkExtraGuns = extraGuns.find(
        (item) => item.id === gun.id && item.level === gun.level
      );
      if (checkExtraGuns || gun.level >= gunConfig.levels.length) {
        return;
      }

      // Создаем массив с оружиями с одинаковым id.
      const tempGunsArray = this.guns.all.filter(
        (item) => item.id === gun.id && gun.level === item.level
      );
      // Если в массиве больше 1 оружия, записываем его в массив.
      if (tempGunsArray.length >= 2) {
        gunsForUpgrade.push(gun);
        extraGuns.push(gun);
      }
    });

    // Возвращаем массив с оружиями.
    return gunsForUpgrade;
  }

  // Улучшение оружия.
  async upgradeGun({ uniqId }) {
    // Ищем оружие по уникальному id в инвентаре.
    const gun = this.guns.all.find((item) => item?.uniqId === uniqId);

    // Если оружие по какой-то причине не найдено.
    if (!gun) {
      return 'Упс! Кажется я не нашла это оружие в вашем инвентаре!';
    }

    // Создаем массив с оружиями с одинаковым id.
    const tempGunsArray = this.guns.all.filter(
      (item) => item.id === gun.id && gun.level === item.level
    );
    // Если в массиве меньше двух оружий возвращаем ошибку.
    if (tempGunsArray.length < 2) {
      return 'Упс! Кажется я не нашла два одинаковых экземпляра такого оружия в вашем инвентаре!';
    }

    // Удаляем из массива два оружия.
    let count = 0;
    for (let i = 0; count < 2; i++) {
      if (
        this.guns.all[i].id === gun.id &&
        this.guns.all[i].level === gun.level
      ) {
        await this.removeGun({ uniqId: this.guns.all[i].uniqId });
        i--;
        count++;
      }
    }

    // Улучшаем уровень оружия.
    gun.level++;

    // Добавляем улучшенное оружие в массив оружий.
    this.giveGun({ gun });

    return 'Оружие успешно улучшено!';
  }

  async update(obj) {
    try {
      await InventoryService.update({
        userId: this.userId,
        guildId: this.guildId,
        obj,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
