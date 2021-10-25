module.exports = {
    name: '!leave',
    description: 'Leave the voice channel and destroy the queue',
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
