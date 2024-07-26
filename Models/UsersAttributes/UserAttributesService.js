import UserAttributesSchema from './UserAttributesSchema.js';

export default class UserAttributesService {
  static async get({ userId }) {
    // Ищем в БД схему.
    let db = await UserAttributesSchema.findOne({ userId });

    // Если запись не была найдена.
    if (!db) {
      await this.create({ userId });
      db = await UserAttributesSchema.findOne({ userId });
    }

    // Возвращаем запись из БД.
    return db;
  }

  static async getAll() {
    // Ищем в БД схему.
    let db = await UserAttributesSchema.find();

    // Возвращаем запись из БД.
    return db;
  }

  // Создаем запись в БД.
  static async create({ userId }) {
    await UserAttributesSchema.create({ userId });
  }

  // Обновляем запись в БД.
  static async update({ userId, obj }) {
    await UserAttributesSchema.updateOne({ userId }, { ...obj });
  }
}
