import GunSalesService from './GunSalesService.js';

// Класс инвентаря.
export default class GunSales {
  // Конструктор класса.
  constructor(obj) {
    this.userId = obj?.userId;
    this.id = obj?.id;
    this.uniqId = obj?.uniqId;
    this.level = obj?.level;
    this.price = obj?.price;
    this.date = obj?.date;
  }

  // Получаем запись торговой площадки.
  static async get({ uniqId }) {
    try {
      // Получаем из бд запись инвентаря.
      const db = await GunSalesService.get({ uniqId });

      // Возвращаем экземпляр класса инвентаря.
      return new GunSales(db);
    } catch (err) {
      console.log(err);
    }
  }

  // Создаем новую запись на торговую площадку.
  static async create({ userId, id, uniqId, level }) {
    try {
      await GunSalesService.create({ userId, id, uniqId, level, price: -1 });
    } catch (err) {
      console.log(err);
    }
  }

  // Добавляем стоимость.
  async setPrice(price) {
    this.price = price;

    await this.update({ price: this.price });
  }

  // Обновляем запись в БД.
  async update(obj) {
    try {
      await GunSalesService.update({
        uniqId: this.uniqId,
        obj,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Удаляем запись торговой площадки.
  async delete() {
    try {
      await GunSalesService.delete({ uniqId: this.uniqId });
    } catch (err) {
      console.log(err);
    }
  }
}
