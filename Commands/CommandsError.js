import { EmbedBuilder } from 'discord.js';

// Получаем конфигурации.
import { GetDesignConfig } from '../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const CommandChannelDM = async (interaction) => {
  // Создаем эмбед-ответ.
  const embed = new EmbedBuilder()
    .setDescription(
      `**Эта команда не предназначена для моей лички 😓** 
      
      Мои команды лучше писать тут — <#${interaction.client.channelsConfig.spamChannelId}>`
    )
    .setColor(DesignConfig.colors.error)
    .setImage(DesignConfig.footer.greyLineURL);

  // Отвечаем на интеракцию
  await interaction
    .reply({
      ephemeral: true,
      embeds: [embed],
    })
    .catch((err) => console.log(err));
};

const CommandError = async (interaction) => {
  // Создаем эмбед-ответ.
  const embed = new EmbedBuilder()
    .setDescription(
      `**Ой-ой! Кажется у меня в голове путаница..**
      
      Что-то не могу выполнить команду, обратитесь за помощью в <#${interaction.client.channelsConfig.helpChannelId}>`
    )
    .setColor(DesignConfig.colors.error)
    .setImage(DesignConfig.footer.greyLineURL);

  // Отвечаем на интеракцию
  await interaction
    .reply({
      ephemeral: true,
      embeds: [embed],
    })
    .catch((err) => console.log(err));
};

const CommandNotYoursError = async (interaction) => {
  // Создаем эмбед-ответ.
  const embed = new EmbedBuilder()
    .setDescription(`**Ой-ой! Кажется это не ваша кнопка!**`)
    .setColor(DesignConfig.colors.error)
    .setImage(DesignConfig.footer.greyLineURL);

  // Отвечаем на интеракцию
  await interaction
    .reply({
      ephemeral: true,
      embeds: [embed],
    })
    .catch((err) => console.log(err));
};

const CommandCustomError = async (interaction, reason) => {
  // Создаем эмбед-ответ.
  const embed = new EmbedBuilder()
    .setDescription(reason)
    .setColor(DesignConfig.colors.error)
    .setImage(DesignConfig.footer.greyLineURL);

  // Отвечаем на интеракцию
  await interaction
    .reply({
      ephemeral: true,
      embeds: [embed],
    })
    .catch((err) => console.log(err));
};

export {
  CommandChannelDM,
  CommandError,
  CommandCustomError,
  CommandNotYoursError,
};
