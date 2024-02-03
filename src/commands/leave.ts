import { MessageContextMenuCommandInteraction, VoiceBasedChannel } from "discord.js";
import { Command } from "../interfaces/command";

export const Leave: Command = {
    name: 'leave',
    requiresVoiceChannel: true,
    description: '`/leave` to disconnect the bot and destroy the queue',
    execute(interaction: MessageContextMenuCommandInteraction, channel: VoiceBasedChannel) {
        if (!channel) return;
        const player = global.mediaPlayers.get(channel.id);
        if (player) {
            player.leave();
            interaction.reply({ content: "Bye Monke 🙊", ephemeral: true })
        } else {
            interaction.reply({ content: "Monke could not leave 🐵", ephemeral: true });
        }
    },
};
