import ascii from 'ascii-table';
import startFunctions from './_startFunctions';
import mongooseConnect from './_mongooseConnect';
const table = new ascii().setHeading('Name', 'Status');

export default {
  name: 'ready',
  async execute(client) {
    // Подключаем БД.
    await mongooseConnect(client);
    // Запускаем стартовые функции.
    await startFunctions(client);

    // Выводим информацию в консоль.
    table.addRow(client.user.username, 'online');
    table.addRow('Mode', process.env.NODE_ENV);
    console.log(table.toString(), '\nTHE BOT HAS STARTED');
  },
};
