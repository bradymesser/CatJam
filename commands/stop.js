module.exports = {
    name: '!stop',
    description: 'Stop',
    execute(msg, args) {
        const channel = msg.member.voiceChannel;
        if (channel) {
            channel.voiceChannel.end();
        } else {
            msg.reply('Join a channel numb nuts');
        }
        msg.reply('Stopping');
    },
};
