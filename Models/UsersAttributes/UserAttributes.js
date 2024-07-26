import AttributesConfig from '../../Config/attributes-config.js';
import User from '../Users/User.js';
import UserAttributesService from './UserAttributesService.js';

// Класс инвентаря.
export default class UserAttributes {
  // Конструктор класса.
  constructor(obj) {
    this.userId = obj?.userId;

    this.health = {
      value: obj?.health.value,
      regen: obj?.health.regen,
      max: obj?.health.max,
    };
    this.mana = {
      value: obj?.mana.value,
      regen: obj?.mana.regen,
      max: obj?.mana.max,
    };
    this.endurance = {
      value: obj?.endurance.value,
      regen: obj?.endurance.regen,
      max: obj?.endurance.max,
    };

    this.armor = {
      value: obj?.armor.value,
    };

    this.availablePoints = obj?.availablePoints;

    this.STR = {
      value: obj?.STR.value,
      buff: obj?.STR.buff,
    };
    this.DEX = {
      value: obj?.DEX.value,
      buff: obj?.DEX.buff,
    };
    this.CON = {
      value: obj?.CON.value,
      buff: obj?.CON.buff,
    };
    this.INT = {
      value: obj?.INT.value,
      buff: obj?.INT.buff,
    };
    this.WIS = {
      value: obj?.WIS.value,
      buff: obj?.WIS.buff,
    };
    this.CHA = {
      value: obj?.CHA.value,
      buff: obj?.CHA.buff,
    };
  }

  // Получаем запись из БД и возвращаем экземпляр класса.
  static async get({ userId }) {
    try {
      // Получаем из бд запись инвентаря.
      const db = await UserAttributesService.get({ userId });

      // Возвращаем экземпляр класса инвентаря.
      return new UserAttributes(db);
    } catch (err) {
      console.log(err);
    }
  }

  // Получаем всех пользователей в БД
  static async getAll() {
    try {
      // Получаем из бд запись инвентаря.
      const db = await UserAttributesService.getAll();

      // Возвращаем пользователей.
      return db;
    } catch (err) {
      console.log(err);
    }
  }

  // Добавляем атрибуты.
  async upgradeAttributes({
    STR = 0,
    DEX = 0,
    CON = 0,
    INT = 0,
    WIS = 0,
    CHA = 0,
  }) {
    this.STR.value += STR;
    this.DEX.value += DEX;
    this.CON.value += CON;
    this.INT.value += INT;
    this.WIS.value += WIS;
    this.CHA.value += CHA;

    await this.updateStats();
  }

  // Лечим ежечасно.
  async hourHeal() {
    // Восстанавливаем здоровье.
    this.health.value += this.health.regen;
    // Если вдруг здоровье вышло за максимум.
    this.health.value =
      this.health.value > this.health.max ? this.health.max : this.health.value;

    // Восстанавливаем ману.
    this.mana.value += this.mana.regen;
    // Если вдруг мана вышла за максимум.
    this.mana.value =
      this.mana.value > this.mana.max ? this.mana.max : this.mana.value;

    // Восстанавливаем выносливость.
    this.endurance.value += this.endurance.regen;
    // Если вдруг выносливасть вышла за максимум.
    this.endurance.value =
      this.endurance.value > this.endurance.max
        ? this.endurance.max
        : this.endurance.value;

    await this.update({
      health: this.health,
      mana: this.mana,
      endurance: this.endurance,
    });
  }

  // Сброс атррибутов.
  async resetAttributes() {
    this.STR.value = AttributesConfig.minAttributes;
    this.DEX.value = AttributesConfig.minAttributes;
    this.CON.value = AttributesConfig.minAttributes;
    this.INT.value = AttributesConfig.minAttributes;
    this.WIS.value = AttributesConfig.minAttributes;
    this.CHA.value = AttributesConfig.minAttributes;

    await this.updateStats();
  }

