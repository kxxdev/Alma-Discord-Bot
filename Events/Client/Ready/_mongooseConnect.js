import mongoose from 'mongoose';

const mongooseConnect = async (client) => {
  await mongoose.connect(client.tokens.MONGODB_TOKEN || '', {
    //
  });

  if (mongoose.connect) {
    table.addRow('MongoDB', 'connected');
  }
};

export default mongooseConnect;
