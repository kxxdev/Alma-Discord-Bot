import { EmbedBuilder } from 'discord.js';

import Guild from '../../../Models/Guilds/Guild.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { options, guild } = interaction;

  // Получение переменных из команды.
  const newsCreator = options.getRole('журналист');
  const human = options.getRole('человек');
  const undead = options.getRole('нежить');
  const forestelf = options.getRole('лесной_эльф');
  const darkelf = options.getRole('темный_эльф');
  const ork = options.getRole('орк');
  const gnome = options.getRole('гном');

  // Получаем экземпляр класса гильдии.
  const guildDb = await new Guild().get({
    id: guild.id,
  });

  // Устанавливаем значения.
  if (newsCreator)
    await guildDb.setRoleId({
      type: 'newsCreator',
      id: newsCreator.id,
    });
  if (human)
    await guildDb.setRoleId({
      type: 'human',
      id: human.id,
    });
  if (undead)
    await guildDb.setRoleId({
      type: 'undead',
      id: undead.id,
    });
  if (forestelf)
    await guildDb.setRoleId({
      type: 'forestelf',
      id: forestelf.id,
    });
  if (darkelf)
    await guildDb.setRoleId({
      type: 'darkelf',
      id: darkelf.id,
    });
  if (ork)
    await guildDb.setRoleId({
      type: 'ork',
      id: ork.id,
    });
  if (gnome)
    await guildDb.setRoleId({
      type: 'gnome',
      id: gnome.id,
    });

  // Создаем эмбед-ответ.
  const embed = new EmbedBuilder()
    .setTitle('Текущие роли')
    .setDescription(
      `
    <@&${guildDb?.roles?.newsCreator?.id}> (журналист)
    <@&${guildDb?.roles?.human?.id}> (человек)
    <@&${guildDb?.roles?.undead?.id}> (нежить)
    <@&${guildDb?.roles?.forestelf?.id}> (лесной эльф)
    <@&${guildDb?.roles?.darkelf?.id}> (темный эльф)
    <@&${guildDb?.roles?.ork?.id}> (орк)
    <@&${guildDb?.roles?.gnome?.id}> (гном)`
    )
    .setColor(DesignConfig.colors.default)
    .setImage(DesignConfig.footer.greyLineURL);

  // Отвечаем на интеракцию
  await interaction.reply({
    ephemeral: true,
    embeds: [embed],
  });
};

export default command;
