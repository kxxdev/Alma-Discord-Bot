return;

import { EmbedBuilder, PermissionFlagsBits, StringSelectMenuBuilder, ActionRowBuilder, SlashCommandBuilder } from'discord.js';

const gs = '<:green:1072353757007986750>';
const ps = '<:pink:1072353875958444082>';

export default {
    data: new SlashCommandBuilder()
        .setName('createpers')
        .setDescription('Создать сообщение с персонажами.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const { channel } = interaction;
        // Создаем эмбед с изображением.
        const embedImage = new EmbedBuilder()
            .setColor(0x2F3136)
            .setImage('https://media.discordapp.net/attachments/836998525329473576/1076482137169088512/6.png?width=1006&height=412')

        // Создаем эмбед с основным текстом.
        const embedMain = new EmbedBuilder()
            .setColor(0x2F3136)
            .setImage('https://i.imgur.com/EbcNZBA.png')
            .setTitle('Руководство по прокачке и возвышению персонажей')
            .setDescription(`${gs} Выберите стихию`)

        // Создаем селект меню.
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('pers-message')
                    .setPlaceholder('Выбрать стихию..')
                    .addOptions(
                        {
                            label: 'Анемо',
                            description: 'Персонажи анемо стихии.',
                            value: 'anemo',
                            emoji: '1074481950166876213'
                        },
                        {
                            label: 'Гео',
                            description: 'Персонажи гео стихии.',
                            value: 'geo',
                            emoji: '1074481958240927744'
                        },
                        {
                            label: 'Электро',
                            description: 'Персонажи электро стихии.',
                            value: 'electro',
                            emoji: '1074481956810653837'
                        },
                        {
                            label: 'Дендро',
                            description: 'Персонажи дендро стихии.',
                            value: 'dendro',
                            emoji: '1074481954356990003'
                        },
                        {
                            label: 'Гидро',
                            description: 'Персонажи гидро стихии.',
                            value: 'gidro',
                            emoji: '1074481959964770415'
                        },
                        {
                            label: 'Пиро',
                            description: 'Персонажи пиро стихии.',
                            value: 'piro',
                            emoji: '1074481962045145188'
                        },
                        {
                            label: 'Крио',
                            description: 'Персонажи крио стихии.',
                            value: 'crio',
                            emoji: '1074481952712839239'
                        },
                    ),
            );

        // Выводим сообщения.
        await channel.send({ embeds: [embedImage, embedMain], components: [row] }).catch(err => console.log(err));

        // Отправляем ответ.
        interaction.reply({
            content: 'Сообщение отправлено.',
            ephemeral: true,
        })
    },
}