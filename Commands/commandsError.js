import { EmbedBuilder } from 'discord.js';

const commandChannelDM = async (interaction) => {
  // Получаем конфигурацию дизайна.
  const designConfig = interaction.client.designConfig;

  // Создаем эмбед-ответ.
  const embed = new EmbedBuilder()
    .setDescription(
      `**Эта команда не предназначена для моей лички 😓** 
      
      Мои команды лучше писать тут — <#${interaction.client.channelsConfig.spamChannelId}>`
    )
    .setColor(Number(designConfig.error))
    .setImage(designConfig.footerURL);

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
      
      Что-то не могу выполнить команду, обратитесь за помощью в <#${interaction.client.channelsConfig.helpChannelId}>`
    )
    .setColor(Number(designConfig.error))
    .setImage(designConfig.footerURL);

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
