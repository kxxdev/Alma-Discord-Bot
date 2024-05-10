import moderationDelete from './_moderationDelete.js';

export default {
  name: 'messageCreate',
  async execute(message) {
    // Проверяем был ли это ответ на сообщение.
    if (!message.reference) return;

    try {
      await moderationDelete(message);
    } catch (err) {
      console.log(err);
    }
  },
};
