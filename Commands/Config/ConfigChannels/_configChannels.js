import { EmbedBuilder } from 'discord.js';

import Guild from '../../../Models/Guilds/Guild.js';

import { GetDesignConfig } from '../../../Config/design-config.js';
const DesignConfig = GetDesignConfig();

const command = async (interaction) => {
  const { guild, options } = interaction;

  // Получение переменных из команды.
  const spamChannel = options.getChannel('спам');
  const levelUpChannel = options.getChannel('повышение-уровня');
  const newsChannel = options.getChannel('новости');
  const reportsChannel = options.getChannel('жалобы');
  const feedback = options.getChannel('обратная-связь');
  const happyBirthday = options.getChannel('день-рождения');
  const memes = options.getChannel('мемы');
  const screenshots = options.getChannel('скриншоты');
  const logs = options.getChannel('логи');

  // Получаем экземпляр класса гильдии.
  const guildDb = await new Guild().get({ id: guild.id });

  // Устанавливаем значения.
  if (spamChannel)
    await guildDb.setChannelId({ type: 'spam', id: spamChannel.id });
  if (levelUpChannel)
    await guildDb.setChannelId({ type: 'levelUp', id: levelUpChannel.id });
  if (newsChannel)
    await guildDb.setChannelId({ type: 'news', id: newsChannel.id });
  if (reportsChannel)
    await guildDb.setChannelId({ type: 'reports', id: reportsChannel.id });
  if (feedback)
    await guildDb.setChannelId({ type: 'feedback', id: feedback.id });
  if (happyBirthday)
    await guildDb.setChannelId({ type: 'happyBirthday', id: happyBirthday.id });
  if (memes) await guildDb.setChannelId({ type: 'memes', id: memes.id });
  if (screenshots)
    await guildDb.setChannelId({ type: 'screenshots', id: screenshots.id });
  if (logs) await guildDb.setChannelId({ type: 'logs', id: logs.id });

  // Создаем эмбед-ответ.
  const embed = new EmbedBuilder()
    .setTitle('Текущие каналы')
    .setDescription(
      `
    <#${guildDb?.channels?.spam?.id}> (спам)
    <#${guildDb?.channels?.levelUp?.id}> (повышение уровня)
    <#${guildDb?.channels?.news?.id}> (новости)
    <#${guildDb?.channels?.reports?.id}> (жалобы)
    <#${guildDb?.channels?.feedback?.id}> (обратная связь)
    <#${guildDb?.channels?.happyBirthday?.id}> (дни рождения)
    <#${guildDb?.channels?.memes?.id}> (мемы)
    <#${guildDb?.channels?.screenshots?.id}> (скриншоты)
    <#${guildDb?.channels?.logs?.id}> (логи)
    `
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
