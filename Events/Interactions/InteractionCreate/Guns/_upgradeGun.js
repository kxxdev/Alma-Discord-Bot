import { EmbedBuilder } from 'discord.js';
import Inventory from '../../../../Models/Inventorys/Inventory.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const upgradeGun = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, guild, member } = interaction;

  // Получаем значения нажатой кнопки.
  const selected = interaction.values[0];

  const inventory = await Inventory.get({
    userId: member.id,
    guildId: guild.id,
  });

  // Улучшаем оружие.
  const upgradeResultText = await inventory.upgradeGun({ uniqId: selected });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.guns)
    .setTitle(
      `${DesignConfig.guildEmojis.gun} Улучшение оружия ${DesignConfig.guildEmojis.gun}`
    )
    .setDescription(`Результат улучшения: **${upgradeResultText}**`)
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Выводим сообщения.
  await interaction
    .reply({
      ephemeral: true,
      embeds: [embed],
    })
    .catch((err) => console.log(err));
};

export default upgradeGun;
