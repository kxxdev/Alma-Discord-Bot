import {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from 'discord.js';
import User from '../../../../Models/Users/User.js';
import UserAttributes from '../../../../Models/UsersAttributes/UserAttributes.js';
import AttributesConfig from '../../../../Config/attributes-config.js';
import { CommandCustomError } from '../../../../Commands/CommandsError.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const resetAttributesSucess = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, guild, channel, member } = interaction;

  // Получаем экземпляр пользователя.
  const userDb = await User.get({ id: member.id, guildId: guild.id });
  const userAttributes = await UserAttributes.get({ userId: member.id });

  // Если у пользователя не хватает денег на сброс характеристик.
  if (userDb.money.eris.value < AttributesConfig.resetAttributesPrice) {
    return await CommandCustomError(
      interaction,
      'У вас недостаточно эрис для сброса характеристик.'
    );
  }

  // Снимаем эрис у пользователя.
  await userDb.subEris({ num: AttributesConfig.resetAttributesPrice });
  // Сбрасвыаем характеристики пользователя.
  await userAttributes.resetAttributes();

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
      `${DesignConfig.guildEmojis.perks} Сброс характеристик ${DesignConfig.guildEmojis.perks}`
    )
    .setDescription(
      `
Вы успешно сбросили ваши характеристики ${DesignConfig.emojis.success}
`
    )
    .setImage(DesignConfig.footer.greyLineURL);

  // Создаем переменную для проверки эфермальности сообщения.
  const ephemeral = channel.id != client.channelsConfig.spamChannelId;

  // Выводим сообщения.
  await interaction
    .update({
      ephemeral: false,
      components: [menu],
      embeds: [embed],
    })
    .catch((err) => console.log(err));
};

export default resetAttributesSucess;
