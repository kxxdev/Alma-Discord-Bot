import mongoose from 'mongoose';
import AttributesConfig from '../../Config/attributes-config.js';
const { Schema } = mongoose;

const modelName = 'usersAttributes';
const schema = new Schema({
  userId: { type: String, required: true },

  health: {
    value: { type: Number, default: 10 },
    regen: { type: Number, default: 0 },
    max: { type: Number, default: 10 },
  },
  mana: {
    value: { type: Number, default: 10 },
    regen: { type: Number, default: 0 },
    max: { type: Number, default: 10 },
  },
  endurance: {
    value: { type: Number, default: 10 },
    regen: { type: Number, default: 0 },
    max: { type: Number, default: 10 },
  },

  armor: {
    value: { type: Number, default: 10 },
  },

  availablePoints: { type: Number, default: 0 },

  STR: {
    value: { type: Number, default: AttributesConfig.minAttributes },
    buff: { type: Number, default: 0 },
  },
  DEX: {
    value: { type: Number, default: AttributesConfig.minAttributes },
    buff: { type: Number, default: 0 },
  },
  CON: {
    value: { type: Number, default: AttributesConfig.minAttributes },
    buff: { type: Number, default: 0 },
  },
  INT: {
    value: { type: Number, default: AttributesConfig.minAttributes },
    buff: { type: Number, default: 0 },
  },
  WIS: {
    value: { type: Number, default: AttributesConfig.minAttributes },
    buff: { type: Number, default: 0 },
  },
  CHA: {
    value: { type: Number, default: AttributesConfig.minAttributes },
    buff: { type: Number, default: 0 },
  },
});

const Model = mongoose.model(modelName, schema);

export default Model;
