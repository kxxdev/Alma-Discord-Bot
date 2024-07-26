import {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';
import Inventory from '../../../../Models/Inventorys/Inventory.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
import { CommandCustomError } from '../../../../Commands/CommandsError.js';
const DesignConfig = GetDesignConfig();

const sellGun = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, guild, channel, member } = interaction;

  // Получаем инвентарь пользоваеля.
  const inventory = await Inventory.get({
    userId: member.id,
    guildId: guild.id,
  });

  // Создаем опции для селект меню.
  const selectMenuOptions = [];

  // Если нет оружий на продажу записываем в селект меню заглушку.
  if (inventory.guns.all.length === 0) {
    selectMenuOptions.push({
      label: `Нет доступных для продажи оружий`,
      description: `Ваш инвентарь с оружиями пустой`,
      value: `none`,
    });
  }

  // Проходимся по всем оружиям.
  else {
    inventory.guns.all.forEach((gun) => {
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
        label: `${
          gunFromLevelConfig.name
        } ${DesignConfig.emojis.textStar.repeat(gun.level)}`,
        description: `${gunFromConfig.rarity}`,
        emoji,
        value: `${gun.uniqId}`,
      });
    });
  }

  // Создаем селект меню.
  const selectMenuGuns = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`sellGunSelect-${member.id}`)
      .setPlaceholder(`${DesignConfig.emojis.gun} Оружие на продажу..`)
      .addOptions(selectMenuOptions)
  );

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.guns)
    .setTitle(
      `${DesignConfig.guildEmojis.gun} Продажа оружия ${DesignConfig.guildEmojis.gun}`
    )
    .setDescription(`Выберите оружие на продажу`)
    .setThumbnail(member.displayAvatarURL())
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Создаем переменную для проверки эфермальности сообщения.
  const ephemeral = channel.id != client.channelsConfig.spamChannelId;

  // Выводим сообщения.
  await interaction
    .reply({
      ephemeral,
      embeds: [embed],
      components: [selectMenuGuns],
    })
    .catch((err) => console.log(err));
};

export default sellGun;
