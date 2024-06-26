// Загружаем библиотеку таблиц.
import ascii from 'ascii-table';

// Загружаем библиотеку по работе с файлами и папками.
import fs from 'fs';

// Создаем таблицу и устанавливаем ей заголовки.
const table = new ascii().setHeading('Commands', 'Status');

// Функция загрузки команд.
const loadCommands = async (client) => {
  // Создаем массив комманд.
  const commandsArray = [];

  // Записываем все папки в папке Commands.
  const commandsFolder = fs.readdirSync('./Commands');

  // Проходимся по всем папкам в папке Commands.
  for (const commandCategoryFolder of commandsFolder) {
    // Проверяем если это файл.
    if (commandCategoryFolder.endsWith('.js')) {
      continue;
    }

    // Получаем папки категории команд.
    const commandCategoryFolders = fs.readdirSync(
      `./Commands/${commandCategoryFolder}`
    );
    // Проходимcя по папкам категории команд
    for (const commandFolder of commandCategoryFolders) {
      // Записываем все файлы команд в папке.
      const commandsFiles = fs
        .readdirSync(`./Commands/${commandCategoryFolder}/${commandFolder}`)
        .filter((file) => file.endsWith('.js') && file.charAt(0) != '_');

      // Проходимся по всем файлам команд.
      for (const file of commandsFiles) {
        // Получаем файл команды.
        const commandFile = await import(
          `../Commands/${commandCategoryFolder}/${commandFolder}/${file}`
        );

        // Устанавливаем команду.
        client.commands.set(commandFile.default.data.name, commandFile);

        // Записываем команду в массив команд.
        commandsArray.push(commandFile.default.data.toJSON());

        // Добавляем файл команды в таблицу.
        table.addRow(file, 'loaded');
      }
    }
  }

  // Устанавливаем слеш команды.
  client.application.commands.set(commandsArray);

  // Возвращаем таблицу в консоль.
  return console.log(table.toString(), '\n Loaded commands');
};

export { loadCommands };
