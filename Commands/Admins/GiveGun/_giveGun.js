import { EmbedBuilder } from 'discord.js';

import Inventory from '../../../Models/Inventorys/Inventory.js';
import { CommandCustomError } from '../../CommandsError.js';

// Получаем конфигурации.
import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  // Получаем конфигурацию.
  const config = interaction.client.config;

  // Получаем конфигурацию оружия.
  const gunsConfig = interaction.client.gunsConfig;

  const { options, guild, member } = interaction;

  // Получаем данные из команды.
  const targetUser = options.getUser('пользователь');
  const itemId = options.getString('id');

  // Ищем оружие в конфигурации.
  const gun = gunsConfig.find((item) => item.id === itemId);

  // Если оружие не найдено выдаем ошибку.
  if (!gun) {
    return CommandCustomError(interaction, 'Оружие с таким id не найдено.');
  }

  // Получаем инвентарь пользоваеля.
  const inventory = await Inventory.get({
    userId: targetUser.id,
    guildId: guild.id,
  });

  // Проверяем, есть ли место в инвентаре.
  if (inventory.guns.length >= config.maxGuns) {
    return CommandCustomError(
      interaction,
      'У пользователя переполнен инвентарь'
    );
  }

  // Выдаем оружие.
  await inventory.giveGun({ gun });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setTitle(
      `${DesignConfig.emojis.gun} Выдача оружия ${DesignConfig.emojis.gun}`
    )
    .setDescription(
      `Пользователю <@${targetUser.id}> было выдано **« ${gun.levels[0].name} »**`
    )
    .setColor(DesignConfig.colors.guns)
    .setThumbnail(targetUser.displayAvatarURL())
    .setImage(DesignConfig.footer.greyLineURL);

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], ephemeral: false })
    .catch((err) => console.log(err));
};

export default command;
