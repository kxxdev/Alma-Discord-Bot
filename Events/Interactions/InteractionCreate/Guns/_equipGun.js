import { EmbedBuilder } from 'discord.js';
import Inventory from '../../../../Models/Inventorys/Inventory.js';

import inventoryCommand from '../../../../Commands/UserStats/Inventory/_inventory.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const equipGun = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { guild, member } = interaction;

  // Вносим в интеракцию информацию о вызове.
  interaction.executeType = 'interactionCreate';

  // Получаем значения нажатой кнопки.
  const selected = interaction.values[0];

  const inventory = await Inventory.get({
    userId: member.id,
    guildId: guild.id,
  });

  // Улучшаем оружие.
  await inventory.equipGun({ uniqId: selected });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.guns)
    .setTitle(
      `${DesignConfig.guildEmojis.gun} Экипировка оружия ${DesignConfig.guildEmojis.gun}`
    )
    .setDescription(`Вы экипировали оружие`)
    .setImage(DesignConfig.footer.greyLineURL);

  // Выводим сообщения.
  await interaction
    .reply({
      ephemeral: true,
      embeds: [embed],
    })
    .catch((err) => console.log(err));

  await inventoryCommand(interaction);
};

export default equipGun;
