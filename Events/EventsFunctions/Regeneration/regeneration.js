import UserAttributes from '../../../Models/UsersAttributes/UserAttributes.js';

const event = async (client) => {
  setInterval(async () => {
    // Выводим логи.
    console.log('Начинаю подхил...');

    const users = await UserAttributes.getAll();

    // Проходимся по всем пользователям.
    users.forEach(async (user) => {
      // Получаем пользователя из БД.
      const userDb = await UserAttributes.get({ userId: user.userId });

      // Лечим.
      await userDb.hourHeal();
    });
  }, 3_600_000); // 3_600_000
};

export default event;
