import { EmbedBuilder } from 'discord.js';
import colors from '../Config/colors.json' assert { type: 'json' };
import channelsConfig from '../Config/channels-config.json' assert { type: 'json' };

const commandChannelDM = async (interaction) => {
  // Создаем эмбед-ответ.
  const embed = new EmbedBuilder()
    .setDescription(
      `**Эта команда не предназначена для моей лички 😓** 
      
      Мои команды лучше писать тут — <#${channelsConfig.spamChannelId}>`
    )
    .setColor(Number(colors.error))
    .setImage(colors.footerURL);

  // Отвечаем на интеракцию
  await interaction
    .reply({
      ephemeral: true,
      embeds: [embed],
    })
    .catch((err) => console.log(err));
};

const commandError = async (interaction) => {
  // Создаем эмбед-ответ.
  const embed = new EmbedBuilder()
    .setDescription(
      `**Ой-ой! Кажется у меня в голове путаница..**
      
      Что-то не могу выполнить команду, обратитесь за помощью в <#${channelsConfig.helpChannelId}>`
    )
    .setColor(Number(colors.error))
    .setImage(colors.footerURL);

  // Отвечаем на интеракцию
  await interaction
    .reply({
      ephemeral: true,
      embeds: [embed],
    })
    .catch((err) => console.log(err));
};

export default {
  commandChannelDM,
  commandError,
};
