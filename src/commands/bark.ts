// const MediaPlayer = require('../classes/MediaPlayer');
import { Message } from "discord.js";
import MediaPlayer from "../classes/MediaPlayer";
import { Command } from "../interfaces/command";


export const Bark: Command = {
    name: 'bark',
    description: 'AWF',
    execute(msg: Message, args) {
        const channel = msg.member?.voice.channel;
        if (channel === null || channel === undefined) {
            msg.reply('Join a channel first')
            return;
        }
        if (global.mediaPlayers.has(channel.id)) {
            const q = global.mediaPlayers.get(channel.id);
            q?.playSound('../sounds/lucas_bark.mp3');
        } else {
            const q = new MediaPlayer(channel);
            q?.playSound('../sounds/lucas_bark.mp3');
            global.mediaPlayers.set(channel.id, q);
        }

        const player = global.mediaPlayers.get(channel.id);
        player?.setLastRequest(msg);
        msg.reply(`AWF AWF`)
        if (!player?.isPlaying) {
            player?.start();
        }
    },
};
