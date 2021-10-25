const exportList = require('./index.js');
module.exports = {
    name: '!help',
    description: 'Lists all commands',
    execute(msg, args) {
        console.log(Object.keys(exportList))
        msg.reply(Object.keys(exportList));
    },
};
