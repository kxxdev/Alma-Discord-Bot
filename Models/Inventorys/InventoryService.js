import InventorySchema from './InventorySchema.js';

export class InventoryService {
  static async get({ userId, guildId }) {
    // Ищем в БД схему инвентаря пользоваля.
    let db = await InventorySchema.findOne({ userId, guildId });

    // Если схема не найдена, создаем ее и загружаем в переменную
    if (!db) {
      await InventorySchema.create({ userId, guildId });
      db = await InventorySchema.findOne({ userId, guildId });
    }

    // Возвращаем запись из БД инвентаря.
    return db;
  }

  static async update({ userId, guildId, obj }) {
    await InventorySchema.updateOne({ userId, guildId }, { ...obj });
  }
}
