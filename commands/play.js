const ytdl = require('ytdl-core');
const searchHelper = require('../helpers/yt_search');


module.exports = {
    name: '!play',
    description: 'Play',
    async execute(msg, args) {
        const input = args[0];
        const channel = msg.member.voiceChannel;
        const isValid = ytdl.validateURL(input);
        var tempUrl = input;

        // If no argument is supplied
        if (!input) {
            msg.reply('Invalid request');
            return;
        }
        // If the argument is not a valid link, try to search yt for it
        if (!isValid) {
            const result = await searchHelper.searchYT(tempUrl);
            tempUrl = result[0].url
            if (!ytdl.validateURL(tempUrl)) {
                msg.reply('Could not find any matching videos.');
                return;
            }
        }

        if (channel) {
            const connection = await channel.join();
            const stream = ytdl(tempUrl, { filter: 'audioonly' });
            const dispatcher = connection.playStream(stream);
            msg.reply(`Playing ${tempUrl}`);
            dispatcher.on('end', () => {
                connection.destroy();
            })
        } else {
            msg.reply('Join a channel numb nuts');
        }
    },
};
