import GuildSchema from '../../Models/Guilds/GuildSchema.js';

export default class GuildService {
  constructor() {
    this.id = 'none';
  }

  async get({ id }) {
    let db = await GuildSchema.findOne({ id });
    if (!db) {
      await GuildSchema.create({ id });
      db = await GuildSchema.findOne({ id });
    }

    return db;
  }

  async getAll() {
    const db = await GuildSchema.find();
    return db;
  }

  async update(object) {
    await GuildSchema.updateOne({ id: object.id }, object);
  }
}
