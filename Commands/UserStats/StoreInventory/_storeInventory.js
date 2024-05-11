import {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

const command = async (interaction) => {
  // Получаем конфигурацию дизайна.
  const designConfig = interaction.client.designConfig;

  const { user, member } = interaction;
  // Создаем эмбед.
  const embed = new EmbedBuilder()
    .setTitle('Инвентарь магазина')
    .setDescription(
      `
    Выберите, что вы хотите посмотреть
    `
    )
    .setColor(Number(designConfig.success))
    .setThumbnail(member.displayAvatarURL())
    .setImage(designConfig.footerURL);

  // Создаем селект меню.
  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`storeInventory-${user.id}`)
      .setPlaceholder('Витрина..')
      .addOptions(
        {
          label: 'Карточки профиля',
          description:
            'Уникальные карточки вашего профиля, каждая карточка добавляет вам цветную роль',
          value: 'profile-backgrounds',
          emoji: '1169666624031293551',
        },
        {
          label: 'Рамки профиля',
          description: 'Уникальные рамки для вашего профиля',
          value: 'profile-frames',
          emoji: '1169666624031293551',
        },
        {
          label: 'Рамки аватара',
          description: 'Уникальные рамки для аватара вашего профиля',
          value: 'profile-shadows',
          emoji: '1169666624031293551',
        }
      )
  );

  // Возвращаем ответ.
  await interaction
    .reply({ embeds: [embed], components: [row], ephemeral: true })
    .catch((err) => console.log(err));
};

export default command;
