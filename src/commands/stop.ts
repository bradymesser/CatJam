import { MessageContextMenuCommandInteraction, GuildMember, VoiceBasedChannel } from "discord.js";
import { Command } from "../interfaces/command";

export const Stop: Command = {
    name: 'stop',
    description: '`/stop` to end playback and destroy the queue',
    execute(interaction: MessageContextMenuCommandInteraction, channel: VoiceBasedChannel) {
        if (!channel) return;
        const player = global.mediaPlayers.get(channel.id);
        if (player) {
            player.stop();
            interaction.reply({ content: "Stopped.", ephemeral: true })
        } else {
            interaction.reply({ content: 'Nothing to stop', ephemeral: true });
        }
    },
};
