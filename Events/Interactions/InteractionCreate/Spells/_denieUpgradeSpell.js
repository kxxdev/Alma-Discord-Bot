import { EmbedBuilder } from 'discord.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const denieUpgradeSpell = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, channel } = interaction;

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.error)
    .setTitle(
      `${DesignConfig.guildEmojis.spells} Улучшение заклинания ${DesignConfig.guildEmojis.spells}`
    )
    .setDescription(
      `
Вы отменили улучшение заклинания ${DesignConfig.emojis.denie}
`
    )
    .setImage(client.designConfig.footerGifURL);

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

export default denieUpgradeSpell;
