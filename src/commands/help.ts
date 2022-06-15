import { Message } from "discord.js";
import { Command } from "../interfaces/command";

export const Help: Command = {
    name: '/help',
    description: 'help` to list all commands',
    execute(msg: Message, args) {
        msg.reply(global.commandHelp);
    },
};
