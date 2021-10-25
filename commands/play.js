const ytdl = require('ytdl-core');
const search = require('youtube-search');
require('dotenv').config();

module.exports = {
    name: '!play',
    description: 'Play',
    async execute(msg, args) {
        let tempUrl = args[0];
        const channel = msg.member.voiceChannel;
        const isValid = ytdl.validateURL(tempUrl);

        // If no argument is supplied
        if (!tempUrl) {
            msg.reply('Invalid request');
            return;
        }
        // If the argument is not a valid link, try to search yt for it
        if (!isValid) {
            tempUrl = null;
            search(args[0], { maxResults: 1, key: process.env.YT_KEY }, (err, results) => {
                if (err) {
                    msg.reply(err);
                }
                if (results.length) {
                    tempUrl = results[0].link;
                } else {
                    tempUrl = null;
                    msg.reply('No results');
                }
            })
        }
        if (channel && tempUrl) {
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
