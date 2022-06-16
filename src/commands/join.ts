// const MediaPlayer = require('../classes/MediaPlayer');
import { BaseCommandInteraction, VoiceBasedChannel } from "discord.js";
import MediaPlayer from "../classes/MediaPlayer";
import { Command } from "../interfaces/command";


export const Join: Command = {
    name: 'join',
    description: 'join` to have the bot join',
    execute(interaction: BaseCommandInteraction, channel: VoiceBasedChannel) {
        if (!channel) {
            interaction.reply({ content: 'Join a channel first', ephemeral: true })
            return;
        }
        const player = global.mediaPlayers.get(channel.id) as MediaPlayer;
        if (player) {
            player.leave();
            player.join();
        } else {
            const q = new MediaPlayer(channel);
            global.mediaPlayers.set(channel.id, q);
            q.join();
        }
        interaction.reply({ content: "Hello 🐒" })
    },
};
