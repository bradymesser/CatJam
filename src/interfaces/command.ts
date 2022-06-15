import { ChatInputApplicationCommandData, Message } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    // name: string;
    // description: string;
    execute(msg: Message, args: any): any;
}