const moderRoles = [
  '1065927076357623819',
  '920384487207084094',
  '1071954387343261736',
  '809405849687818261',
];
const delMessageActions = ['уд', 'дел', 'del', 'мутч', 'мутчч', 'мутд'];

const timeoutDel = (message) => {
  setTimeout(() => {
    message.delete().catch();
  }, 1000 * 5);
};

// Функция простого удаления сообщений.
const delMessage = async (message, action, text) => {
  // Ищем сообщение для удаления.
  const referenceMessage = await message.channel.messages.fetch(
    message.reference.messageId
  );

  if (!referenceMessage)
    return message
      .reply({ content: 'Ошибка. Я не могу получить исходное сообщение.' })
      .catch((err) => console.log(err));
  // Удаляем сообщение.
  referenceMessage.delete().catch();

  // Записываем время мута.
  let time = 0;
  let timeName = 'часов';
  if (action === 'мутч') {
    time = 1;
    timeName = 'час';
  } else if (action === 'мутчч') {
    time = 6;
    timeName = 'часов';
  } else if (action === 'мутд') {
    time = 24;
    timeName = 'часа';
  }

  // Проверяем причину.
  if (!text) text = 'Не указано.';

  await referenceMessage.member
    .send({
      content: `**Ваше сообщение удалено. Администратор: <@${message.author.id}>**\nПричина:\n\`\`\`${text}\`\`\`\nВам выдан мут на **${time}** ${timeName}.\nТекст сообщения:\n\`\`\`${referenceMessage.content}\`\`\``,
    })
    .catch((err) => {});

  await message
    .reply({
      content: 'Сообщение удалено, пользователю отправлена информация.',
    })
    .then((message) => {
      timeoutDel(message);
    })
    .catch((err) => console.log(err));

  if (time != 0) mute(referenceMessage.member, time);

  timeoutDel(message);
};

// Функция мута.
const mute = async (member, time) => {
  await member
    .disableCommunicationUntil(Date.now() + time * 1000 * 60 * 60)
    .catch((err) => console.log(err));
};

const moderationDelete = async (message) => {
  // Создаем массив из текста переменной.
  const messageContentArray = message.content.split(' ');

  // Проверяем состояние массива.
  if (!messageContentArray) return;

  // Записываем первое значение сообщения.
  const action = messageContentArray[0].toLowerCase();

  // Удаляем из массива действие.
  messageContentArray.splice(0, 1);

  const text = messageContentArray.join(' ');

  // Если это простое удаление сообщений.
  if (
    delMessageActions.includes(action) &&
    message.member.roles.cache.hasAny(...moderRoles)
  ) {
    return delMessage(message, action, text);
  }
};

export default moderationDelete;
