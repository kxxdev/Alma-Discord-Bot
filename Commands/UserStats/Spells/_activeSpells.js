import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';
import UserSpells from '../../../Models/UsersSpels/UserSpells.js';
import { SpellsActionTypes } from '../../../Config/spells-config.js';
import { CommandCustomError } from '../../CommandsError.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, channel, member } = interaction;

  // Получаем разделители команды.
  const interactionValues = interaction.customId?.split('-') || '1-1-1';

  // Записываем номер страницы.
  const page = Number(interactionValues[2]) || 1;

  // Получение заклинаний из БД.
  const userSpells = await UserSpells.get({ userId: member.id });

  // Записываем с какого индекса считать оружия.
  const minIndex = (page - 1) * 5;

  // Получения текстового списка заклинаний пользователя.
  const textSpells = userSpells.getSpellsList({
    type: 'active',
  });

  // Создаем опции для селект меню.
  const selectMenuOptions = [];

  // Если у пользователя нет заклинаний ставим заглушку.
  if (userSpells.spells.length === 0) {
    selectMenuOptions.push({
      label: `Нет заклинаний..`,
      description: `Вы не изучили ни одно заклинание`,
      emoji: DesignConfig.emojis.denie,
      value: `none`,
    });
  }

  // Проходимся по всем заклинаниям пользователя.
  else {
    for (let i = 0; i < userSpells.spells.length; i++) {
      const spell = userSpells.spells[i];

      // Получаем заклинание из конфигурации.
      const spellFromConfig = userSpells.getSpellConfig({ id: spell.id });

      // Если заклинание не найдено выдаем ошибку.
      if (!spellFromConfig) {
        throw CommandCustomError(
          interaction,
          'Ошибка! Одно из заклинаний не было найдено в мире, обратитесь к богам за решением проблемы.'
        );
      }

      selectMenuOptions.push({
        label: `${spellFromConfig.id} ${DesignConfig.emojis.textStar.repeat(
          spell.level
        )} | ${SpellsActionTypes[spellFromConfig.action]}`,
        description: `${spellFromConfig.description}\n`,
        emoji: DesignConfig.guildEmojis.actions[spellFromConfig.action],
        value: `${spell.id}`,
      });
    }
  }

  // Создаем селект меню.
  const selectMenuSpells = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`equipSpell-${member.id}`)
      .setPlaceholder(
        `${DesignConfig.emojis.equip} Активировать/деактивировать заклинание..`
      )
      .addOptions(selectMenuOptions)
  );

  // Создаем кнопки
  const upgradeSpellsButton = new ButtonBuilder()
    .setCustomId(`upgradeSpellsButton-${member.id}`)
    .setLabel(`${DesignConfig.emojis.upgrade} Улучшить заклинание`)
    .setStyle(ButtonStyle.Success);
  const buySpellsButton = new ButtonBuilder()
    .setCustomId(`buySpellsButton-${member.id}`)
    .setLabel(`${DesignConfig.emojis.sell} Купить заклинание`)
    .setStyle(ButtonStyle.Success);
  const buttons = new ActionRowBuilder().addComponents(
    upgradeSpellsButton,
    buySpellsButton
  );

  // Если это не первая страница.
  if (minIndex != 0) {
    const prevPage = new ButtonBuilder()
      .setCustomId(`activeSpellsPrev-${member.id}-${page - 1}`)
      .setLabel('◀️')
      .setStyle(ButtonStyle.Secondary);

    buttons.addComponents(prevPage);
  }

  // Если оружий больше чем вывелось на страницу.
  if (userSpells.spells.length > minIndex + 5) {
    const nextPage = new ButtonBuilder()
      .setCustomId(`activeSpellsNext-${member.id}-${page + 1}`)
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
    .setLabel(`${DesignConfig.emojis.inventory}`)
    .setStyle(ButtonStyle.Secondary);
  const activeSpellsButton = new ButtonBuilder()
    .setCustomId(`activeSpells-${member.id}`)
    .setLabel(`${DesignConfig.emojis.update}`)
    .setStyle(ButtonStyle.Success);
  const menu = new ActionRowBuilder().addComponents(
    upgradeAttrubutesButton,
    inventoryButton,
    activeSpellsButton
  );

  const embed = new EmbedBuilder()
    .setTitle(
      `${DesignConfig.guildEmojis.spells} Заклинания ${DesignConfig.guildEmojis.spells}`
    )
    .setDescription(
      `У вас \`${userSpells.manaStones}\` мана-камней.
      
**Ваши активные заклинания (${userSpells.activeSpells.length}/3):**
${textSpells}

🔽 Выберите какое заклинание хотите сделать активным или убрать его из активных 🔽`
    )
    .setColor(DesignConfig.colors.spells)
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
        components: [menu, selectMenuSpells, buttons],
        ephemeral,
      })
      .catch(() => {
        interaction.message
          .edit({
            embeds: [embed],
            components: [menu, selectMenuSpells, buttons],
            ephemeral,
          })
          .catch();
      });
  }

  // Возвращаем ответ.
  await interaction
    .reply({
      embeds: [embed],
      components: [selectMenuSpells, buttons],
      ephemeral: false,
    })
    .catch((err) => console.log(err));
};

export default command;
