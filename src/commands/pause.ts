import { Command } from "../interfaces/command";

export const Pause: Command = {
    name: '!pause',
    description: '`!pause` to pause the playback at its current position',
    execute(msg, args) {
        const channel = msg.member.voiceChannel;
        const player = global.mediaPlayers.get(channel.id);
        console.log(player)
        if (player && player.isPlaying) {
            player.setLastRequest(msg);
            player.pause();
            msg.reply("Pausing. Use !resume to resume playing")
        } else {
            msg.reply('Nothing to pause');
        }
    },
};
