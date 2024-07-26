// Подключаем ивенты из библиотеки discord.js
import { Events } from 'discord.js';

// Загружаем библиотеку таблиц.
import ascii from 'ascii-table';

// Загружаем библиотеку по работе с файлами и папками.
import fs from 'fs';

// Создаем таблицу и устанавливаем ей заголовки.
const table = new ascii().setHeading('Events', 'Status');

// Сохраняем все категории ивентов
const eventsCategorysFolder = fs.readdirSync('./Events');

// Функция загрузки ивентов.
const loadEvents = async (client) => {
  // Проходимся по всем категориям в папке ивентов.
  for (const eventCategoryFolder of eventsCategorysFolder) {
    // Если это папка функций ивентов то выходим.
    if (eventCategoryFolder === 'EventsFunctions') {
      continue;
    }

    // Сохраняем все папки ивентов из категории.
    const eventsFolder = fs.readdirSync(`./Events/${eventCategoryFolder}`);

    // Проходимся по всем ивентам в категории
    for (const eventFolder of eventsFolder) {
      // Загружаем в переменную все файлы с расширением '.js'.
      const files = fs
        .readdirSync(`./Events/${eventCategoryFolder}/${eventFolder}`)
        .filter((file) => file.endsWith('.js') && file.charAt(0) != '_');
      // Проходимся по всем файлам.
      for (const file of files) {
        // Загружаем в переменную файл ивента.
        const event = await import(
          `../Events/${eventCategoryFolder}/${eventFolder}/${file}`
        );

        // Запускаем ивент.
        if (event.default.once) {
          client.once(event.default.name, (...args) => {
            console.log(`Вызван ивент: ${event.default.name}`);
            event.default.execute(...args, client);
          });
        } else {
          client.on(event.default.name, (...args) => {
            console.log(`Вызван ивент: ${event.default.name}`);
            event.default.execute(...args, client);
          });
        }

        // Добавляем ивент в таблицу.
        table.addRow(file, 'loaded');
      }
    }
  }
  // Возвращаем таблицу загруженных ивентов в логи.
  return console.log(table.toString(), '\nLoaded events');
};

export { loadEvents };
