import {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from 'discord.js';
import checkNumber from '../../../../Functions/checkNumber.js';
import GunSales from '../../../../Models/GunSales/GunSales.js';
import GunsConfig from '../../../../Config/guns-config.js';
import { CommandCustomError } from '../../../../Commands/CommandsError.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const sellGunSelectPriceInput = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, member } = interaction;

  // Получаем разделители команды.
  const interactionValues = interaction.customId?.split('-');

  // Получаем запись из торговой площадки.
  const gunSellsDb = await GunSales.get({ uniqId: interactionValues[2] });

  // Если оружие не было найдено.
  if (!gunSellsDb.id) {
    return CommandCustomError(
      interaction,
      'Ошибка! Не удалось найти такое оружие на торговой площадке, обратитесь к божествам.'
    );
  }

  // Получаем значения с модального окна.
  const price = checkNumber(
    interaction.fields.getTextInputValue(`sellGunSelectPriceInput-${member.id}`)
  );

  // Проверяем значения.
  if (price === undefined || price <= 0) {
    await gunSellsDb.delete();
    return await CommandCustomError(
      interaction,
      'Вы ввели неверное значение. Нужно вводить число.'
    );
  }

  // Ищем оружие в конфиге.
  const gunConfig = GunsConfig.find((item) => item.id === gunSellsDb.id);

  // Ищем оружие в конфиге левелов.
  const gunLevelConfig = gunConfig?.levels.find(
    (item) => item.level === gunSellsDb?.level
  );

  // Если не нашлось оружие в конфиге.
  if (!gunConfig || !gunLevelConfig) {
    await gunSellsDb.delete();
    return await CommandCustomError(
      interaction,
      'Такое оружие на найдено в мире. Обратитесь к божествам.'
    );
  }

  // Задаем прайс в БД.
  await gunSellsDb.setPrice(price);

  // Создаем эмбед торговой площадки.
  const embed = new EmbedBuilder()
    .setColor(Number(client.designConfig.default))
    .setTitle('✨ Оружие ✨')
    .setDescription(
      `**${gunLevelConfig.name} ${DesignConfig.emojis.textStar.repeat(
        gunLevelConfig.level
      )}**\nУрон: ${gunLevelConfig.damage}\nРедкость: ${
        gunConfig.rarity
      }\nТип: ${gunConfig.type}
      
**Цена: \`${price.toLocaleString('ru-RU')}\`** эрис`
    )
    .setImage(client.designConfig.footerGifURL);

  // Добавляем кнопки
  const sellGunBuyButton = new ButtonBuilder()
    .setCustomId(`sellGunBuy-${member.id}-${gunSellsDb.uniqId}`)
    .setLabel(`${DesignConfig.emojis.sell} Купить`)
    .setStyle(ButtonStyle.Success);
  const sellGunCancelButton = new ButtonBuilder()
    .setCustomId(`sellGunCancel-${member.id}-${gunSellsDb.uniqId}`)
    .setLabel(`${DesignConfig.emojis.denie} Удалить`)
    .setStyle(ButtonStyle.Danger);
  const buttons = new ActionRowBuilder().addComponents(
    sellGunBuyButton,
    sellGunCancelButton
  );

  // Ищем канал для отправки.
  const saleChannel = await client.channels.cache.find(
    (item) => item.id === client.channelsConfig.salesChannelId
  );

  // Если канал не найден.
  if (!saleChannel) {
    await gunSellsDb.delete();
    return await CommandCustomError(
      interaction,
      'Канал для продаж не задан. Обратитесь к божествам.'
    );
  }

  await saleChannel.send({ embeds: [embed], components: [buttons] });

  // Создаем эмбед ответа.
  const embedReply = new EmbedBuilder()
    .setColor(DesignConfig.colors.guns)
    .setTitle(
      `${DesignConfig.guildEmojis.gun} Продажа оружия ${DesignConfig.guildEmojis.gun}`
    )
    .setDescription(
      `Вы выставили предмет на торговую площадку. Как только оружие будет продано оно пропадет из вашего инвентаря и вы получите эрис на счет.`
    )
    .setImage(DesignConfig.footer.greyLineURL);

  // Выводим сообщения.
  await interaction
    .reply({
      ephemeral: true,
      embeds: [embedReply],
    })
    .catch((err) => console.log(err));
};

export default sellGunSelectPriceInput;
