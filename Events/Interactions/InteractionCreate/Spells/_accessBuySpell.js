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
  const userSpellIndex = userSpells.spells.findIndex(
    (spell) => spell.id === spellId
  );
  if (userSpellIndex >= 0) {
    return CommandCustomError(
      interaction,
      'У вас уже есть такое заклинание. Вы можете только улучшить его.'
    );
  }

  // Проверяем достаточно ли у пользователя мана-камней.
  if (userSpells.manaStones < spellConfig.price) {
    return CommandCustomError(
      interaction,
      `У вас недостаточно мана-камней для покупки этого заклинания. Необходимо ${spellConfig.price}, у вас есть ${userSpells.manaStones}.`
    );
  }

  // Списываем мана-камни.
  await userSpells.subManaStones({ num: spellConfig.price });

  // Выдаем заклинание.
  await userSpells.buySpell({ id: spellId });

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.success)
    .setTitle(
      `${DesignConfig.guildEmojis.spells} Покупка заклинания ${DesignConfig.guildEmojis.spells}`
    )
    .setDescription(
      `
Поздравляем! Вы успешно изучили **${spellConfig.id}** ${DesignConfig.emojis.success}
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
