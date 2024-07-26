import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
} from 'discord.js';

import UserAttributes from '../../../Models/UsersAttributes/UserAttributes.js';
import AttributesConfig from '../../../Config/attributes-config.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, channel, member } = interaction;

  // Загружаем экземпляр атрибутов пользователя.
  const userAttributes = await UserAttributes.get({ userId: member.id });

  // Создаем опции для селект меню.
  const selectMenuOptions = [
    {
      label: `${AttributesConfig.AttributesNames.STR}`,
      description: `Улучшить силу`,
      value: `STR`,
    },
    {
      label: `${AttributesConfig.AttributesNames.DEX}`,
      description: `Улучшить ловкость`,
      value: `DEX`,
    },
    {
      label: `${AttributesConfig.AttributesNames.CON}`,
      description: `Улучшить телосложение`,
      value: `CON`,
    },
    {
      label: `${AttributesConfig.AttributesNames.INT}`,
      description: `Улучшить интеллект`,
      value: `INT`,
    },
    {
      label: `${AttributesConfig.AttributesNames.WIS}`,
      description: `Улучшить мудрость`,
      value: `WIS`,
    },
    {
      label: `${AttributesConfig.AttributesNames.CHA}`,
      description: `Улучшить харизму`,
      value: `CHA`,
    },
  ];

  // Создаем селект меню.
  const selectMenu = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`selectPerk-${member.id}`)
      .setPlaceholder(`${DesignConfig.emojis.perks} Выбрать характеристику..`)
      .addOptions(selectMenuOptions)
  );

  const embed = new EmbedBuilder()
    .setTitle(
      `${DesignConfig.guildEmojis.perks} Улучшение характеристик ${DesignConfig.guildEmojis.perks}`
    )
    .setDescription(
      `
Доступно: \`${userAttributes.availablePoints}\` очков
`
    )
    .setColor(DesignConfig.colors.perks)
    .setThumbnail(member.displayAvatarURL())
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Создаем переменную для проверки эфермальности сообщения.
  const ephemeral = channel.id != client.channelsConfig.spamChannelId;

  // Возвращаем ответ.
  await interaction
    .reply({
      embeds: [embed],
      components: [selectMenu],
      ephemeral: false,
    })
    .catch((err) => console.log(err));
};

export default command;
