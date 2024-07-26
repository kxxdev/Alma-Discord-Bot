import { Spells } from '../../Config/spells-config.js';
import UserSpellsService from './UserSpellsService.js';

import { GetDesignConfig } from '../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

// Класс инвентаря.
export default class UserSpells {
  // Конструктор класса.
  constructor(obj) {
    this.userId = obj?.userId;

    this.manaStones = obj?.manaStones;

    this.activeSpells = obj?.activeSpells;
    this.spells = obj?.spells;
  }

  // Получаем запись из БД и возвращаем экземпляр класса.
  static async get({ userId }) {
    try {
      // Получаем из бд запись инвентаря.
      const db = await UserSpellsService.get({ userId });

      // Возвращаем экземпляр класса инвентаря.
      return new UserSpells(db);
    } catch (err) {
      console.log(err);
    }
  }

  // Получить оружие из конфигурации.
  getSpellConfig({ id }) {
    const spell = Spells.find((spell) => spell.id === id);
    return spell;
  }

  // Получить заклинание пользователя по id/
  getSpell({ id }) {
    // Ищем заклинание у пользователя.
    const spell = this.spells.find((spell) => spell.id === id);

    // Если уровень заклинания превышает максимальный - изменяем уровень на максимальный.
    const spellConfig = this.getSpellConfig({ id });
    if (spell.level > spellConfig.levels.length) {
      spell.level = spellConfig.levels.length;
    }

    return spell;
  }

  // Зачисление мана камней.
  async giveManaStones({ num }) {
    this.manaStones += num;

    // Обновляем БД.
    await this.update({ manaStones: this.manaStones });
  }

  // Списание мана камней.
  async subManaStones({ num }) {
    this.manaStones -= num;

    // Обновляем БД.
    await this.update({ manaStones: this.manaStones });
  }

  // Покупка или прокачка заклинания.
  async buySpell({ id }) {
    // Ищем заклинание в конфигурации.
    const spell = Spells.find((spell) => spell.id === id);

    // Если заклинание не найдено.
    if (!spell) {
      throw new Error(`Заклинание ${id} не найдено в конфигурации.`);
    }

    // Ищем, есть ли уже такое заклинание у пользователя.
    const userSpellIndex = this.spells.findIndex((spell) => spell.id === id);

    // Если не найдено покупаем его.
    if (userSpellIndex < 0) {
      this.spells.push({ id, level: 1 });
      await this.update({ spells: this.spells });

      return;
    }

    // Проверяем является ли это заклинание максимальным.
    if (this.spells[userSpellIndex].level >= spell.levels.length) {
      throw new Error(`Заклинание ${id} уже максимального уровня.`);
    }

    // Улучшаем заклинание у пользователя.
    this.spells[userSpellIndex].level++;

    // Обновляем запись в БД.
    await this.update({ spells: this.spells });
  }

  // Замена заклинания из активного в неактивный слот и наоборот.
  async swapSpell({ id }) {
    const checkActive = this.activeSpells.find((spell) => spell.id === id);
    if (checkActive) {
      return await this.unSetActiveSpell({ id });
    }

    return await this.setActiveSpell({ id });
  }

  // Установка заклинания активным.
  async setActiveSpell({ id }) {
    // Ищем, есть ли такое заклинание у пользователя.
    const userSpell = this.spells.find((spell) => spell.id === id);

    // Если заклинание не найдено.
    if (!userSpell) {
      throw new Error(`Заклинание ${id} не найдено у пользователя.`);
    }

    // Делаем заклинание активным.
    this.activeSpells.push({ id });

    // Обновляем запись в БД.
    await this.update({ activeSpells: this.activeSpells });
  }

  // Удаление заклинания из активных.
  async unSetActiveSpell({ id }) {
    // Ищем, есть ли такое активное заклинание у пользователя.
    const userSpellIndex = this.activeSpells.findIndex(
      (spell) => spell.id === id
    );

    // Если заклинание не найдено.
    if (userSpellIndex < 0) {
      throw new Error(`Активное заклинание ${id} не найдено у пользователя.`);
    }

    // Удаляем заклинание из активных.
    this.activeSpells.splice(userSpellIndex, 1);

    // Обновляем запись в БД.
    await this.update({ activeSpells: this.activeSpells });
  }

  // Получение списка заклинаний текстом.
  getSpellsList({ type = 'none', min = 0, max = this.spells?.length }) {
    // Записываем заклинания в переменную.
    const spells =
      type === 'active'
        ? this.activeSpells.slice(min, max)
        : this.spells.slice(min, max);
    // Записываем массив в перменную.
    const array = type === 'active' ? this.activeSpells : this.spells;

    // Если оружия нет.
    if (spells.length === 0) {
      return '*Пусто*';
    }

    // Создаем массив, куда будем загружать весь лист инвентаря.
    const text = [];

    // Проходимся по всем итемам.
    for (let i = 0; i < spells.length; i++) {
      // Указываем уровень заклинания.
      const spellLevel =
        type === 'active'
          ? this.spells.find((spell) => spell.id === array[i].id).level
          : array[i].level;

      // Создаем переменную куда загружаем из конфига определенный итем.
      const spell = Spells.find((spell) => spell.id === spells[i].id);
      // Создаем переменную куда загружаем определенный левел итема.
      const spellLevelInfo = spell.levels[spellLevel - 1];

      // Задаем информацию о заклинаннии.
      let valuesInfo = '';
      if (spellLevelInfo.damage) {
        valuesInfo = `${valuesInfo} ${DesignConfig.guildEmojis.damage} Урон: \`${spellLevelInfo.damage}\`\n`;
      }
      if (spellLevelInfo.duration) {
        valuesInfo = `${valuesInfo} ${DesignConfig.guildEmojis.duration} Ходов: \`${spellLevelInfo.duration}\`\n`;
      }
      if (spellLevelInfo.bonus) {
        valuesInfo = `${valuesInfo} ${DesignConfig.guildEmojis.bonus} Бонус: \`${spellLevelInfo.bonus}\`\n`;
      }

      // Добавляем текст об итеме в массив
      text.push(
        `**${spell.id} ${DesignConfig.emojis.textStar.repeat(
          spellLevel.level
        )}**\n${spell.description}\n${valuesInfo}`
      );
    }

    // Возвращаем строку со списком.
    return text.join('\n');
  }

  // Обновляем запись в БД.
  async update(obj) {
    try {
      await UserSpellsService.update({
        userId: this.userId,
        obj,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
