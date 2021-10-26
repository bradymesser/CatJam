const ytdl = require('ytdl-core');
const searchHelper = require('../helpers/yt_search');
const MediaPlayer = require('../classes/MediaPlayer');

module.exports = {
    name: '!play',
    description: 'Play',
    async execute(msg, args) {
        const input = args.join(' ');
        const channel = msg.member.voiceChannel;
        const isValid = ytdl.validateURL(input);
        var tempUrl = input;

        if (!channel) {
            msg.reply('Join a channel numb nuts');
            return;
        }
        // If no argument is supplied
        if (!input) {
            msg.reply('Invalid request');
            return;
        }
        // If the argument is not a valid link, try to search yt for it
        if (!isValid) {
            const result = await searchHelper.searchYT(tempUrl);
            console.log(result);
            if (result.length < 1) {
                msg.reply("Shit be scuffed sometimes idk why it didnt find anything");
                return;
            }
            tempUrl = result[0].url
            if (!ytdl.validateURL(tempUrl)) {
                msg.reply('Could not find any matching videos.');
                return;
            }
        }

        if (global.mediaPlayers.has(channel.id)) {
            const q = global.mediaPlayers.get(channel.id);
            q.add(tempUrl, msg);
        } else {
            const q = new MediaPlayer(channel);
            q.add(tempUrl, msg);
            global.mediaPlayers.set(channel.id, q);
        }
        const player = global.mediaPlayers.get(channel.id);
        player.setLastRequest(msg);
        msg.reply(`Added ${tempUrl} to the queue at position ${player.getPosition(tempUrl)}`)
        if (!player.isPlaying) {
            player.start();
        }
    },
};
