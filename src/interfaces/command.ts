import { ChatInputApplicationCommandData, Interaction, Message, VoiceBasedChannel } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    requiresVoiceChannel: boolean
    execute(interaction: Interaction, channel?: VoiceBasedChannel | null): any;
}