module.exports = {
    name: '!play',
    description: 'Play',
    execute(msg, args) {
        msg.reply('Playing');
        console.log(msg.member.voiceChannel)
        msg.member.voiceChannel.join();
    },
};
