import {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { user, member } = interaction;
  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setTitle(
      `${DesignConfig.guildEmojis.shop} Инвентарь магазина ${DesignConfig.guildEmojis.shop}`
    )
    .setDescription(
      `
Выберите, что вы хотите посмотреть
    `
    )
    .setColor(DesignConfig.colors.shop)
    .setThumbnail(member.displayAvatarURL())
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Создаем селект меню.
  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`storeInventory-${user.id}`)
      .setPlaceholder(`${DesignConfig.emojis.profile} Витрина..`)
      .addOptions(
        {
          label: 'Карточки профиля',
          description:
            'Уникальные карточки вашего профиля, каждая карточка добавляет вам цветную роль',
          value: 'profile-backgrounds',
          emoji: DesignConfig.guildEmojis.shop,
        },
        {
          label: 'Рамки профиля',
          description: 'Уникальные рамки для вашего профиля',
          value: 'profile-frames',
          emoji: DesignConfig.guildEmojis.shop,
        },
        {
          label: 'Рамки аватара',
          description: 'Уникальные рамки для аватара вашего профиля',
          value: 'profile-shadows',
          emoji: DesignConfig.guildEmojis.shop,
        }
      )
  );

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], components: [row], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
