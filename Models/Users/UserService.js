import UserSchema from '../../Models/Users/UserSchema.js';

export default class UserService {
  async get({ id, guildId }) {
    let db = await UserSchema.findOne({ id, guild: { id: guildId } });
    if (!db) {
      await UserSchema.create({ id, guild: { id: guildId } });
      db = await UserSchema.findOne({ id, guild: { id: guildId } });
    }

    return db;
  }

  async getAllInGuild({ guildId }) {
    let db;
    db = await UserSchema.find({ guild: { id: guildId } });
    return db;
  }

  async update(object) {
    await UserSchema.updateOne(
      { id: object.id, guild: { id: object.guild.id } },
      object
    );
  }
}
