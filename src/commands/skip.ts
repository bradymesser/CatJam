import { MessageContextMenuCommandInteraction, GuildMember, VoiceBasedChannel } from "discord.js";
import { Command } from "../interfaces/command";

export const Skip: Command = {
    name: 'skip',
    description: '`/skip` to skip the current playback',
    execute(interaction: MessageContextMenuCommandInteraction, channel: VoiceBasedChannel) {
        if (!channel) return;
        const player = global.mediaPlayers.get(channel.id);
        if (player) {
            player.skip();
            interaction.reply({ content: "Skipped 🐵", ephemeral: true })
        } else {
            interaction.reply({ content: 'Nothing to skip', ephemeral: true });
        }
    },
};
