import { EmbedBuilder } from 'discord.js';
import Inventory from '../../../../Models/Inventorys/Inventory.js';
import User from '../../../../Models/Users/User.js';
import GunSales from '../../../../Models/GunSales/GunSales.js';
import { CommandCustomError } from '../../../../Commands/CommandsError.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
import guns from '../../../../Config/guns-config.js';
const DesignConfig = GetDesignConfig();

const buyGun = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, guild, channel, member } = interaction;

  // Получаем разделители команды.
  const interactionValues = interaction.customId?.split('-');

  // Проверяем, что автор продажи не является покупателем.
  if (member.id === interactionValues[1]) {
    return CommandCustomError(
      interaction,
      'Вы не можете покупать у самого себя :( Да и зачем?'
    );
  }

  // Получаем инвентарь пользоваеля.
  const inventory = await Inventory.get({
    userId: member.id,
    guildId: guild.id,
  });

  // Получаем инвентарь пользоваеля.
  const inventoryBuyer = await Inventory.get({
    userId: interactionValues[1],
    guildId: guild.id,
  });

  // Получаем пользователя.
  const userDb = await User.get({ id: member.id, guildId: guild.id });

  // Получаем продавца.
  const buyerDb = await User.get({
    id: interactionValues[1],
    guildId: guild.id,
  });

  // Получаем запись из торговой площадки.
  const gunSellsDb = await GunSales.get({ uniqId: interactionValues[2] });

  // Получаем оружие из конфигурации.
  const gunConfig = guns.find((gun) => gun.id === gunSellsDb.id);

  // Если оружие не было найдено.
  if (!gunSellsDb.id) {
    CommandCustomError(
      interaction,
      'Ошибка! Не удалось найти такое оружие на торговой площадке, обратитесь к божествам.'
    );

    return await interaction.message.delete().catch();
  }

  // Проверяем есть ли у пользователя деньги.
  if (userDb.eris < gunSellsDb.price) {
    return await CommandCustomError(
      interaction,
      `У вас недостаточно эрис для покупки. Ваш баланс: ${userDb.eris} эрис. Требуется ${gunSellsDb.price} эрис.`
    );
  }

  // Удаляем оружие у продавца.
  await inventoryBuyer.removeGun({ uniqId: gunSellsDb.uniqId });

  // Списываем деньги у покупателя.
  await userDb.subEris({ num: gunSellsDb.price });

  // Выдаем деньги продавцу.
  await buyerDb.giveEris({ num: gunSellsDb.price });

  // Выдаем оружие покупателю.
  await inventory.giveGun({
    gun: { id: gunSellsDb.id, level: gunSellsDb.level },
  });

  // Удаляем сообщение.
  await interaction.message.delete().catch();

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.success)
    .setTitle(
      `${DesignConfig.guildEmojis.gun} Продажа оружия ${DesignConfig.guildEmojis.gun}`
    )
    .setDescription(
      `Вы успешно купили оружие с торговой площадки! Скорей же проверяй инвентарь!`
    )
    .setThumbnail(member.displayAvatarURL())
    .setImage(DesignConfig.footer.greyLineURL);

  // Создаем переменную для проверки эфермальности сообщения.
  const ephemeral = channel.id != client.channelsConfig.spamChannelId;

  // Выводим сообщения.
  await interaction
    .reply({
      ephemeral,
      embeds: [embed],
    })
    .catch((err) => console.log(err));

  // Создаем эмбед для отправки продавцу.
  const embedBuyer = new EmbedBuilder()
    .setColor(DesignConfig.colors.guns)
    .setTitle(
      `${DesignConfig.guildEmojis.gun} Продажа оружия ${DesignConfig.guildEmojis.gun}`
    )
    .setDescription(
      `Вы успешно продали **${
        gunConfig.levels[gunSellsDb.level - 1].name
      }** на торговой площадке за \`${gunSellsDb.price}\` ${
        DesignConfig.guildEmojis.eris
      }!`
    )
    .setThumbnail(member.displayAvatarURL())
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Ищем пользователя в гильдии.
  const buyer = await guild.members.cache.find(
    (user) => user.id === interactionValues[1]
  );

  // Отправляем сообщение если пользователь найден.
  if (buyer) {
    await buyer.send({ embeds: [embedBuyer] });
  }
};

export default buyGun;
