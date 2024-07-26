import { EmbedBuilder } from 'discord.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const resetAttributesCancel = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, channel } = interaction;

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.perks)
    .setTitle(
      `${DesignConfig.guildEmojis.perks} Сброс характеристик ${DesignConfig.guildEmojis.perks}`
    )
    .setDescription(
      `
Вы отменили сброс характеристик.
`
    )
    .setImage(DesignConfig.footer.greyLineURL);

  // Создаем переменную для проверки эфермальности сообщения.
  const ephemeral = channel.id != client.channelsConfig.spamChannelId;

  // Выводим сообщения.
  await interaction
    .update({
      ephemeral,
      components: [],
      embeds: [embed],
    })
    .catch((err) => console.log(err));
};

export default resetAttributesCancel;
