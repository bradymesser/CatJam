// const MediaPlayer = require('../classes/MediaPlayer');
import { Message } from "discord.js";
import MediaPlayer from "../classes/MediaPlayer";
import { Command } from "../interfaces/command";


export const Join: Command = {
    name: '/join',
    description: 'join` to have the bot join',
    execute(msg: Message, args) {
        const channel = msg.member?.voice.channel;
        if (!channel) {
            msg.reply('Join a channel first');
            return;
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
