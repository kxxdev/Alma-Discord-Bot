import {
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
} from 'discord.js';
import User from '../../../Models/Users/User.js';

import shopConfig from '../../../Config/shop-config.json' assert { type: 'json' };
import { CommandCustomError } from '../../../Commands/CommandsError.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const shopMessage = async (interaction) => {
  // Записываем выбранное значение.
  const selected = interaction.values[0];

  // Если инвентарь пуст
  if (selected === 'none') {
    return CommandCustomError(interaction, 'Ваш инвентарь магазина пуст..');
  }

  // Получаем данные с интеракции.
  const { guild, member } = interaction;

  // Загружаем экземпляр пользователя.
  const userDb = await User.get({ id: member.id, guildId: guild.id });

  // Создаем необходимые перменные.
  const embedMain = new EmbedBuilder();
  const row = new ActionRowBuilder();

  // Проверяем было ли это основное сообщение с магазином и выбор карточек профиля.
  if (
    interaction.customId === 'shop-message' &&
    selected === 'profile-backgrounds'
  ) {
    // Создаем эмбед с изображением.
    const embedImage = new EmbedBuilder()
      .setColor(DesignConfig.colors.shop)
      .setImage(
        'https://media.discordapp.net/attachments/1005988738016497685/1168551220642861137/ProfileCards-Preview.png?ex=65522d21&is=653fb821&hm=1136031c299ac23162e11ffda75bd29509daf6f400c3c7f72dff2c51dc59cc16&='
      );
    // Создаем эмбед с основным текстом.
    embedMain
      .setColor(DesignConfig.colors.shop)
      .setImage('https://i.imgur.com/EbcNZBA.png')
      .setTitle('Карточки профиля')
      .setDescription(`${DesignConfig.guildEmojis.gs} Что вы хотите купить?`);

    // Создаем селект меню.
    row.addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('profile-cards-message-backgrounds')
        .setPlaceholder('Витрина..')
        .addOptions(
          {
            label: 'Night deer',
            description: 'Карточка профиля ночного оленя',
            value: 'ProfileCard-NightDeer',
            emoji: '1169666285123141773',
          },
          {
            label: 'Ring light',
            description: 'Карточка профиля кольцевого света',
            value: 'ProfileCard-RingLight',
            emoji: '1169666285123141773',
          },
          {
            label: 'Japan red moon',
            description: 'Карточка профиля японской красной луны',
            value: 'ProfileCard-JapanRedMoon',
            emoji: '1169666285123141773',
          },
          {
            label: 'Your name sky',
            description: 'Карточка профиля твое имя',
            value: 'ProfileCard-YourNameSky',
            emoji: '1169666285123141773',
          },
          {
            label: 'Scarlet sunset',
            description: 'Карточка профиля алый закат',
            value: 'ProfileCard-ScarletSunset',
            emoji: '1169666285123141773',
          },
          {
            label: 'River Spirit',
            description: 'Карточка профиля Речного духа',
            value: 'ProfileCard-RiverSpirit',
            emoji: '1169666285123141773',
          },
          {
            label: 'Pink cats',
            description: 'Карточка профиля розовых котиков',
            value: 'ProfileCard-PinkCats',
            emoji: '1169666285123141773',
          },
          {
            label: 'Fullmoon',
            description: 'Карточка профиля полной луны',
            value: 'ProfileCard-Fullmoon',
            emoji: '1169666285123141773',
          },
          {
            label: 'Night Sea',
            description: 'Карточка профиля ночного моря',
            value: 'ProfileCard-Nightsea',
            emoji: '1169666285123141773',
          }
        )
    );

    // Выводим сообщения.
    await interaction
      .reply({
        ephemeral: true,
        embeds: [embedImage, embedMain],
        components: [row],
      })
      .catch((err) => console.log(err));
  }

  // Проверяем было ли это основное сообщение с магазином и выбор рамок профиля.
  else if (
    interaction.customId === 'shop-message' &&
    selected === 'profile-frames'
  ) {
    // Создаем эмбед с изображением.
    const embedImage = new EmbedBuilder()
      .setColor(DesignConfig.colors.shop)
      .setImage(
        'https://media.discordapp.net/attachments/1005988738016497685/1174386909519286354/ProfileFrames-Preview-Page-1.png?ex=6567680a&is=6554f30a&hm=2db93b30f001e756d0d880f7ded0612bce6905fa211aaaa5b6465aa510589cdc&='
      );
    // Создаем эмбед с основным текстом.
    embedMain
      .setColor(DesignConfig.colors.shop)
      .setImage('https://i.imgur.com/EbcNZBA.png')
      .setTitle('Рамки профиля')
      .setDescription(`${DesignConfig.guildEmojis.gs} Что вы хотите купить?`);

    // Создаем селект меню.
    row.addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('profile-cards-message-frames')
        .setPlaceholder('Витрина..')
        .addOptions(
          {
            label: 'Standard',
            description: 'Купить стандартную рамку профиля',
            value: 'ProfileCard-Standart',
            emoji: '1169666285123141773',
          },
          {
            label: 'White',
            description: 'Купить белую рамку профиля',
            value: 'ProfileCard-White',
            emoji: '1169666285123141773',
          },
          {
            label: 'Light Blue',
            description: 'Купить светло-синюю рамку профиля',
            value: 'ProfileCard-LightBlue',
            emoji: '1169666285123141773',
          },
          {
            label: 'Orange',
            description: 'Купить оранжевую рамку профиля',
            value: 'ProfileCard-Orange',
            emoji: '1169666285123141773',
          },
          {
            label: 'Green',
            description: 'Купить зеленую рамку профиля',
            value: 'ProfileCard-Green',
            emoji: '1169666285123141773',
          },
          {
            label: 'Red',
            description: 'Купить красную рамку профиля',
            value: 'ProfileCard-Red',
            emoji: '1169666285123141773',
          },
          {
            label: 'Pink',
            description: 'Купить розовую рамку профиля',
            value: 'ProfileCard-Pink',
            emoji: '1169666285123141773',
          },
          {
            label: 'Blue',
            description: 'Купить синюю рамку профиля',
            value: 'ProfileCard-Blue',
            emoji: '1169666285123141773',
          },
          {
            label: 'Black',
            description: 'Купить черную рамку профиля',
            value: 'ProfileCard-Black',
            emoji: '1169666285123141773',
          }
        )
    );

    // Выводим сообщения.
    await interaction
      .reply({
        ephemeral: true,
        embeds: [embedImage, embedMain],
        components: [row],
      })
      .catch((err) => console.log(err));
  }

  // Проверяем было ли это основное сообщение с магазином и выбор теней профиля.
  else if (
    interaction.customId === 'shop-message' &&
    selected === 'profile-shadows'
  ) {
    // Создаем эмбед с изображением.
    const embedImage = new EmbedBuilder()
      .setColor(DesignConfig.colors.shop)
      .setImage(
        'https://media.discordapp.net/attachments/1005988738016497685/1174386909183750306/ProfileShadows-Preview-Page-1.png?ex=6567680a&is=6554f30a&hm=516852a17f4a7a2f123a245b224c846e19f48171b8aa16e1b016e53085d8fc08&='
      );
    // Создаем эмбед с основным текстом.
    embedMain
      .setColor(DesignConfig.colors.shop)
      .setImage('https://i.imgur.com/EbcNZBA.png')
      .setTitle('Рамки аватара')
      .setDescription(`${DesignConfig.guildEmojis.gs} Что вы хотите купить?`);

    // Создаем селект меню.
    row.addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('profile-cards-message-shadows')
        .setPlaceholder('Витрина..')
        .addOptions(
          {
            label: 'Standard',
            description: 'Купить стандартную рамку аватара',
            value: 'ProfileCard-Standart',
            emoji: '1169666285123141773',
          },
          {
            label: 'Blue',
            description: 'Купить синюю рамку аватара',
            value: 'ProfileCard-Blue',
            emoji: '1169666285123141773',
          },
          {
            label: 'Yellow',
            description: 'Купить желтую рамку аватара',
            value: 'ProfileCard-Yellow',
            emoji: '1169666285123141773',
          },
          {
            label: 'Green',
            description: 'Купить зеленую рамку аватара',
            value: 'ProfileCard-Green',
            emoji: '1169666285123141773',
          },
          {
            label: 'Red',
            description: 'Купить красную рамку аватара',
            value: 'ProfileCard-Red',
            emoji: '1169666285123141773',
          },
          {
            label: 'Orange',
            description: 'Купить оранжевую рамку аватара',
            value: 'ProfileCard-Orange',
            emoji: '1169666285123141773',
          },
          {
            label: 'Pink',
            description: 'Купить розовую рамку аватара',
            value: 'ProfileCard-Pink',
            emoji: '1169666285123141773',
          },
          {
            label: 'Violet',
            description: 'Купить фиолетовую рамку аватара',
            value: 'ProfileCard-Violet',
            emoji: '1169666285123141773',
          },
          {
            label: 'Black',
            description: 'Купить черную рамку аватара',
            value: 'ProfileCard-Black',
            emoji: '1169666285123141773',
          }
        )
    );

    // Выводим сообщения.
    await interaction
      .reply({
        ephemeral: true,
        embeds: [embedImage, embedMain],
        components: [row],
      })
      .catch((err) => console.log(err));
  }

  // Проверяем было ли это основное сообщение с магазином и покупка карточки профиля.
  else if (interaction.customId === 'profile-cards-message-backgrounds') {
    // Получаем карточку профиля.
    const profileCard = shopConfig.backgrounds[selected];

    // Проверяем, есть ли у пользователя такая карточка профиля.
    const checkBackground = await userDb.checkProfileBackground({
      name: selected,
    });
    if (checkBackground) {
      // Устанавливаем карточку в БД.
      await userDb.setProfileCardBackground({ name: selected });

      // Выдаем роль и снимаем остальные.
      await userDb.removeProfileRoles({ member });
      await member.roles
        .add(profileCard.roleId)
        .catch((err) => console.log(err));

      // Выдаем ответ.
      await interaction.reply({
        ephemeral: true,
        content: 'Вы изменили карточку профиля.',
      });
    }

    // Если карточки профиля нет.
    else {
      // Проверяем, хватает ли денег.
      if (userDb.money.eris.value < profileCard.price) {
        return await interaction.reply({
          ephemeral: true,
          content: 'У вас недостаточно эрис',
        });
      }

      // Забираем эрис.
      await userDb.subEris({ num: profileCard.price });

      // Выдаем карточку профиля.
      await userDb.giveProfileCardBackground({ name: selected });

      // Выдаем роль.
      await member.roles
        .add(profileCard.roleId)
        .catch((err) => console.log(err));

      // Выдаем ответ.
      await interaction.reply({
        ephemeral: true,
        content: 'Поздравляем! У вас новая карточка профиля!',
      });
    }
  }

  // Проверяем было ли это основное сообщение с магазином и покупка рамки профиля.
  else if (interaction.customId === 'profile-cards-message-frames') {
    // Получаем карточку профиля.
    const profileCard = shopConfig.frames[selected];

    // Проверяем, есть ли у пользователя такая карточка профиля.
    const checkBackground = await userDb.checkProfileFrames({
      name: selected,
    });
    if (checkBackground) {
      // Устанавливаем карточку в БД.
      await userDb.setProfileCardFrame({ name: selected });

      // Выдаем ответ.
      await interaction.reply({
        ephemeral: true,
        content: 'Вы изменили карточку профиля.',
      });
    }

    // Если карточки профиля нет.
    else {
      // Проверяем, хватает ли денег.
      if (userDb.money.eris.value < profileCard.price) {
        return await interaction.reply({
          ephemeral: true,
          content: 'У вас недостаточно эрис',
        });
      }

      // Забираем эрис.
      await userDb.subEris({ num: profileCard.price });

      // Выдаем карточку профиля.
      await userDb.giveProfileCardFrame({ name: selected });

      // Выдаем ответ.
      await interaction.reply({
        ephemeral: true,
        content:
          'Поздравляем! У вас новая рамка профиля! Теперь вы всегда сможете надеть ее бесплатно в магазине.',
      });
    }
  }

  // Проверяем было ли это основное сообщение с магазином и покупка рамки аватара.
  else if (interaction.customId === 'profile-cards-message-shadows') {
    // Получаем карточку профиля.
    const profileCard = shopConfig.shadows[selected];

    // Проверяем, есть ли у пользователя такая карточка профиля.
    const checkBackground = await userDb.checkProfileShadows({
      name: selected,
    });
    if (checkBackground) {
      // Устанавливаем карточку в БД.
      await userDb.setProfileCardShadow({ name: selected });

      // Выдаем ответ.
      await interaction.reply({
        ephemeral: true,
        content: 'Вы изменили карточку профиля.',
      });
    }

    // Если карточки профиля нет.
    else {
      // Проверяем, хватает ли денег.
      if (userDb.money.eris.value < profileCard.price) {
        return await interaction.reply({
          ephemeral: true,
          content: 'У вас недостаточно эрис',
        });
      }

      // Забираем эрис.
      await userDb.subEris({ num: profileCard.price });

      // Выдаем карточку профиля.
      await userDb.giveProfileCardShadow({ name: selected });

      // Выдаем ответ.
      await interaction.reply({
        ephemeral: true,
        content:
          'Поздравляем! У вас новая рамка аватара! Теперь вы всегда сможете надеть ее бесплатно в магазине.',
      });
    }
  }

  // Если это что-то иное.
  else {
    await interaction
      .reply({
        ephemeral: true,
        content: 'Ой-ой, кажется тут пока ничего нет..',
      })
      .catch((err) => console.log(err));
  }
};

export default shopMessage;
