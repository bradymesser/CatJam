import { exec } from 'child_process';
import { BaseCommandInteraction, VoiceBasedChannel } from 'discord.js';
import { Command } from '../interfaces/command';

export const Restart: Command = {
    name: 'restart',
    description: 'restart` to restart and fix the bot',
    execute(interaction: BaseCommandInteraction, channel: VoiceBasedChannel) {
        interaction.reply("Restarting...");
        exec("pm2 restart all", (error, stdout, stderr) => {
            if (error) {
                interaction.reply(error.message);
            }
            else if (stderr) {
                interaction.reply(stderr);
            }
            else {
                interaction.reply(stdout);
            }
        })
    },
};
