const ytdl = require('ytdl-core');
const searchHelper = require('../helpers/yt_search');
require('dotenv').config();


module.exports = {
    name: '!play',
    description: 'Play',
    async execute(msg, args) {
        var tempUrl = args[0];
        const channel = msg.member.voiceChannel;
        const isValid = ytdl.validateURL(tempUrl);

        // If no argument is supplied
        if (!tempUrl) {
            msg.reply('Invalid request');
            return;
        }
        // If the argument is not a valid link, try to search yt for it
        if (!isValid) {
            // search(tempUrl, { maxResults: 1, key: process.env.YT_KEY }, (err, results) => {
            //     console.log(results)
            //     if (err) {
            //         msg.reply(err);
            //     }
            //     if (results.length) {
            //         tempUrl = results[0].link;
            //         console.log(tempUrl)
            //     } else {
            //         tempUrl = null;
            //         msg.reply('No results');
            //     }
            // })
            console.log(await searchHelper.searchYT(tempUrl));
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
