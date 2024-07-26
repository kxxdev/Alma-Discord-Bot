import UserSchema from '../../Models/Users/UserSchema.js';

export default class UserService {
  async get({ id }) {
    let db = await UserSchema.findOne({ id });
    if (!db) {
      await UserSchema.create({ id });
      db = await UserSchema.findOne({ id });
    }

    return db;
  }

  async getAll() {
    let db;
    db = await UserSchema.find({});
    return db;
  }

  async update(object) {
    await UserSchema.updateOne({ id: object.id }, object);
  }
}
