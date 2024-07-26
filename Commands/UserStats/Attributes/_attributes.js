import {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from 'discord.js';

import UserAttributes from '../../../Models/UsersAttributes/UserAttributes.js';
import AttributesConfig from '../../../Config/attributes-config.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { client, channel, member } = interaction;

  // Получаем атрибуты пользователя.
  const userAttributes = await UserAttributes.get({ userId: member.id });

  // Обновляем атрибуты.
  await userAttributes.updateStats();

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.perks)
    .setTitle(
      `${DesignConfig.emojis.perks} Ваши характеристики ${DesignConfig.emojis.perks}`
    )
    .setDescription(
      `
${DesignConfig.guildEmojis.health} **Здоровье:** \`${userAttributes.health.value} / ${userAttributes.health.max}\`
${DesignConfig.guildEmojis.mana} **Мана:** \`${userAttributes.mana.value} / ${userAttributes.mana.max}\`
${DesignConfig.guildEmojis.endurance} **Выносливость:** \`${userAttributes.endurance.value} / ${userAttributes.endurance.max}\`
${DesignConfig.guildEmojis.armor} **Броня:** \`${userAttributes.armor.value}\`

*${DesignConfig.guildEmojis.healthRegen} Регенерация здоровья в час: \`${userAttributes.health.regen}\`
${DesignConfig.guildEmojis.manaRegen} Регенерация маны в час: \`${userAttributes.mana.regen}\`
${DesignConfig.guildEmojis.enduranceRegen} Регенерация выносливости в час: \`${userAttributes.endurance.regen}\`*

**Свободных очков: \`${userAttributes.availablePoints}\`**

**${DesignConfig.guildEmojis.gs} ${AttributesConfig.AttributesNames.STR}: \`${userAttributes.STR.value}\` \`+${userAttributes.STR.buff}\`
${DesignConfig.guildEmojis.ps} ${AttributesConfig.AttributesNames.DEX}: \`${userAttributes.DEX.value}\` \`+${userAttributes.DEX.buff}\`
${DesignConfig.guildEmojis.gs} ${AttributesConfig.AttributesNames.CON}: \`${userAttributes.CON.value}\` \`+${userAttributes.CON.buff}\`
${DesignConfig.guildEmojis.ps} ${AttributesConfig.AttributesNames.INT}: \`${userAttributes.INT.value}\` \`+${userAttributes.INT.buff}\`
${DesignConfig.guildEmojis.gs} ${AttributesConfig.AttributesNames.WIS}: \`${userAttributes.WIS.value}\` \`+${userAttributes.WIS.buff}\`
${DesignConfig.guildEmojis.ps} ${AttributesConfig.AttributesNames.CHA}: \`${userAttributes.CHA.value}\` \`+${userAttributes.CHA.buff}\`**
`
    )
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Создаем кликабельное меню.
  const upgradeAttrubutesButton = new ButtonBuilder()
    .setCustomId(`attributes-${member.id}`)
    .setLabel(`${DesignConfig.emojis.update}`)
    .setStyle(ButtonStyle.Success);
  const inventoryButton = new ButtonBuilder()
    .setCustomId(`inventory-${member.id}`)
    .setLabel(`${DesignConfig.emojis.inventory}`)
    .setStyle(ButtonStyle.Secondary);
  const activeSpellsButton = new ButtonBuilder()
    .setCustomId(`activeSpells-${member.id}`)
    .setLabel(`${DesignConfig.emojis.spells}`)
    .setStyle(ButtonStyle.Secondary);
  const menu = new ActionRowBuilder().addComponents(
    upgradeAttrubutesButton,
    inventoryButton,
    activeSpellsButton
  );

  // Добавляем кнопки
  const upgradeAttributesButton = new ButtonBuilder()
    .setCustomId(`upgradeAttributes-${member.id}`)
    .setLabel('Улучшить характеристики')
    .setStyle(ButtonStyle.Success);
  const resetAttributesButton = new ButtonBuilder()
    .setCustomId(`resetAttributes-${member.id}`)
    .setLabel('Сбросить')
    .setStyle(ButtonStyle.Danger);
  const moreAttributesInfo = new ButtonBuilder()
    .setCustomId(`moreAttributesInfo-${member.id}`)
    .setLabel('Подробнее')
    .setStyle(ButtonStyle.Secondary);
  const row = new ActionRowBuilder().addComponents(
    upgradeAttributesButton,
    resetAttributesButton,
    moreAttributesInfo
  );

  // Создаем переменную для проверки эфермальности сообщения.
  const ephemeral = channel.id != client.channelsConfig.spamChannelId;

  // Возвращаем ответ.
  if (interaction.executeType === 'interactionCreate') {
    return await interaction
      .update({
        embeds: [embed],
        components: [menu, row],
        ephemeral,
      })
      .catch(() => {
        interaction.message
          .edit({
            embeds: [embed],
            components: [menu, row],
            ephemeral,
          })
          .catch();
      });
  }

  await interaction
    .reply({
      embeds: [embed],
      components: [menu, row],
      ephemeral: false,
    })
    .catch((err) => console.log(err));
};

export default command;
