module.exports = {
    name: '!help',
    description: '`!help` to list all commands',
    execute(msg, args) {
        msg.reply(global.commandHelp);
    },
};
