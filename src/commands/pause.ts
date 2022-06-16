import { BaseCommandInteraction, GuildMember, VoiceBasedChannel } from "discord.js";
import { Command } from "../interfaces/command";

export const Pause: Command = {
    name: 'pause',
    description: 'pause` to pause the playback at its current position',
    execute(interaction: BaseCommandInteraction, channel: VoiceBasedChannel) {
        // const channel = (interaction.member as GuildMember).voice.channel;
        if (!channel) return;
        const player = global.mediaPlayers.get(channel.id);
        console.log(player)
        if (player) {
            player.pause();
            interaction.reply({ content: "Pausing. Use !resume to resume playing", ephemeral: true })
        } else {
            interaction.reply({ content: 'Nothing to pause', ephemeral: true });
        }
    },
};
