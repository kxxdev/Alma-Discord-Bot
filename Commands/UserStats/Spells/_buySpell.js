import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';
import UserSpells from '../../../Models/UsersSpels/UserSpells.js';
import { Spells, SpellsActionTypes } from '../../../Config/spells-config.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, channel, member } = interaction;

  // Получаем разделители команды.
  const interactionValues = interaction.customId?.split('-') || '1-1-1';

  // Записываем номер страницы.
  const page = Number(interactionValues[2]) || 1;

  // Получение заклинаний.
  const userSpells = await UserSpells.get({ userId: member.id });

  // Получаем все заклинания из конфигурации.
  const spellsConfig = Spells;

  // Записываем с какого индекса считать оружия.
  const minIndex = (page - 1) * 5;

  // Получаем заклинания по номеру страницы.
  const spells = spellsConfig.slice(minIndex, minIndex + 5);

  // Создаем опции для селект меню.
  const selectMenuOptions = [];

  // Создаем текстовую переменную для сообщения.
  let text = '';

  // Если нет оружий на апгрейд записываем в селект меню заглушку.
  if (spells.length === 0) {
    text = 'В мире еще нет магии. Попробуйте как-нибудь в другой раз..';
    selectMenuOptions.push({
      label: `Нет заклинаний..`,
      description: `В мире еще не существует магии..`,
      emoji: DesignConfig.emojis.denie,
      value: `none`,
    });
  }

  // Проходимся по всем оружиям.
  else {
    for (let i = 0; i < spells.length; i++) {
      const spell = spells[i];

      // Задаем информацию о заклинаннии.
      let valuesInfo = '';
      if (spell.levels[0].damage) {
        valuesInfo = `${valuesInfo} ${DesignConfig.guildEmojis.damage} Урон: \`${spell.levels[0].damage}\`\n`;
      }
      if (spell.levels[0].duration) {
        valuesInfo = `${valuesInfo} ${DesignConfig.guildEmojis.duration} Ходов: \`${spell.levels[0].duration}\`\n`;
      }
      if (spell.levels[0].bonus) {
        valuesInfo = `${valuesInfo} ${DesignConfig.guildEmojis.bonus} Бонус: \`${spell.levels[0].bonus}\`\n`;
      }

      text = `${text}
**${i + 1}) ${spell.id} | ${SpellsActionTypes[spell.action]}**
Цена: \`${spell.price}\` ${DesignConfig.guildEmojis.manaStones}
*${spell.description}*
${valuesInfo}
`;

      // Добавляем спел в селект меню.
      selectMenuOptions.push({
        label: `${i + 1}) ${spell.id} | ${SpellsActionTypes[spell.action]}`,
        description: `${spell.description}\n`,
        emoji: DesignConfig.guildEmojis.actions[spell.action],
        value: `${spell.id}`,
      });
    }
  }

  // Создаем селект меню.
  const selectMenuSpells = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`buySpellsSelect-${member.id}`)
      .setPlaceholder(`${DesignConfig.emojis.sell} Купить заклинание..`)
      .addOptions(selectMenuOptions)
  );

  // Создаем кнопки
  const spellsButton = new ButtonBuilder()
    .setCustomId(`activeSpells-${member.id}`)
    .setLabel(`${DesignConfig.emojis.spells} Мои заклинания`)
    .setStyle(ButtonStyle.Success);
  const buttons = new ActionRowBuilder().addComponents(spellsButton);

  // Если это не первая страница.
  if (minIndex != 0) {
    const prevPage = new ButtonBuilder()
      .setCustomId(`buySpellPrev-${member.id}-${page - 1}`)
      .setLabel('◀️')
      .setStyle(ButtonStyle.Secondary);

    buttons.addComponents(prevPage);
  }

  // Если оружий больше чем вывелось на страницу.
  if (spells.length > minIndex + 5) {
    const nextPage = new ButtonBuilder()
      .setCustomId(`buySpellNext-${member.id}-${page + 1}`)
      .setLabel('▶️')
      .setStyle(ButtonStyle.Secondary);

    buttons.addComponents(nextPage);
  }

  const embed = new EmbedBuilder()
    .setTitle(
      `${DesignConfig.guildEmojis.spells} Покупка заклинаний ${DesignConfig.guildEmojis.spells}`
    )
    .setDescription(
      `У вас \`${userSpells.manaStones}\` ${DesignConfig.guildEmojis.manaStones}.
      
${text}

🔽 Выберите какое заклинание хотите купить 🔽`
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
        components: [selectMenuSpells, buttons],
        ephemeral,
      })
      .catch((err) => console.log(err));
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
