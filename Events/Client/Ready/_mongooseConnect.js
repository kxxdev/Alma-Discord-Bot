import mongoose from 'mongoose';

const mongooseConnect = async (client) => {
  console.log('DB Connecting..');

  if (process.env.NODE_ENV === 'production') {
    await mongoose.connect(client.tokens.MONGODB_TOKEN || '', {
      bufferCommands: false,
    });
  } else {
    await mongoose.connect(client.tokens.MONGODB_TOKEN || '', {
      bufferCommands: false,
    });
  }
};

export default mongooseConnect;
