import { MessageContextMenuCommandInteraction, VoiceBasedChannel } from "discord.js";
import MediaPlayer from "../classes/MediaPlayer";
import { Command } from "../interfaces/command";
import * as path from 'path';


export const Laugh: Command = {
    name: 'laugh',
    description: 'Laugh track',
    requiresVoiceChannel: true,
    execute(interaction: MessageContextMenuCommandInteraction, channel: VoiceBasedChannel) {
        if (channel === null || channel === undefined) {
            interaction.reply({ content: 'Join a channel first', ephemeral: true })
            return;
        }
        if (global.mediaPlayers.has(channel.id)) {
            const q = global.mediaPlayers.get(channel.id);
            q?.playSound(path.resolve(__dirname, "../sounds/laugh.mp3"));
        } else {
            const q = new MediaPlayer(channel, interaction.channel);
            q?.playSound(path.resolve(__dirname, "../sounds/laugh.mp3"));
            global.mediaPlayers.set(channel.id, q);
        }
        interaction.reply({ content: 'Oh we have a comedian huh', ephemeral: true });
    },
};
