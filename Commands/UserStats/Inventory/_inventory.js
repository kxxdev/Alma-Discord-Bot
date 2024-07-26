import {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import Inventory from '../../../Models/Inventorys/Inventory.js';
import { CommandCustomError } from '../../CommandsError.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { client, guild, channel, member } = interaction;

  // Получаем разделители команды.
  const interactionValues = interaction.customId?.split('-') || '1-1-1';

  // Записываем номер страницы.
  const page = Number(interactionValues[2]) || 1;

  // Получаем инвентарь пользоваеля.
  const inventory = await Inventory.get({
    userId: member.id,
    guildId: guild.id,
  });

  // Записываем с какого индекса считать оружия.
  const minIndex = (page - 1) * 5;

  // Получаем оружия по номеру страницы.
  const guns = inventory.guns.all.slice(minIndex, minIndex + 5);

  // Создаем опции для селект меню.
  const selectMenuOptions = [];

  // Если нет оружий на апгрейд записываем в селект меню заглушку.
  if (guns.length === 0) {
    selectMenuOptions.push({
      label: `Нет доступных для экипировки оружий`,
      description: `Ваш инвентарь оружия пустой`,
      value: `none`,
    });
  }

  // Проходимся по всем оружиям.
  else {
    for (let i = 0; i < guns.length; i++) {
      const gun = guns[i];

      // Получаем оружие из конфигурации.
      const gunFromConfig = client.gunsConfig.find(
        (item) => item.id === gun.id
      );
      // Если оружие не найдено выдаем ошибку.
      if (!gunFromConfig) {
        return CommandCustomError(
          interaction,
          'Ошибка! Одно из оружий не было найдено в мире, обратитесь к богам за решением проблемы.'
        );
      }

      // Получаем оружием с нужным уровнем из конфигурации.
      let gunFromLevelConfig = gunFromConfig.levels.find(
        (item) => item.level === gun.level
      );
      // Если оружие не найдено выдаем, что это оружия максимально возможного уровня
      if (!gunFromLevelConfig) {
        gunFromConfig = gunFromConfig.levels[gunFromConfig.levels - 1];
      }

      const emoji =
        (i + 1) % 2 === 0
          ? DesignConfig.guildEmojis.ps
          : DesignConfig.guildEmojis.gs;

      selectMenuOptions.push({
        label: `${i + 1}) ${
          gunFromLevelConfig.name
        } ${DesignConfig.emojis.textStar.repeat(gun.level)}`,
        description: `${gunFromConfig.rarity}`,
        emoji,
        value: `${gun.uniqId}`,
      });
    }
  }

  // Создаем селект меню.
  const selectMenuGuns = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`equipGun-${member.id}`)
      .setPlaceholder(`${DesignConfig.emojis.equip} Экипировать оружие..`)
      .addOptions(selectMenuOptions)
  );

  // Создаем кнопки
  const upgradeGunButton = new ButtonBuilder()
    .setCustomId(`upgradeGun-${member.id}`)
    .setLabel(`${DesignConfig.emojis.upgrade} Улучшить оружие`)
    .setStyle(ButtonStyle.Success);
  const sellGunButton = new ButtonBuilder()
    .setCustomId(`sellGun-${member.id}`)
    .setLabel(`${DesignConfig.emojis.sell} Продать оружие`)
    .setStyle(ButtonStyle.Danger);
  const buttons = new ActionRowBuilder().addComponents(
    upgradeGunButton,
    sellGunButton
  );

  // Если это не первая страница.
  if (minIndex != 0) {
    const prevPage = new ButtonBuilder()
      .setCustomId(`inventoryPrev-${member.id}-${page - 1}`)
      .setLabel('◀️')
      .setStyle(ButtonStyle.Secondary);

    buttons.addComponents(prevPage);
  }

  // Если оружий больше чем вывелось на страницу.
  if (inventory.guns.all.length > minIndex + 5) {
    const nextPage = new ButtonBuilder()
      .setCustomId(`inventoryNext-${member.id}-${page + 1}`)
      .setLabel('▶️')
      .setStyle(ButtonStyle.Secondary);

    buttons.addComponents(nextPage);
  }

  // Создаем кликабельное меню.
  const upgradeAttrubutesButton = new ButtonBuilder()
    .setCustomId(`attributes-${member.id}`)
    .setLabel(`${DesignConfig.emojis.perks}`)
    .setStyle(ButtonStyle.Secondary);
  const inventoryButton = new ButtonBuilder()
    .setCustomId(`inventory-${member.id}`)
    .setLabel(`${DesignConfig.emojis.update}`)
    .setStyle(ButtonStyle.Success);
  const activeSpellsButton = new ButtonBuilder()
    .setCustomId(`activeSpells-${member.id}`)
    .setLabel(`${DesignConfig.emojis.spells}`)
    .setStyle(ButtonStyle.Secondary);
  const menu = new ActionRowBuilder().addComponents(
    upgradeAttrubutesButton,
    inventoryButton,
    activeSpellsButton
  );

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setTitle(
      `${DesignConfig.guildEmojis.inventory} Ваш инвентарь ${DesignConfig.guildEmojis.inventory}`
    )
    .setDescription(
      `
**⚔️ В руках: ${inventory.getActiveGunText()}**
    
**⚔️ Оружия:**\n${inventory.getGunsList(minIndex, minIndex + 5)}
`
    )
    .setColor(DesignConfig.colors.inventory)
    .setFooter({ text: `Страница: ${page}` })
    .setThumbnail(member.displayAvatarURL())
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Создаем переменную для проверки эфермальности сообщения.
  const ephemeral = channel.id != client.channelsConfig.spamChannelId;

  // Возвращаем ответ.
  if (interaction.executeType === 'interactionCreate') {
    return await interaction
      .update({
        embeds: [embed],
        components: [menu, selectMenuGuns, buttons],
        ephemeral,
      })
      .catch(() => {
        interaction.message
          .edit({
            embeds: [embed],
            components: [menu, selectMenuGuns, buttons],
            ephemeral,
          })
          .catch();
      });
  }

  // Возвращаем ответ.
  await interaction
    .reply({
      embeds: [embed],
      components: [menu, selectMenuGuns, buttons],
      ephemeral: false,
    })
    .catch((err) => console.log(err));
};

export default command;
