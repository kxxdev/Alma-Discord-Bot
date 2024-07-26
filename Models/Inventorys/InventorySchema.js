import mongoose from 'mongoose';
import uniqid from 'uniqid';
const { Schema } = mongoose;

const modelName = 'inventorys';
const schema = new Schema({
  userId: { type: String, required: true },
  guildId: { type: String, required: true },
  guns: {
    active: {
      uniqId: { type: String, default: 'none' },
    },
    all: [
      {
        uniqId: { type: String, default: uniqid() },
        id: { type: String, required: true },
        level: { type: Number, default: 1 },
      },
    ],
  },
});

const Model = mongoose.model(modelName, schema);

export default Model;
