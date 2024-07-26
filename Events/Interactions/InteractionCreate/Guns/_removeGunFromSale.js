import { EmbedBuilder } from 'discord.js';
import GunSales from '../../../../Models/GunSales/GunSales.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
import { CommandCustomError } from '../../../../Commands/CommandsError.js';
const DesignConfig = GetDesignConfig();

const removeGunFromSale = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { member } = interaction;

  // Получаем разделители команды.
  const interactionValues = interaction.customId?.split('-');

  // Получаем запись из торговой площадки.
  const gunSellsDb = await GunSales.get({ uniqId: interactionValues[2] });

  // Если оружие не было найдено.
  if (!gunSellsDb.id) {
    CommandCustomError(
      interaction,
      'Ошибка! Не удалось найти такое оружие на торговой площадке, обратитесь к божествам.'
    );

    return await interaction.message.delete().catch();
  }

  await gunSellsDb.delete();

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.guns)
    .setTitle(
      `${DesignConfig.guildEmojis.gun} Продажа оружия ${DesignConfig.guildEmojis.gun}`
    )
    .setDescription(`Оружие снято с продажи.`)
    .setThumbnail(member.displayAvatarURL())
    .setImage(DesignConfig.footer.greyLineURL);

  await interaction.message.delete().catch();

  // Выводим сообщения.
  await interaction
    .reply({
      ephemeral: true,
      embeds: [embed],
    })
    .catch((err) => console.log(err));
};

export default removeGunFromSale;
