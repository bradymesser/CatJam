module.exports = {
    name: '!skip',
    description: 'Skip',
    execute(msg, args) {
        const channel = msg.member.voiceChannel;
        const player = global.mediaPlayers.get(channel.id);
        if (player) {
            player.setLastRequest(msg);
            player.skip();
            msg.reply("Skipped")
        } else {
            msg.reply('Nothing to skip');
        }
    },
};
