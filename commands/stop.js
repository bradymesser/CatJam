module.exports = {
    name: '!stop',
    description: 'Stop',
    execute(msg, args) {
        const channel = msg.member.voiceChannel;
        const isPlaying = channel.playing;

        if (!isPlaying) {
            msg.reply('Nothing is playing');
            return;
        }

        if (channel) {
            channel.stopPlaying();
        } else {
            msg.reply('Join a channel numb nuts');
        }
        msg.reply('Stopping');
    },
};
