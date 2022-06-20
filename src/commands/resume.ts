import { AudioPlayerStatus } from "@discordjs/voice";
import { BaseCommandInteraction, GuildMember, VoiceBasedChannel } from "discord.js";
import { Command } from "../interfaces/command";

export const Resume: Command = {
    name: 'resume',
    description: '`/resume` to resume playback',
    execute(interaction: BaseCommandInteraction, channel: VoiceBasedChannel) {
        if (!channel) return;
        const player = global.mediaPlayers.get(channel.id);
        if (player && player.getState().status === AudioPlayerStatus.Paused) {
            player.resume();
            interaction.reply({ content: "Resuming 🐵", ephemeral: true })
        } else {
            interaction.reply({ content: 'Nothing to resume', ephemeral: true });
        }
    },
};
