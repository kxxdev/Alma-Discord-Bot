import {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import Guild from '../../../Models/Guilds/Guild.js';
import User from '../../../Models/Users/User.js';

import colors from '../../../Config/colors.json' assert { type: 'json' };

const command = async (interaction) => {
  const { user, guild, member, channel } = interaction;

  // Загружаем экземпляр класса гильдии.
  const guildDb = await new Guild().get({ id: guild.id });
  const ephemeral = channel.id != guildDb.channels.spam.id;

  // Загружаем экземпляр пользователя.
  const userDb = await new User().get({ id: member.id, guildId: guild.id });

  // Получаем текущее оружие.
  const weapon = await userDb.getActiveWeapon();

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setTitle('Рюкзак')
    .setDescription(
      `
Текущее оружие: 
**${weapon.name}** (${weapon.type}) Звездность: ${weapon.level}
Урон: ${weapon.damage}
Цена: ${weapon.price}
    `
    )
    .setColor(Number(colors.default))
    .setThumbnail(member.displayAvatarURL())
    .setImage(colors.footerURL);

  // Создаем селект меню.
  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`inventory-${user.id}`)
      .setPlaceholder('Рюкзак..')
      .addOptions({
        label: 'Оружия',
        description: 'Все ваши оружия',
        value: 'inventory-weapons',
        emoji: '1169666624031293551',
      })
  );

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], components: [row], ephemeral })
    .catch((err) => console.log(err));
};

export default command;
