export default {
    name: '!stop',
    description: '`!stop` to end playback and destroy the queue',
    execute(msg, args) {
        const channel = msg.member.voiceChannel;
        const player = global.mediaPlayers.get(channel.id);
        if (player) {
            player.setLastRequest(msg);
            player.stop();
        } else {
            msg.reply('Nothing to stop');
        }
    },
};
