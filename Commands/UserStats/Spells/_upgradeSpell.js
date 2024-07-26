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

  // Записываем с какого индекса считать оружия.
  const minIndex = (page - 1) * 5;

  // Получаем заклинания по номеру страницы.
  const spells = userSpells.spells.slice(minIndex, minIndex + 5);

  // Создаем опции для селект меню.
  const selectMenuOptions = [];

  // Создаем текстовую переменную для сообщения.
  let text = '';

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
    for (let i = 0; i < spells.length; i++) {
      const spell = spells[i];
      const spellConfig = Spells.find((item) => item.id === spell.id);

      if (spell.level + 1 > spellConfig.levels.length) {
        continue;
      }

      // Задаем информацию о заклинаннии.
      let valuesInfo = '';
      if (spellConfig.levels[spell.level + 1].damage) {
        valuesInfo = `${valuesInfo} ${
          DesignConfig.guildEmojis.damage
        } Урон: \`${spellConfig.levels[spell.level + 1].damage}\`\n`;
      }
      if (spellConfig.levels[spell.level + 1].duration) {
        valuesInfo = `${valuesInfo} ${
          DesignConfig.guildEmojis.duration
        } Ходов: \`${spellConfig.levels[spell.level + 1].duration}\`\n`;
      }
      if (spellConfig.levels[spell.level + 1].bonus) {
        valuesInfo = `${valuesInfo} ${
          DesignConfig.guildEmojis.bonus
        } Бонус: \`${spellConfig.levels[spell.level + 1].bonus}\`\n`;
      }

      text = `${text}
**${i + 1}) ${spell.id} | ${SpellsActionTypes[spellConfig.action]}**
Цена улучшения: \`${spellConfig.price * ((spell.level + 1) * 3)}\` ${
        DesignConfig.guildEmojis.manaStones
      }
*${spellConfig.description}*
${valuesInfo}
`;

      // Добавляем спел в селект меню.
      selectMenuOptions.push({
        label: `${i + 1}) ${spell.id} | ${
          SpellsActionTypes[spellConfig.action]
        }`,
        description: `${spellConfig.description}\n`,
        emoji: DesignConfig.guildEmojis.actions[spellConfig.action],
        value: `${spell.id}`,
      });
    }
  }

  // Создаем селект меню.
  const selectMenuSpells = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`upgradeSpellSelect-${member.id}`)
      .setPlaceholder('Улучшить заклинание заклинание..')
      .addOptions(selectMenuOptions)
  );

  // Создаем кнопки
  const spellsButton = new ButtonBuilder()
    .setCustomId(`activeSpells-${member.id}`)
    .setLabel('Мои заклинания')
    .setStyle(ButtonStyle.Success);
  const buttons = new ActionRowBuilder().addComponents(spellsButton);

  // Если это не первая страница.
  if (minIndex != 0) {
    const prevPage = new ButtonBuilder()
      .setCustomId(`upgradeSpellPrev-${member.id}-${page - 1}`)
      .setLabel('◀️')
      .setStyle(ButtonStyle.Secondary);

    buttons.addComponents(prevPage);
  }

  // Если заклинаний больше чем вывелось на страницу.
  if (spells.length > minIndex + 5) {
    const nextPage = new ButtonBuilder()
      .setCustomId(`upgradeSpellNext-${member.id}-${page + 1}`)
      .setLabel('▶️')
      .setStyle(ButtonStyle.Secondary);

    buttons.addComponents(nextPage);
  }

  const embed = new EmbedBuilder()
    .setTitle('✨ Улучшение заклинаний ✨')
    .setDescription(
      `У вас \`${userSpells.manaStones}\` мана-камней.
      
${text}

🔽 Выберите какое заклинание хотите улучшить 🔽`
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
