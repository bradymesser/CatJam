const ytdl = require('ytdl-core');

module.exports = {
    name: '!play',
    description: 'Play',
    async execute(msg, args) {

        const tempUrl = args[0];
        const channel = msg.member.voiceChannel;
        const isValid = ytdl.validateURL(tempUrl);
        if (!tempUrl) {
            msg.reply('Invalid request');
            return;
        }
        if (!isValid) {
            msg.reply('Invalid URL');
            return;
        }
        if (channel) {
            const connection = await channel.join();
            const stream = ytdl(tempUrl, { filter: 'audioonly' });
            const dispatcher = connection.playStream(stream);
            msg.reply(`Playing ${tempUrl}`);
            dispatcher.on('end', () => {
                channel.leave();
            })
        } else {
            msg.reply('Join a channel numb nuts');
        }
        // connection.play()
    },
};
