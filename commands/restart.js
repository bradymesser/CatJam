import { exec } from 'child_process';

export default {
    name: '!restart',
    description: '`!restart` to restart and fix the bot',
    execute(msg, args) {
        msg.reply("Restarting...");
        exec("pm2 restart all", (error, stdout, stderr) => {
            if (error) {
                msg.reply(error.message);
            }
            else if (stderr) {
                msg.reply(stderr);
            }
            else {
                msg.reply(stdout);
            }
        })
    },
};
