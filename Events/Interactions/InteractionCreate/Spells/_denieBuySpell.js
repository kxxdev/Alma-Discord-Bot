import { EmbedBuilder } from 'discord.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const denieBuySpell = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, channel } = interaction;

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.error)
    .setTitle(
      `${DesignConfig.guildEmojis.spells} Покупка заклинания ${DesignConfig.guildEmojis.spells}`
    )
    .setDescription(
      `
Вы отменили покупку заклинания ${DesignConfig.emojis.denie}
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

export default denieBuySpell;
