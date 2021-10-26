module.exports = {
    name: '!resume',
    description: '`!resume` to resume playback',
    execute(msg, args) {
        const channel = msg.member.voiceChannel;
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
