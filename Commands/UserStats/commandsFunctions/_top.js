import { EmbedBuilder } from 'discord.js';

import User from '../../../Models/Users/User.js';
import Guild from '../../../Models/Guilds/Guild.js';
import colors from '../../../Config/colors.json' assert { type: 'json' };

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
  const users = await new User().getAllInGuild({ guildId: guild.id });

  const lenght = users.length > 10 ? 10 : users.length;

  // Топ по море.
  users.sort((a, b) => b.money.eris.value - a.money.eris.value);
  const toperis = [];
  for (let i = 0; i < lenght; i++) {
    if (i === 0) {
      toperis.push(
        `**<:Top_Diamond:1169669622115598547>** **<:eris:1169666720852615228>  ${users[i].money.eris.value}** • <@${users[i].id}>`
      );
    } else if (i === 1) {
      toperis.push(
        `**<:Top_Platinum:1169669620555337728>** **<:eris:1169666720852615228>  ${users[i].money.eris.value}** • <@${users[i].id}>`
      );
    } else if (i === 2) {
      toperis.push(
        `**<:Top_Gold:1169669617652859071>** **<:eris:1169666720852615228>  ${users[i].money.eris.value}** • <@${users[i].id}>`
      );
    } else if (i === 3) {
      toperis.push(
        `**<:Top_Silver:1169669615748665344>** **<:eris:1169666720852615228>  ${users[i].money.eris.value}** • <@${users[i].id}>`
      );
    } else if (i === 4) {
      toperis.push(
        `**<:Top_Bronze:1169669612615508040>** **<:eris:1169666720852615228>  ${users[i].money.eris.value}** • <@${users[i].id}>`
      );
    } else if (i === 9) {
      toperis.push(
        `${i + 1}) <:eris:1169666720852615228>  ${
          users[i].money.eris.value
        } • <@${users[i].id}>`
      );
    } else {
      toperis.push(
        `  ${i + 1}) <:eris:1169666720852615228>  ${
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
        `**<:Top_Diamond:1169669622115598547>** **<:exp:1169668013390303303>   ${users[i].levels.level}** • <@${users[i].id}>`
      );
    } else if (i === 1) {
      topLevel.push(
        `**<:Top_Platinum:1169669620555337728>** **<:exp:1169668013390303303>   ${users[i].levels.level}** • <@${users[i].id}>`
      );
    } else if (i === 2) {
      topLevel.push(
        `**<:Top_Gold:1169669617652859071>** **<:exp:1169668013390303303>   ${users[i].levels.level}** • <@${users[i].id}>`
      );
    } else if (i === 3) {
      topLevel.push(
        `**<:Top_Silver:1169669615748665344>** **<:exp:1169668013390303303>   ${users[i].levels.level}** • <@${users[i].id}>`
      );
    } else if (i === 4) {
      topLevel.push(
        `**<:Top_Bronze:1169669612615508040>** **<:exp:1169668013390303303>   ${users[i].levels.level}** • <@${users[i].id}>`
      );
    } else if (i === 9) {
      topLevel.push(
        `${i + 1}) <:exp:1169668013390303303>   ${users[i].levels.level} • <@${
          users[i].id
        }> `
      );
    } else {
      topLevel.push(
        `  ${i + 1}) <:exp:1169668013390303303>   ${
          users[i].levels.level
        } • <@${users[i].id}> `
      );
    }
  }

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(Number(colors.default))
    .setTitle('✨ Топ путешественников ✨')
    .setThumbnail(
      'https://media.discordapp.net/attachments/836998525329473576/1075634728918585394/AnyConv.com__3F3F3F3F3F3F3F3F3F3F3F53.png'
    )
    .setDescription(
      `**Ранг приключений:**
${topLevel.join('\n')}

**Эрис:**
${toperis.join('\n')}`
    )
    .setImage(colors.footerGifURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral })
    .catch((err) => console.log(err));
};

export default command;
