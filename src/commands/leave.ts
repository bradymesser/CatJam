import { Command } from "../interfaces/command";

export const Leave: Command = {
    name: '!leave',
    description: '`!leave` to disconnect the bot and destroy the queue',
    execute(msg, args) {
        const channel = msg.member.voiceChannel;
        const player = global.mediaPlayers.get(channel.id);
        if (player) {
            player.leave();
            global.mediaPlayers.delete(channel.id);
            msg.reply("Bye Monke :(")
        } else {
            msg.reply('Monke cannot leave');
        }
    },
};
