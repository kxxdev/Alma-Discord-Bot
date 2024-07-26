import { EmbedBuilder } from 'discord.js';
import UserSpells from '../../../../Models/UsersSpels/UserSpells.js';
import { Spells } from '../../../../Config/spells-config.js';
import { CommandCustomError } from '../../../../Commands/CommandsError.js';

import { GetDesignConfig } from '../../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const accessBuySpell = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, channel, member } = interaction;

  // Получаем заклинания пользователя.
  const userSpells = await UserSpells.get({ userId: member.id });

  // Получаем разделители команды.
  const interactionValues = interaction.customId?.split('-');

  // Получаем id заклинания, которое было выбрано.
  const spellId = interactionValues[2];

  // Ищем заклинание в конфиге.
  const spellConfig = Spells.find((spell) => spell.id === spellId);

  // Проверяем есть ли такое заклинание у пользователя.
  const userSpell = userSpells.spells.find((spell) => spell.id === spellId);

  // Проверяем достаточно ли у пользователя мана-камней.
  if (userSpells.manaStones < spellConfig.price * 3 * (userSpell.level + 1)) {
    return CommandCustomError(
      interaction,
      `У вас недостаточно мана-камней для улучшения этого заклинания. Необходимо ${
        spellConfig.price * 3 * (userSpell.level + 1)
      }, у вас есть ${userSpells.manaStones}.`
    );
  }

  // Проверяем не превышает ли заклинание допустимый максимум.
  if (userSpell.level >= spellConfig.levels.length) {
    return CommandCustomError(
      interaction,
      `Это заклинание уже максимального уровня.`
    );
  }

  // Списываем мана-камни.
  await userSpells.subManaStones({
    num: spellConfig.price * 3 * (userSpell.level + 1),
  });

  // Выдаем заклинание.
  await userSpells.buySpell({ id: spellId });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.success)
    .setTitle(
      `${DesignConfig.guildEmojis.spells} Улучшение заклинания ${DesignConfig.guildEmojis.spells}`
    )
    .setDescription(
      `
Поздравляем! Вы успешно улучшили **${spellConfig.id}** ${DesignConfig.guildEmojis.success}
`
    )
    .setImage(client.designConfig.footerGifURL);

  // Создаем переменную для проверки эфермальности сообщения.
  const ephemeral = channel.id != client.channelsConfig.spamChannelId;

  // Выводим сообщения.
  await interaction
    .update({
      ephemeral,
      components: [],
      embeds: [embed],
    })
    .catch((err) => console.log(err));
};

export default accessBuySpell;
