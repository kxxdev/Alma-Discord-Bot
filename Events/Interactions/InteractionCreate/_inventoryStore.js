import {
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
} from 'discord.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

import User from '../../../Models/Users/User.js';

const inventoryStore = async (interaction) => {
  const { member, guild } = interaction;

  // Получаем значения нажатой кнопки.
  const selected = interaction.values[0];

  const embedMain = new EmbedBuilder();
  const row = new ActionRowBuilder();

  const userDb = await User.get({ id: member.id, guildId: guild.id });
  const userShopInventory = await userDb.getShopInventory({ type: selected });

  if (userShopInventory.length === 0) {
    userShopInventory.push({
      label: 'Ваш инвентарь магазина пуст..',
      value: 'none',
      emoji: DesignConfig.emojis.denie,
    });
  }

  if (selected === 'profile-backgrounds') {
    // Создаем эмбед с основным текстом.
    embedMain
      .setColor(DesignConfig.colors.shop)
      .setImage('https://i.imgur.com/EbcNZBA.png')
      .setTitle(
        `${DesignConfig.guildEmojis.shop} Карточки профиля ${DesignConfig.guildEmojis.shop}`
      )
      .setDescription(`${DesignConfig.guildEmojis.gs} Что вы хотите надеть?`);

    // Создаем селект меню.
    row.addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('profile-cards-message-backgrounds')
        .setPlaceholder(`Витрина..`)
        .addOptions(userShopInventory)
    );
  } else if (selected === 'profile-frames') {
    // Создаем эмбед с основным текстом.
    embedMain
      .setColor(DesignConfig.colors.shop)
      .setImage('https://i.imgur.com/EbcNZBA.png')
      .setTitle(
        `${DesignConfig.guildEmojis.shop} Рамки профиля ${DesignConfig.guildEmojis.shop}`
      )
      .setDescription(`${DesignConfig.guildEmojis.gs} Что вы хотите надеть?`);

    // Создаем селект меню.
    row.addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('profile-cards-message-frames')
        .setPlaceholder(`Витрина..`)
        .addOptions(userShopInventory)
    );
  } else if (selected === 'profile-shadows') {
    // Создаем эмбед с основным текстом.
    embedMain
      .setColor(DesignConfig.colors.shop)
      .setImage('https://i.imgur.com/EbcNZBA.png')
      .setTitle(
        `${DesignConfig.guildEmojis.shop} Рамки аватара ${DesignConfig.guildEmojis.shop}`
      )
      .setDescription(`${DesignConfig.guildEmojis.gs} Что вы хотите надеть?`);

    // Создаем селект меню.
    row.addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('profile-cards-message-shadows')
        .setPlaceholder('Витрина..')
        .addOptions(userShopInventory)
    );
  }

  // Выводим сообщения.
  await interaction
    .reply({
      ephemeral: true,
      embeds: [embedMain],
      components: [row],
    })
    .catch((err) => console.log(err));
};

export default inventoryStore;
