import { EmbedBuilder } from 'discord.js';

import User from '../../../Models/Users/User.js';
import Guild from '../../../Models/Guilds/Guild.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const expMn = (level, exp) => {
  let a = 0;
  for (let i = 1; i < level + 1; i++) {
    a += i * 100;
  }

  a += exp;

  return a;
};

const command = async (interaction) => {
  const { guild, channel } = interaction;
  // Загружаем экземпляр класса гильдии.
  const guildDb = await new Guild().get({ id: guild.id });

  // Создаем переменную для проверки эфермальности сообщения.
  const ephemeral = channel.id != guildDb.channels.spam.id;

  // Загружаем БД автора команды.
  const users = await User.getAll({ guildId: guild.id });

  const lenght = users.length > 10 ? 10 : users.length;

  // Топ по море.
  users.sort((a, b) => b.money.eris.value - a.money.eris.value);
  const toperis = [];
  for (let i = 0; i < lenght; i++) {
    if (i === 0) {
      toperis.push(
        `**${DesignConfig.guildEmojis.top.diamond}** **${DesignConfig.guildEmojis.eris} ${users[i].money.eris.value}** • <@${users[i].id}>`
      );
    } else if (i === 1) {
      toperis.push(
        `**${DesignConfig.guildEmojis.top.platinum}** **${DesignConfig.guildEmojis.eris}  ${users[i].money.eris.value}** • <@${users[i].id}>`
      );
    } else if (i === 2) {
      toperis.push(
        `**${DesignConfig.guildEmojis.top.gold}** **${DesignConfig.guildEmojis.eris}  ${users[i].money.eris.value}** • <@${users[i].id}>`
      );
    } else if (i === 3) {
      toperis.push(
        `**${DesignConfig.guildEmojis.top.silver}** **${DesignConfig.guildEmojis.eris}  ${users[i].money.eris.value}** • <@${users[i].id}>`
      );
    } else if (i === 4) {
      toperis.push(
        `**${DesignConfig.guildEmojis.top.bronze}** **${DesignConfig.guildEmojis.eris}  ${users[i].money.eris.value}** • <@${users[i].id}>`
      );
    } else if (i === 9) {
      toperis.push(
        `${i + 1}) ${DesignConfig.guildEmojis.eris}  ${
          users[i].money.eris.value
        } • <@${users[i].id}>`
      );
    } else {
      toperis.push(
        `  ${i + 1}) ${DesignConfig.guildEmojis.eris}  ${
          users[i].money.eris.value
        } • <@${users[i].id}>`
      );
    }
  }

  // Топ по уровню
  users.sort(
    (a, b) =>
      expMn(b.levels.level, b.levels.exp) - expMn(a.levels.level, a.levels.exp)
  );
  const topLevel = [];
  for (let i = 0; i < lenght; i++) {
    if (i === 0) {
      topLevel.push(
        `**${DesignConfig.guildEmojis.top.diamond}** **${DesignConfig.guildEmojis.exp} ${users[i].levels.level}** • <@${users[i].id}>`
      );
    } else if (i === 1) {
      topLevel.push(
        `**${DesignConfig.guildEmojis.top.platinum}** **${DesignConfig.guildEmojis.exp} ${users[i].levels.level}** • <@${users[i].id}>`
      );
    } else if (i === 2) {
      topLevel.push(
        `**${DesignConfig.guildEmojis.top.gold}** **${DesignConfig.guildEmojis.exp} ${users[i].levels.level}** • <@${users[i].id}>`
      );
    } else if (i === 3) {
      topLevel.push(
        `**${DesignConfig.guildEmojis.top.silver}** **${DesignConfig.guildEmojis.exp} ${users[i].levels.level}** • <@${users[i].id}>`
      );
    } else if (i === 4) {
      topLevel.push(
        `**${DesignConfig.guildEmojis.top.bronze}** **${DesignConfig.guildEmojis.exp} ${users[i].levels.level}** • <@${users[i].id}>`
      );
    } else if (i === 9) {
      topLevel.push(
        `${i + 1}) ${DesignConfig.guildEmojis.exp}   ${
          users[i].levels.level
        } • <@${users[i].id}> `
      );
    } else {
      topLevel.push(
        `  ${i + 1}) ${DesignConfig.guildEmojis.exp}   ${
          users[i].levels.level
        } • <@${users[i].id}> `
      );
    }
  }

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.purple)
    .setTitle('✨ Топ путешественников ✨')
    .setThumbnail(
      'https://media.discordapp.net/attachments/836998525329473576/1075634728918585394/AnyConv.com__3F3F3F3F3F3F3F3F3F3F3F53.png'
    )
    .setDescription(
      `**Ранг приключений:**
${topLevel.join('\n')}

**Эрис ${DesignConfig.guildEmojis.eris}:**
${toperis.join('\n')}`
    )
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral })
    .catch((err) => console.log(err));
};

export default command;
