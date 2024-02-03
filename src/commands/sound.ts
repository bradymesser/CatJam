import { ApplicationCommandOptionType, MessageContextMenuCommandInteraction, VoiceBasedChannel } from "discord.js";
import { Command } from "src/interfaces/command";
import * as fs from 'fs';
import * as path from 'path';
import MediaPlayer from "../classes/MediaPlayer";

export const Sound: Command = {
    name: 'sound',
    description: '`/sound [name | list]` to play a sound or list available sounds',
    options: [{
        name: 'input',
        description: '[name | list]',
        type: ApplicationCommandOptionType.String
    }],
    requiresVoiceChannel: true,
    async execute(interaction: MessageContextMenuCommandInteraction, channel: VoiceBasedChannel) {
        const input = interaction.options.get('input')?.value as string;
        if (!input) return;
        var fileString = "Use the number id or sound name:\n";
        fs.readdir(path.resolve(__dirname, "../sounds/"), (err: any, files: string[]) => {
            files.sort((a, b) => a.localeCompare(b));
            const fileMap = new Map<number, string>();
            let i = 0;
            for (const file of files) {
                fileString += `${i}: ${file}\n`;
                fileMap.set(i, file);
                i++;
            }
            if (input === 'list') {
                interaction.reply({ content: fileString, ephemeral: true });
                return;
            }
            const fileName = parseInt(input) + 1 ? fileMap.get(parseInt(input)) : input;
            if (!fileName) {
                interaction.reply({ content: `Could not find file ${input}`, ephemeral: true });
                return;
            };
            if (global.mediaPlayers.has(channel.id)) {
                const q = global.mediaPlayers.get(channel.id);
                if (q?.isPlaying) {
                    interaction.reply({ content: 'There is a bug playing a sound after playing a YT video, I will still try 😃', ephemeral: true });
                }
                q?.playSound(path.resolve(__dirname, `../sounds/${fileName}`));
            } else {
                const q = new MediaPlayer(channel, interaction.channel);
                q?.playSound(path.resolve(__dirname, `../sounds/${fileName}`));
                global.mediaPlayers.set(channel.id, q);
            }
            interaction.reply({ content: `Playing sound ${fileName}`, ephemeral: true });

        })
    }
}