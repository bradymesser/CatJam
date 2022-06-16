// const MediaPlayer = require('../classes/MediaPlayer');
import { BaseCommandInteraction, VoiceBasedChannel } from "discord.js";
import MediaPlayer from "../classes/MediaPlayer";
import { Command } from "../interfaces/command";


export const Bark: Command = {
    name: 'bark',
    description: 'AWF',
    execute(interaction: BaseCommandInteraction, channel: VoiceBasedChannel) {
        if (channel === null || channel === undefined) {
            interaction.reply({ content: 'Join a channel first', ephemeral: true })
            return;
        }
        if (global.mediaPlayers.has(channel.id)) {
            const q = global.mediaPlayers.get(channel.id);
            q?.playSound('/home/CatJam/CatJam/src/sounds/lucas_bark.mp3');
        } else {
            const q = new MediaPlayer(channel);
            q?.playSound('/home/CatJam/CatJam/src/sounds/lucas_bark.mp3');
            global.mediaPlayers.set(channel.id, q);
        }
        const player = global.mediaPlayers.get(channel.id);
        console.log(player?.getState());
        interaction.reply(`AWF AWF`);
    },
};
