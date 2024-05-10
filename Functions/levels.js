import giveLevelRole from './giveLevelRole.js';

const addExp = async ({ bot, guild, member, userDb, guildDb }) => {
    // Проверяем, написано ли сообщение ботом.
    if (bot) return;

    // Выдаем опыт.
    const level = await userDb.giveExp({ type: 'text' });

    // Проверка если уровень апнут.
    if (level) return giveLevelRole({ guildDb, member, guild, level });
}

export default addExp;
