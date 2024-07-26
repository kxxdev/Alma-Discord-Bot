import mongoose from 'mongoose';
const { Schema } = mongoose;

const modelName = 'usersSpells';
const schema = new Schema({
  userId: { type: String, required: true },
  manaStones: { type: Number, default: 0 },
  activeSpells: [
    {
      id: { type: String },
    },
  ],
  spells: [
    {
      id: { type: String, required: true },
      level: { type: Number, default: 1 },
    },
  ],
});

const Model = mongoose.model(modelName, schema);

export default Model;
