import { MessageContextMenuCommandInteraction, VoiceBasedChannel } from "discord.js";
import { Command } from "../interfaces/command";

export const Help: Command = {
    name: 'help',
    description: '`/help` to list all commands',
    execute(interaction: MessageContextMenuCommandInteraction, channel: VoiceBasedChannel) {
        interaction.reply(global.commandHelp);
    },
};
