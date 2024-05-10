const autoThreads = async ({ message, guildDb }) => {
    if (message.channel.id != guildDb.channels.news.id
        && message.channel.id != guildDb.channels.memes.id
        && message.channel.id != guildDb.channels.screenshots.id) return;

    message.startThread({
        name: 'Коментарии',
        autoArchiveDuration: 60 * 24
    }).catch(error => console.log(error));
}

export default autoThreads;