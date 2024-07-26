import {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from 'discord.js';
import { Spells } from '../../../../Config/spells-config.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const buySpellsSelect = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, channel, member } = interaction;

  // Получаем id заклинания, которое было выбрано.
  const spellId = interaction.values[0];

  // Ищем заклинание в конфиге.
  const spellConfig = Spells.find((spell) => spell.id === spellId);

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.spells)
    .setTitle(
      `${DesignConfig.guildEmojis.spells} Покупка заклинания ${DesignConfig.guildEmojis.spells}`
    )
    .setDescription(
      `
Вы уверены, что хотите потратить \`${spellConfig.price}\` ${DesignConfig.guildEmojis.manaStones} на покупку заклинания **${spellConfig.id}**?  
`
    )
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Добавляем кнопки
  const accessBuySpellButton = new ButtonBuilder()
    .setCustomId(`accessBuySpellButton-${member.id}-${spellId}`)
    .setLabel(`${DesignConfig.emojis.sell} Купить`)
    .setStyle(ButtonStyle.Success);
  const denieBuySpellButton = new ButtonBuilder()
    .setCustomId(`denieBuySpellButton-${member.id}`)
    .setLabel(`${DesignConfig.emojis.denie} Отмена`)
    .setStyle(ButtonStyle.Danger);
  const row = new ActionRowBuilder().addComponents(
    accessBuySpellButton,
    denieBuySpellButton
  );

  // Создаем переменную для проверки эфермальности сообщения.
  const ephemeral = channel.id != client.channelsConfig.spamChannelId;

  // Выводим сообщения.
  await interaction
    .reply({
      ephemeral,
      components: [row],
      embeds: [embed],
    })
    .catch((err) => console.log(err));
};

export default buySpellsSelect;
