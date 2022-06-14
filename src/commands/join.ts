// const MediaPlayer = require('../classes/MediaPlayer');
import MediaPlayer from "../classes/MediaPlayer.js";
import { Command } from "../interfaces/command.js";


export const Join: Command = {
    name: '!join',
    description: '`!join` to have the bot join',
    execute(msg, args) {
        const channel = msg.member.voiceChannel;
        if (!channel) {
            msg.reply('Join a channel first')
        }
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