  // Обновляем статы.
  async updateStats() {
    const userDb = await User.get({ id: this.userId });
    const level = userDb.levels.level;

    // Получаем сколько доступных атрибутов у нас есть
    this.availablePoints =
      level -
      (this.STR.value +
        this.DEX.value +
        this.CON.value +
        this.INT.value +
        this.WIS.value +
        this.CHA.value) +
      AttributesConfig.minAttributes * 6;

    // // // - - - HEALTH - - - // // //

    // Вычисляем максимальное здоровье.
    this.health.max = Math.floor(
      level * AttributesConfig.Level.health + AttributesConfig.minHealth
    );
    // Вычисляем регенерацию здоровья.
    this.health.regen = Math.floor(level * AttributesConfig.Level.regenHealth);
    // Если вдруг здоровье вышло за максимум.
    this.health.value =
      this.health.value > this.health.max ? this.health.max : this.health.value;

    // // // - - - - - - - - - // // //

    // // // - - - MANA - - - // // //

    // Вычисляем максимальную ману.
    this.mana.max = Math.floor(
      level * AttributesConfig.Level.mana + AttributesConfig.minMana
    );
    // Вычисляем регенерацию маны.
    this.mana.regen = Math.floor(level * AttributesConfig.Level.regenMana);
    // Если вдруг мана вышла за максимум.
    this.mana.value =
      this.mana.value > this.mana.max ? this.mana.max : this.mana.value;

    // // // - - - - - - - - - // // //

    // // // - - - ENDURANCE - - - // // //

    // Вычисляем максимальную выносливость.
    this.endurance.max = Math.floor(
      level * AttributesConfig.Level.endurance + AttributesConfig.minEndurance
    );
    // Вычисляем регенерацию выносливости.
    this.endurance.regen = Math.floor(level * AttributesConfig.Level.regenEnd);
    // Если вдруг выносливость вышла за максимум.
    this.endurance.value =
      this.endurance.value > this.endurance.max
        ? this.endurance.value
        : this.endurance.value;

    // // // - - - - - - - - - // // //

    // // // - - - ARMOR - - - // // //

    this.armor.value = 12;

    // // // - - - - - - - - - // // //

    // // // - - - STR - - - // // //
    this.STR.buff = Math.floor(
      this.STR.value * AttributesConfig.STR.buff -
        AttributesConfig.minAttributes * AttributesConfig.STR.buff +
        Number((2 % AttributesConfig.STR.buff).toFixed(1))
    );

    // // // - - - - - - - - - // // //

    // // // - - - DEX - - - // // //

    this.DEX.buff = Math.floor(
      this.DEX.value * AttributesConfig.DEX.buff -
        AttributesConfig.minAttributes * AttributesConfig.DEX.buff +
        Number((2 % AttributesConfig.DEX.buff).toFixed(1))
    );

    // // // - - - - - - - - - // // //

    // // // - - - CON - - - // // //

    this.CON.buff = Math.floor(
      this.CON.value * AttributesConfig.CON.buff -
        AttributesConfig.minAttributes * AttributesConfig.CON.buff +
        Number((2 % AttributesConfig.CON.buff).toFixed(1))
    );

    // // // - - - - - - - - - // // //

    // // // - - - INT - - - // // //

    this.INT.buff = Math.floor(
      this.INT.value * AttributesConfig.INT.buff -
        AttributesConfig.minAttributes * AttributesConfig.INT.buff +
        Number((2 % AttributesConfig.INT.buff).toFixed(1))
    );

    // // // - - - - - - - - - // // //

    // // // - - - WIS - - - // // //

    this.WIS.buff = Math.floor(
      this.WIS.value * AttributesConfig.WIS.buff -
        AttributesConfig.minAttributes * AttributesConfig.WIS.buff +
        Number((2 % AttributesConfig.WIS.buff).toFixed(1))
    );

    // // // - - - - - - - - - // // //

    // // // - - - CHA - - - // // //

    this.CHA.buff = Math.floor(
      this.CHA.value * AttributesConfig.CHA.buff -
        AttributesConfig.minAttributes * AttributesConfig.CHA.buff +
        Number((2 % AttributesConfig.CHA.buff).toFixed(1))
    );

    // // // - - - - - - - - - // // //

    await this.update({
      health: this.health,
      mana: this.mana,
      endurance: this.endurance,

      armor: this.armor,

      availablePoints: this.availablePoints,

      STR: this.STR,
      DEX: this.DEX,
      CON: this.CON,
      INT: this.INT,
      WIS: this.WIS,
      CHA: this.CHA,
    });
  }

  // Обновляем запись в БД.
  async update(obj) {
    try {
      await UserAttributesService.update({
        userId: this.userId,
        obj,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
