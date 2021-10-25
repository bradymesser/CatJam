const ytdl = require('ytdl-core');
const tempUrl = 'https://www.youtube.com/watch?v=R_uS0aT0bG8'
module.exports = {
    name: '!play',
    description: 'Play',
    async execute(msg, args) {
        msg.reply('Playing');
        const channel = msg.member.voiceChannel;
        const isValid = ytdl.validateURL(tempUrl);
        if (!isValid) {
            msg.reply('Invalid URL');
            return;
        }
        if (channel) {
            const connection = await channel.join();
            const stream = ytdl(tempUrl, { filter: 'audioonly' });
            const dispatcher = connection.playStream(stream);

            dispatcher.on('end', () => {
                channel.leave();

            })
        } else {
            msg.reply('Join a channel numb nuts');
        }
        // connection.play()
    },
};
