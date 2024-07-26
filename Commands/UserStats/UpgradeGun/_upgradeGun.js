import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
} from 'discord.js';

import Inventory from '../../../Models/Inventorys/Inventory.js';
import { CommandCustomError } from '../../CommandsError.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, guild, channel, member } = interaction;

  // Получаем разделители команды.
  const interactionValues = interaction.customId?.split('-') || '1-1-1';

  // Записываем номер страницы.
  const page = Number(interactionValues[2]) || 1;

  // Загружаем инвентарь пользователя.
  const inventory = await Inventory.get({
    userId: member.id,
    guildId: guild.id,
  });

  // Получаем список оружий возможных для улучшения.
  const gunsForUpgrade = inventory.getUpgradeList();

  // Записываем с какого индекса считать оружия.
  const minIndex = (page - 1) * 5;

  // Получаем оружия по номеру страницы.
  const guns = gunsForUpgrade.slice(minIndex, minIndex + 5);

  // Создаем опции для селект меню.
  const selectMenuOptions = [];

  // Если нет оружий на апгрейд записываем в селект меню заглушку.
  if (gunsForUpgrade.length === 0) {
    selectMenuOptions.push({
      label: `Нет доступных для улучшения оружий`,
      description: `Для улучшения у вас должно быть 2 одинаковых оружия одного уровня`,
      emoji: DesignConfig.emojis.denie,
      value: `none`,
    });
  }

  // Если оружия на апгрейд есть заносим их в опции для селект меню
  else {
    for (let i = 0; i < guns.length; i++) {
      const gun = guns[i];
      // Получаем оружие из конфигурации.
      const gunFromConfig = client.gunsConfig.find(
        (item) => item.id === gun.id
      );
      // Если оружие не найдено выдаем ошибку.
      if (!gunFromConfig) {
        throw CommandCustomError(
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
        label: `${
          gunFromLevelConfig.name
        } ${DesignConfig.emojis.textStar.repeat(gun.level)}`,
        description: `${gunFromConfig.rarity}`,
        emoji,
        value: `${gun.uniqId}`,
      });
    }
  }

  // Создаем селект меню.
  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`upgradeGunSelect-${member.id}`)
      .setPlaceholder('Выбрать оружие..')
      .addOptions(selectMenuOptions)
  );

  // Создаем кнопки
  const buttons = new ActionRowBuilder();

  // Если это не первая страница.
  if (minIndex != 0) {
    const prevPage = new ButtonBuilder()
      .setCustomId(`upgradeGunPrev-${member.id}-${page - 1}`)
      .setLabel('◀️')
      .setStyle(ButtonStyle.Secondary);

    buttons.addComponents(prevPage);
  }

  // Если оружий больше чем вывелось на страницу.
  if (inventory.guns.all.length > minIndex + 5) {
    const nextPage = new ButtonBuilder()
      .setCustomId(`upgradeGunNext-${member.id}-${page + 1}`)
      .setLabel('▶️')
      .setStyle(ButtonStyle.Secondary);

    buttons.addComponents(nextPage);
  }

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.guns)
    .setTitle(
      `${DesignConfig.guildEmojis.gun} Улучшение оружия ${DesignConfig.guildEmojis.gun}`
    )
    .setDescription(
      `**Выберите какое оружие вы хотите улучшить.**
		
*У каждого оружия есть свои максимальные уровни улучшения.*`
    )
    .setFooter({ text: `Страница: ${page}` })
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Создаем переменную для проверки эфермальности сообщения.
  const ephemeral = channel.id != client.channelsConfig.spamChannelId;

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], components: [row], ephemeral: false })
    .catch((err) => console.log(err));
};

export default command;
