import UserSpellsSchema from './UserSpellsSchema.js';

export default class UserSpelsService {
  static async get({ userId }) {
    // Ищем в БД схему.
    let db = await UserSpellsSchema.findOne({ userId });

    // Если запись не была найдена.
    if (!db) {
      await this.create({ userId });
      db = await UserSpellsSchema.findOne({ userId });
    }

    // Возвращаем запись из БД инвентаря.
    return db;
  }

  static async create({ userId }) {
    await UserSpellsSchema.create({ userId, spels: [] });
  }

  // Обновляем запись в БД.
  static async update({ userId, obj }) {
    await UserSpellsSchema.updateOne({ userId }, { ...obj });
  }

  // Удаляем запись из БД.
  static async delete({ userId }) {
    await UserSpellsSchema.deleteOne({ userId });
  }
}
