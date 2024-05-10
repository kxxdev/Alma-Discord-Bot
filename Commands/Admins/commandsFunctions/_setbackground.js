import { EmbedBuilder } from 'discord.js';

import User from '../../../Models/Users/User.js';
import colors from '../../../Config/colors.json' assert { type: 'json' };

const command = async (interaction) => {
  const { options, member, guild } = interaction;

  const name = options.getString('name');

  const errEmbed = new EmbedBuilder()
    .setDescription(
      `Ошибка, не найдена карточка профиля. Названия карточек профиля для установки знает только кактус. Платные карточки нельзя установить этой командой.`
    )
    .setColor(Number(colors.error));

  // Получаем пользователя.
  const userDb = await new User().get({ id: member.id, guildId: guild.id });

  // Проверяем карточки и устанавливаем их
  switch (name) {
    case 'cactus0780':
      // Устанавливаем карточку в БД.
      await userDb.setProfileCardBackground({ name: 'ProfileCard-Cactus' });

      // Выдаем роль и снимаем остальные.
      await userDb.removeProfileRoles({ member });
      break;
    case 'Cactus012831':
      // Устанавливаем карточку в БД.
      await userDb.setProfileCardBackground({
        name: 'ProfileCard-Cactus012831',
      });

      // Выдаем роль и снимаем остальные.
      await userDb.removeProfileRoles({ member });
      break;
    case 'Cactus036471726':
      // Устанавливаем карточку в БД.
      await userDb.setProfileCardShadow({
        name: 'ProfileCard-Cactus036471726',
      });

      // Выдаем роль и снимаем остальные.
      await userDb.removeProfileRoles({ member });
      break;
    case 'CactusFrm0293':
      // Устанавливаем карточку в БД.
      await userDb.setProfileCardFrame({
        name: 'ProfileCard-CactusFrm0293',
      });

      // Выдаем роль и снимаем остальные.
      await userDb.removeProfileRoles({ member });
      break;
    default:
      return interaction.reply({ embeds: [errEmbed], ephemeral: true });
  }

  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setDescription(
      `Вы обновили свой профиль ${colors.successEmoji}`
    )
    .setColor(Number(colors.success))
    .setImage(colors.footerURL);

  // Отвечаем на интеракцию
  await interaction.reply({
    ephemeral: true,
    embeds: [embed],
  });
};

export default command;
