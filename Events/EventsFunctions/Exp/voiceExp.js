import Guild from '../../../Models/Guilds/Guild.js';
import User from '../../../Models/Users/User.js';
import giveLevelRole from '../../../Functions/giveLevelRole.js';

// Функция получения количества часов которое можно сидеть без проверки
const getVoiceAmount = () => {
  const dateNow = new Date();
  const hour = dateNow.getHours();

  if (hour > 0 && hour < 3) return 240;
  if (hour >= 3 && hour < 9) return 120;
  else if (hour >= 9 && hour < 18) return 120;
  else if (hour >= 18 && hour <= 23) return 320;

  return 240;
};

const event = async (client) => {
  setInterval(async () => {
    // Выводим логи.
    console.log('Проверяю голосовые каналы.');

    // Загружаем все войсы
    const voiceChannels = await client.channels.cache.filter(
      (c) => c.type === 2
    );

    // Проходим по все голосовым каналам.
    voiceChannels.forEach(async (channel) => {
      if (
        channel.id === '1071867972903256215' ||
        channel.guild.id != client.tokens.GUILD_ID
      )
        return;

      // Загружаем гильдию из БД.
      const guildDb = await new Guild().get({ id: channel.guild.id });

      // Записываем сколько людей в голосовом канале.
      let memberSize = channel.members.size;

      // Получаем сколько людей в канале ведет трансляцию и есть ли твинки.
      let streamingCount = 0;
      for (const memberChannel of channel.members) {
        const member = await channel.guild.members.cache.find(
          (member) => member.id === memberChannel[0]
        );
        // Загружаем пользователя из БД.
        const userDb = await User.get({
          id: member.id,
          guildId: channel.guild.id,
        });

        if (member.voice.streaming || member.voice.selfVideo) streamingCount++;

        if (userDb.notice.twink.status) memberSize--;
      }

      // Если в канале меньше 2-х человек.
      if (memberSize < 2 && channel.id != '809438184806154280') return;

      // Проходимся пользователям голосовых каналов.
      channel.members.forEach(async (member) => {
        // Проверяем бот ли пользователь.
        if (member.user.bot) return;

        // Проверяем, включен ли у пользователя микрофон.
        if (member.voice.selfMute) return;

        // Загружаем пользователя из БД.
        const userDb = await User.get({
          id: member.id,
          guildId: channel.guild.id,
        });

        // Проверяем сколько пользователь уже сидит в голосовом канале.
        if (userDb.voiceStates.tempStates >= getVoiceAmount()) return;

        // Создаем переменную количества выдаваемого опыта.
        let num = 1;

        // // Личный буст.
        // if (userDb.id === '259366722597814272') {
        //   num += 5;
        // }

        // Если у пользователя включена камера или стрим удваиваем опыт.
        if (
          (member.voice.streaming || member.voice.selfVideo) &&
          streamingCount <= memberSize / 2
        ) {
          num++;
        }
        // Выдаем опыт.
        const level = await userDb.giveExp({ type: 'voice', num });

        // Выдаем мору.
        await userDb.giveEris({ type: 'voice', num });

        // Выводим логи.
        console.log(
          `Проверяю пользователя в канале: ${channel.name}. Пользователь ${member.displayName}. Выдаю опыт. Опыта: ${userDb.levels.exp}, уровень: ${userDb.levels.level}`
        );

        // Проверка если уровень апнут.
        if (level)
          return giveLevelRole({
            guildDb,
            member,
            guild: channel.guild,
            level,
          });
      });
    });
  }, 1000 * 60);
};

export default event;
