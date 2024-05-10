import { EmbedBuilder } from '@discordjs/builders';

import User from '../../../Models/Users/User.js';
import Guild from '../../../Models/Guilds/Guild.js';
import addExp from '../../../Functions/levels.js';
import autoThreads from '../../../Functions/autoThreads.js';

export default {
  name: 'messageCreate',
  async execute(message) {
    // Проверяем, написано ли сообщение в гильдии.
    if (!message.guild) return;

    if (message.author.bot) return;

    // Получаем пользователя написавшего сообщение.
    const member = message.member;

    // Получаем гильдию.
    const guild = message.guild;

    // Загружаем БД гильдии.
    const guildDb = await new Guild().get({ id: guild.id });

    // Загружаем пользователя из БД.
    const userDb = await User.get({ id: member.id, guildId: guild.id });

    // Сброс временного голосового ограничения
    await userDb.nullTempVoiceStates();

    // Вызываем функцию выдачи опыта.
    await addExp({ bot: message.author.bot, guild, member, userDb, guildDb });

    // Вызываем функцию выдачи моры.
    await userDb.giveEris({ type: 'text' });

    // Вызывем авто-треды.
    autoThreads({ message, guildDb });
  },
};
