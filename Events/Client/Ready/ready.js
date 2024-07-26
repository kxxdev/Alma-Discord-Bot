import { Events } from 'discord.js';
import ascii from 'ascii-table';
import startFunctions from './_startFunctions.js';
import mongooseConnect from './_mongooseConnect.js';
import happyBirthday from './_happyBirthday.js';
import mongoose from 'mongoose';
import packageFile from '../../../package.json' assert { type: 'json' };
const table = new ascii().setHeading('Name', 'Status');

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    try {
      // Подключаем БД.
      await mongooseConnect(client);
      // Запускаем стартовые функции.
      await startFunctions(client);
      table.addRow('voiceExp', 'start');
      // Запускаем поздравлялки.
      await happyBirthday(client);
      table.addRow('happyBirthday', 'start');

      // Выводим информацию в консоль.
      table.addRow(
        `${client.user.username} version ${packageFile.version}`,
        'online'
      );
      table.addRow('Mode', process.env.NODE_ENV);
      if (mongoose.connect) {
        table.addRow('MongoDB', 'connected');
      } else {
        table.addRow('MongoDB', 'disconnected');
      }
      console.log(' ');
      console.log(table.toString(), '\nTHE BOT HAS STARTED');
      console.log(' ');
      console.log(' ');
    } catch (err) {
      console.log(err);
    }
  },
};
