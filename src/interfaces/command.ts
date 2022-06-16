import { ChatInputApplicationCommandData, Interaction, Message, VoiceBasedChannel } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    execute(interaction: Interaction, channel: VoiceBasedChannel): any;
}