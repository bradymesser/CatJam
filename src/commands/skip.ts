import { Command } from "../interfaces/command";

export const Skip: Command = {
    name: '/skip',
    description: 'skip` to skip the current playback',
    execute(msg, args) {
        const channel = msg.member?.voice.channel;
        if (!channel) return;
        const player = global.mediaPlayers.get(channel.id);
        if (player && channel) {
            player.skip();
            msg.reply("Skipped")
        } else {
            msg.reply('Nothing to skip');
        }
    },
};
