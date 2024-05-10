const sendCommand = async (interaction, client) => {
  // Получаем команду из клиента.
  const command = client.commands.get(interaction.commandName)?.default;

  // Если команда не найдена выводим ошибку.
  if (!command) {
    return interaction.reply({
      content:
        'Ой-ой, что-то я совсем забыла такую команду... Попробуй позже, может я вспомню..',
    });
  }

  // Запускаем команду с обработкой ошибок.
  try {
    command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      interaction.followUp({
        content:
          'Ой-ой, что-то я не могу выполнить эту команду.. Попробуй позже..',
        ephemeral: true,
      });
    } else {
      interaction.reply({
        content:
          'Ой-ой, что-то я не могу выполнить эту команду.. Попробуй позже..',
        ephemeral: true,
      });
    }
  }
};

export default sendCommand;
