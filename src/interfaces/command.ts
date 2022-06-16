import { ChatInputApplicationCommandData, Interaction, Message, VoiceBasedChannel } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    // name: string;
    // description: string;
    execute(interaction: Interaction, channel: VoiceBasedChannel): any;
}