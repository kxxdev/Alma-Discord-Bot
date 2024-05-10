import mongoose from 'mongoose';

import ascii from 'ascii-table';
const table = new ascii().setHeading('Name', 'Status');

import voiceExp from '../eventsFunctions/exp/voiceExp.js';

export default {
  name: 'ready',
  async execute(client) {
    await mongoose.connect(client.tokens.MONGODB_TOKEN || '', {
      //
    });

    if (mongoose.connect) {
      table.addRow('MongoDB', 'connected');
    }

    try {
      voiceExp(client);
      table.addRow('voiceExp', 'start');
    } catch (err) {
      console.log(err);
      table.addRow('voiceExp', 'error');
    }

    table.addRow(client.user.username, 'online');
    table.addRow('Mode', process.env.NODE_ENV);
    console.log(table.toString(), '\nTHE BOT HAS STARTED');
  },
};
