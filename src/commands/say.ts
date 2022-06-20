// const MediaPlayer = require('../classes/MediaPlayer');
import { BaseCommandInteraction, VoiceBasedChannel } from "discord.js";
import MediaPlayer from "../classes/MediaPlayer";
import { Command } from "../interfaces/command";
const Gtts = require('gtts');

export const Say: Command = {
    name: 'say',
    description: '`/say [text]` will make the bot speak!',
    options: [{
        name: 'input',
        description: '[text]',
        type: "STRING"
    }],
    execute(interaction: BaseCommandInteraction, channel: VoiceBasedChannel) {
        const input = interaction.options.get('input')?.value as string;
        if (channel === null || channel === undefined) {
            interaction.reply({ content: 'Join a channel first', ephemeral: true })
            return;
        }
        if (!input) {
            interaction.reply({ content: 'You need to give me something to read!', ephemeral: true });
            return;
        }
        const gtts = new Gtts(input, 'en-us');

        if (global.mediaPlayers.has(channel.id)) {
            const q = global.mediaPlayers.get(channel.id);
            q?.playReadable(gtts.stream());
        } else {
            const q = new MediaPlayer(channel);
            q?.playReadable(gtts.stream());
            global.mediaPlayers.set(channel.id, q);
        }
        interaction.reply({ content: `Okay...`, ephemeral: true });
    },
};
