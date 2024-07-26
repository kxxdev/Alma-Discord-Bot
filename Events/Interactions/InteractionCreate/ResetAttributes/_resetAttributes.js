import {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from 'discord.js';
import attConfig from '../../../../Config/attributes-config.js';
import AttributesConfig from '../../../../Config/attributes-config.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const resetAttributes = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, channel, member } = interaction;

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.perks)
    .setTitle(
      `${DesignConfig.guildEmojis.perks} Сброс характеристик ${DesignConfig.guildEmojis.perks}`
    )
    .setDescription(
      `
Вы уверены, что хотите сбросить ваши очки характеристик? 
**Это будет стоить \`${attConfig.resetAttributesPrice.toLocaleString(
        'de-DE'
      )}\` ${DesignConfig.guildEmojis.eris}.**

Вы получите назад все потраченные очки и ваши характеристики будут равны **\`${
        AttributesConfig.minAttributes
      }\`**.
`
    )
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Добавляем кнопки
  const resetAttributesSuccessButton = new ButtonBuilder()
    .setCustomId(`resetAttributesSuccess-${member.id}`)
    .setLabel(`${DesignConfig.emojis.sell} Сбросить характеристики`)
    .setStyle(ButtonStyle.Success);
  const resetAttributesCancelButton = new ButtonBuilder()
    .setCustomId(`resetAttributesCancel-${member.id}`)
    .setLabel(`${DesignConfig.emojis.denie} Отмена`)
    .setStyle(ButtonStyle.Danger);
  const row = new ActionRowBuilder().addComponents(
    resetAttributesSuccessButton,
    resetAttributesCancelButton
  );

  // Создаем переменную для проверки эфермальности сообщения.
  const ephemeral = channel.id != client.channelsConfig.spamChannelId;

  // Выводим сообщения.
  await interaction
    .reply({
      ephemeral: false,
      components: [row],
      embeds: [embed],
    })
    .catch((err) => console.log(err));
};

export default resetAttributes;
