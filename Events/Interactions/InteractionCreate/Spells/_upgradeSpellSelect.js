import {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from 'discord.js';
import { Spells } from '../../../../Config/spells-config.js';
import UserSpells from '../../../../Models/UsersSpels/UserSpells.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const upgradeSpellSelect = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, channel, member } = interaction;

  // Получаем id заклинания, которое было выбрано.
  const spellId = interaction.values[0];

  // Получаем заклинания пользователя.
  const userSpells = await UserSpells.get({ userId: member.id });

  // Ищем заклинание у пользователя.
  const userSpell = userSpells.getSpell({ id: spellId });

  // Ищем заклинание в конфиге.
  const spellConfig = Spells.find((spell) => spell.id === spellId);

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.spells)
    .setTitle(
      `${DesignConfig.guildEmojis.spells} Улучшение заклинания ${DesignConfig.guildEmojis.spells}`
    )
    .setDescription(
      `
Вы уверены, что хотите потратить \`${
        spellConfig.price * 3 * (userSpell.level + 1)
      }\` ${DesignConfig.guildEmojis.manaStones} на улучшение заклинания **${
        spellConfig.id
      }**?  
`
    )
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Добавляем кнопки
  const accessUpgradeSpellButton = new ButtonBuilder()
    .setCustomId(`accessUpgradeSpellButton-${member.id}-${spellId}`)
    .setLabel(`${DesignConfig.emojis.sell} Купить`)
    .setStyle(ButtonStyle.Success);
  const denieUpgradeSpellButton = new ButtonBuilder()
    .setCustomId(`denieUpgradeSpellButton-${member.id}`)
    .setLabel(`${DesignConfig.emojis.denie} Отмена`)
    .setStyle(ButtonStyle.Danger);
  const row = new ActionRowBuilder().addComponents(
    accessUpgradeSpellButton,
    denieUpgradeSpellButton
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

export default upgradeSpellSelect;
