import { EmbedBuilder } from 'discord.js';
import AttributesConfig from '../../../Config/attributes-config.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const moreAttributesInfo = async (interaction) => {
  // Получаем свойства из объекта интеракции.
  const { client, channel } = interaction;

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setColor(DesignConfig.colors.perks)
    .setTitle(
      `${DesignConfig.guildEmojis.perks} Ваши характеристики (подробнее) ${DesignConfig.guildEmojis.perks}`
    )
    .setDescription(
      `
**За каждый __уровень__ приклюценца вы получаете:** 
*\`${AttributesConfig.Level.health}\` к максимальному здоровью.
\`${AttributesConfig.Level.regenHealth}\` к восстановлению здоровья в час.
\`${AttributesConfig.Level.mana}\` к максимальной мане.
\`${AttributesConfig.Level.regenMana}\` к восстановлению маны в час.
\`${AttributesConfig.Level.endurance}\` к максимальной выносливости.
\`${AttributesConfig.Level.regenEnd}\` к восстановлению выносливости в час.*

На 10 уровне характеристики вы получите + \`1\` бонус к броскам и далее будете получать по:
**За каждое очко __силы__ вы получаете:**
+ \`${AttributesConfig.STR.buff}\` к броскам от силы.

**За каждое очко __ловкости__ вы получаете:**
+ \`${AttributesConfig.DEX.buff}\` к броскам от ловкости.

**За каждое очко __телосложения__ вы получаете:**
+ \`${AttributesConfig.CON.buff}\` к броскам от телосложения.

**За каждое очко __интеллекта__ вы получаете:**
+ \`${AttributesConfig.INT.buff}\` к броскам от интеллекта.

**За каждое очко __мудрости__ вы получаете:**
+ \`${AttributesConfig.WIS.buff}\` к броскам от мудрости.

**За каждое очко __харизмы__ вы получаете:**
+ \`${AttributesConfig.DEX.buff}\` к броскам от харизмы.

Стартовые значения от стартовых атрибутов не учитываются в бонусах.

**Все дробные значения округляются до целого числа в меньшую сторону**      `
    )
    .setImage(DesignConfig.footer.purpleGifLineURL);

  // Создаем переменную для проверки эфермальности сообщения.
  const ephemeral = channel.id != client.channelsConfig.spamChannelId;

  // Выводим сообщения.
  await interaction
    .reply({
      embeds: [embed],
      ephemeral,
    })
    .catch((err) => console.log(err));
};

export default moreAttributesInfo;
