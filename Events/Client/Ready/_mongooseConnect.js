import mongoose from 'mongoose';

const mongooseConnect = async (client) => {
  await mongoose.connect(client.tokens.MONGODB_TOKEN || '', {
    //
  });
};

export default mongooseConnect;
