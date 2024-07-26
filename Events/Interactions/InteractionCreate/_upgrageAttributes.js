import {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from 'discord.js';
import checkNumber from '../../../Functions/checkNumber.js';
import UserAttributes from '../../../Models/UsersAttributes/UserAttributes.js';
import { CommandCustomError } from '../../../Commands/CommandsError.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const upgradeAttrubutes = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, member } = interaction;

  // Получаем разделители команды.
  const interactionValues = interaction.customId?.split('-');

  // Получаем значения с модального окна.
  const perkUp = checkNumber(
    interaction.fields.getTextInputValue(`perkUpgrade-${member.id}`)
  );

  // Проверяем значения.
  if (perkUp === undefined || perkUp < 1) {
    return await CommandCustomError(
      interaction,
      'Вы ввели неверное значение. Нужно вводить число больше 0.'
    );
  }

  // Получаем пользователя.
  const userAttributes = await UserAttributes.get({ userId: member.id });

  // Проверяем есть ли достаточно атрибутов для улучшения.
  if (userAttributes.availablePoints < perkUp) {
    return await CommandCustomError(
      interaction,
      'У вас недостаточно атрибутов для улучшения характеристик.'
    );
  }

  switch (interactionValues[2]) {
    case 'STR':
      await userAttributes.upgradeAttributes({ STR: perkUp });
      break;
    case 'DEX':
      await userAttributes.upgradeAttributes({ DEX: perkUp });
      break;
    case 'CON':
      await userAttributes.upgradeAttributes({ CON: perkUp });
      break;
    case 'INT':
      await userAttributes.upgradeAttributes({ INT: perkUp });
      break;
    case 'WIS':
      await userAttributes.upgradeAttributes({ WIS: perkUp });
      break;
    case 'CHA':
      await userAttributes.upgradeAttributes({ CHA: perkUp });
      break;
    default:
      return await CommandCustomError(
        interaction,
        'Ошибка улучшения характеристик! Обратитесь к божествам. Не найдено значение перка в переданной интеракции'
      );
  }

  // Создаем кликабельное меню.
  const profileButton = new ButtonBuilder()
    .setCustomId(`profile-${member.id}`)
    .setLabel(`${DesignConfig.emojis.profile}`)
    .setStyle(ButtonStyle.Secondary);
  const upgradeAttrubutesButton = new ButtonBuilder()
    .setCustomId(`attributes-${member.id}`)
    .setLabel(`${DesignConfig.emojis.perks}`)
    .setStyle(ButtonStyle.Secondary);
  const inventoryButton = new ButtonBuilder()
    .setCustomId(`inventory-${member.id}`)
    .setLabel(`${DesignConfig.emojis.inventory}`)
    .setStyle(ButtonStyle.Secondary);
  const activeSpellsButton = new ButtonBuilder()
    .setCustomId(`activeSpells-${member.id}`)
    .setLabel(`${DesignConfig.emojis.spells}`)
    .setStyle(ButtonStyle.Secondary);
  const menu = new ActionRowBuilder().addComponents(
    profileButton,
    upgradeAttrubutesButton,
    inventoryButton,
    activeSpellsButton
  );

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.success)
    .setTitle(
      `${DesignConfig.guildEmojis.perks} Улучшение характеристик ${DesignConfig.guildEmojis.perks}`
    )
    .setDescription(
      `Вы улучшили ваши характеристики! ${DesignConfig.emojis.success}`
    )
    .setImage(DesignConfig.footer.greyLineURL);

  // Выводим сообщения.
  await interaction
    .reply({
      ephemeral: true,
      embeds: [embed],
      components: [menu],
    })
    .catch((err) => console.log(err));
};

export default upgradeAttrubutes;
