import { BaseCommandInteraction, VoiceBasedChannel } from "discord.js";
import { Command } from "../interfaces/command";

export const Help: Command = {
    name: 'help',
    description: 'help` to list all commands',
    execute(interaction: BaseCommandInteraction, channel: VoiceBasedChannel) {
        interaction.reply(global.commandHelp);
    },
};
