import { Command } from "../interfaces/command";

export const Resume: Command = {
    name: '/resume',
    description: 'resume` to resume playback',
    execute(msg, args) {
        const channel = msg.member?.voice.channel;
        if (!channel) return;
        const player = global.mediaPlayers.get(channel.id);
        if (player && !player.isPlaying) {
            player.setLastRequest(msg);
            player.resume();
            msg.reply("Resuming")
        } else {
            msg.reply('Nothing to resume');
        }
    },
};
