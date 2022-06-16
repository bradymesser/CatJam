import { BaseCommandInteraction, VoiceBasedChannel } from "discord.js";
import { Command } from "../interfaces/command";

export const Leave: Command = {
    name: 'leave',
    description: 'leave` to disconnect the bot and destroy the queue',
    execute(interaction: BaseCommandInteraction, channel: VoiceBasedChannel) {
        if (!channel) return;
        const player = global.mediaPlayers.get(channel.id);
        if (player) {
            player.leave();
            interaction.reply({ content: "Bye Monke :(", ephemeral: true })
        } else {
            interaction.reply({ content: "Monke could not leave :)", ephemeral: true });
        }
    },
};
