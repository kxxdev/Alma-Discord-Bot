import GunSalesSchema from './GunSalesSchema.js';

export default class GunSalesService {
  static async get({ uniqId }) {
    // Ищем в БД схему.
    let db = await GunSalesSchema.findOne({ uniqId });

    // Возвращаем запись из БД инвентаря.
    return db;
  }

  static async create({ userId, id, uniqId, level, price }) {
    await GunSalesSchema.create({ userId, id, uniqId, level, price });
  }

  // Обновляем запись в БД.
  static async update({ uniqId, obj }) {
    await GunSalesSchema.updateOne({ uniqId }, { ...obj });
  }

  // Удаляем запись из БД.
  static async delete({ uniqId }) {
    await GunSalesSchema.deleteOne({ uniqId });
  }
}
