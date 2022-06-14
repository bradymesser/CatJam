import { Command } from "../interfaces/command";

export const Help: Command = {
    name: '!help',
    description: '`!help` to list all commands',
    execute(msg, args) {
        msg.reply(globalThis.commandHelp);
    },
};
