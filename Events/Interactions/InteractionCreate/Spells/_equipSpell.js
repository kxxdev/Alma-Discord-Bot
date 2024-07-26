import { EmbedBuilder } from 'discord.js';
import UserSpells from '../../../../Models/UsersSpels/UserSpells.js';

import activeSpellsCommand from '../../../../Commands/UserStats/Spells/_activeSpells.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const equipSpell = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { member } = interaction;

  // Вносим в интеракцию информацию о вызове.
  interaction.executeType = 'interactionCreate';

  // Получаем заклинания пользователя.
  const userSpells = await UserSpells.get({ userId: member.id });

  // Получаем значения нажатой кнопки.
  const spellId = interaction.values[0];

  // Свапаем заклинание.
  await userSpells.swapSpell({ id: spellId });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.spells)
    .setTitle(
      `${DesignConfig.guildEmojis.spells} Замена заклинания ${DesignConfig.guildEmojis.spells}`
    )
    .setDescription(
      `
Вы успешно активировали/деактивировали заклинание! ${DesignConfig.emojis.success}
`
    )
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Выводим сообщения.
  await interaction
    .reply({
      ephemeral: true,
      components: [],
      embeds: [embed],
    })
    .catch((err) => console.log(err));

  await activeSpellsCommand(interaction);
};

export default equipSpell;
