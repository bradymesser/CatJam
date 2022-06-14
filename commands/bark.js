// const MediaPlayer = require('../classes/MediaPlayer');
import MediaPlayer from "../classes/MediaPlayer.js";


export default {
    name: '!join',
    description: '`!join` to have the bot join',
    execute(msg, args) {
        const channel = msg.member.voiceChannel;
        if (!channel) {
            msg.reply('Join a channel first')
        }
        if (global.mediaPlayers.has(channel.id)) {
            const q = global.mediaPlayers.get(channel.id);
            q.bark(msg);
        } else {
            const q = new MediaPlayer(channel);
            q.bark(tempUrl, msg);
            global.mediaPlayers.set(channel.id, q);
        }
    },
};
