const exportList = require('./index.js');
module.exports = {
    name: '!help',
    description: 'Lists all commands',
    execute(msg, args) {
        msg.reply("!play [url | youtube search] to queue up an audio source \n!stop to end playback\n!pause to pause the playback at its current position\n!resume to resume playback\n!skip to skip the current playback");
    },
};
