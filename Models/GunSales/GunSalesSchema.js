import mongoose from 'mongoose';
const { Schema } = mongoose;

const modelName = 'gunSales';
const schema = new Schema({
  userId: { type: String, required: true },
  id: { type: String, required: true },
  uniqId: { type: String, required: true },
  level: { type: Number, required: true },
  price: { type: Number, default: 0 },
  date: { type: Date, default: new Date() },
});

const Model = mongoose.model(modelName, schema);

export default Model;
