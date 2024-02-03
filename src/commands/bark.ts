import { MessageContextMenuCommandInteraction, VoiceBasedChannel } from "discord.js";
import MediaPlayer from "../classes/MediaPlayer";
import { Command } from "../interfaces/command";
import * as path from 'path';

export const Bark: Command = {
    name: 'bark',
    description: '`/bark` does what you think it will',
    execute(interaction: MessageContextMenuCommandInteraction, channel: VoiceBasedChannel) {
        if (channel === null || channel === undefined) {
            interaction.reply({ content: 'Join a channel first', ephemeral: true })
            return;
        }
        if (global.mediaPlayers.has(channel.id)) {
            const q = global.mediaPlayers.get(channel.id);
            q?.playSound(path.resolve(__dirname, "../sounds/lucas_bark.mp3"));
        } else {
            const q = new MediaPlayer(channel, interaction.channel);
            q?.playSound(path.resolve(__dirname, "../sounds/lucas_bark.mp3"));
            global.mediaPlayers.set(channel.id, q);
        }
        interaction.reply(`AWF AWF`);
    },
};
