import {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
} from 'discord.js';
import AttributesConfig from '../../../Config/attributes-config.js';

const selectPerkForUpgrade = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { member } = interaction;

  // Получаем значения выбранного пункта select menu.
  const selected = interaction.values[0];

  // Создаем модальное окно.
  const modal = new ModalBuilder()
    .setCustomId(`upgradeAttributesModal-${member.id}-${selected}`)
    .setTitle(`✨ Улучшение характеристик ✨`);

  // Создаем компоненты для модального окна.
  const upgradeInput = new TextInputBuilder()
    .setCustomId(`perkUpgrade-${member.id}`)
    .setLabel(`${AttributesConfig.AttributesNames[selected]}`)
    .setStyle(TextInputStyle.Short)
    .setValue('0');

  // Создаем строки действия.
  const actionRow = new ActionRowBuilder().addComponents(upgradeInput);

  // Добавляем строки в модальное окно.
  modal.addComponents(actionRow);

  await interaction.showModal(modal);
};

export default selectPerkForUpgrade;
