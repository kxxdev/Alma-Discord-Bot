import {
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
} from 'discord.js';

import User from '../../../Models/Users/User.js';
import colors from '../../../Config/colors.json' assert { type: 'json' };

const event = async (interaction) => {
  const { member, guild } = interaction;

  if (interaction.customId != `shopinventory-${member.id}`)
    return await interaction
      .reply({
        content: 'Это не ваш инвентарь!',
        ephemeral: true,
      })
      .catch((err) => console.log(err));

  // Получаем значения нажатой кнопки.
  const selected = interaction.values[0];

  const embedMain = new EmbedBuilder();
  const row = new ActionRowBuilder();

  const userDb = await new User().get({ id: member.id, guildId: guild.id });
  const userShopInventory = await userDb.getShopInventory({ type: selected });

  if (selected === 'profile-backgrounds') {
    // Создаем эмбед с основным текстом.
    embedMain
      .setColor(Number(colors.default))
      .setImage('https://i.imgur.com/EbcNZBA.png')
      .setTitle('Карточки профиля')
      .setDescription(`${colors.gsEmoji} Что вы хотите надеть?`);

    // Создаем селект меню.
    row.addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('profile-cards-message-backgrounds')
        .setPlaceholder('Витрина..')
        .addOptions(userShopInventory)
    );
  }

  else if (selected === 'profile-frames') {
    // Создаем эмбед с основным текстом.
    embedMain
      .setColor(Number(colors.default))
      .setImage('https://i.imgur.com/EbcNZBA.png')
      .setTitle('Рамки профиля')
      .setDescription(`${colors.gsEmoji} Что вы хотите надеть?`);

    // Создаем селект меню.
    row.addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('profile-cards-message-frames')
        .setPlaceholder('Витрина..')
        .addOptions(userShopInventory)
    );
  }

  else if (selected === 'profile-shadows') {
    // Создаем эмбед с основным текстом.
    embedMain
      .setColor(Number(colors.default))
      .setImage('https://i.imgur.com/EbcNZBA.png')
      .setTitle('Рамки аватара')
      .setDescription(`${colors.gsEmoji} Что вы хотите надеть?`);

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

export default event;
