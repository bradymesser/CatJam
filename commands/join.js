// const MediaPlayer = require('../classes/MediaPlayer');
import MediaPlayer from "../classes/MediaPlayer.js";


export default {
    name: '!join',
    description: '`!join` to have the bot join',
    execute(msg, args) {
        const channel = msg.member.voiceChannel;
        const player = global.mediaPlayers.get(channel.id);
        if (player) {
            player.leave();
            player.join();
        } else {
            const q = new MediaPlayer(channel);
            global.mediaPlayers.set(channel.id, q);
            q.join();
        }
    },
};
