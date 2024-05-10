// Загружаем библиотеку таблиц.
import ascii from 'ascii-table';

// Загружаем библиотеку по работе с файлами и папками.
import fs from 'fs';

// Создаем таблицу и устанавливаем ей заголовки.
const table = new ascii().setHeading('Events', 'Status');

// Загружаем в folders все папки в папке Events.
const folders = fs.readdirSync('./Events');

// Функция загрузки ивентов.
const loadEvents = async (client) => {
  // Проходимся по всем папкам в папке folders.
  for (const folder of folders) {
    // Загружаем в переменную все файлы с расширением '.js'.
    const files = fs
      .readdirSync(`./Events/${folder}`)
      .filter((file) => file.endsWith('.js'));

    // Проходимся по всем файлам.
    for (const file of files) {
      // Загружаем в переменную файл ивента.
      const event = await import(`../Events/${folder}/${file}`);

      // Запускаем ивент.
      client.on(event.default.name, (...args) => event.default.execute(...args, client));

      // Добавляем ивент в таблицу.
      table.addRow(file, 'loaded');
    }
  }
  // Возвращаем таблицу загруженных ивентов в логи.
  return console.log(table.toString(), '\nLoaded events');
};

export { loadEvents };
