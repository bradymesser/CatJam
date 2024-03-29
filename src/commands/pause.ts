import { AudioPlayerStatus } from "@discordjs/voice";
import { MessageContextMenuCommandInteraction, VoiceBasedChannel } from "discord.js";
import { Command } from "../interfaces/command";

export const Pause: Command = {
    name: 'pause',
    requiresVoiceChannel: true,
    description: '`/pause` to pause the playback at its current position',
    execute(interaction: MessageContextMenuCommandInteraction, channel: VoiceBasedChannel) {
        if (!channel) return;
        const player = global.mediaPlayers.get(channel.id);
        if (player && player.getState().status === AudioPlayerStatus.Playing) {
            player.pause();
            interaction.reply({ content: "Pausing. Use /resume to resume playing", ephemeral: true })
        } else {
            interaction.reply({ content: 'Nothing to pause', ephemeral: true });
        }
    },
};
