// const ytdl = require('ytdl-core');
import ytdl from 'ytdl-core';
import searchHelper from '../helpers/yt_search';
import MediaPlayer from '../classes/MediaPlayer';
import { Command } from '../interfaces/command';
import { ApplicationCommandOptionType, MessageContextMenuCommandInteraction, VoiceBasedChannel } from 'discord.js';

export const Play: Command = {
    name: 'play',
    description: '`/play [url | youtube search | random]` to queue up an audio source',
    requiresVoiceChannel: true,
    options: [{
        name: 'input',
        description: '[url | youtube search | random]',
        type: ApplicationCommandOptionType.String
    }],
    async execute(interaction: MessageContextMenuCommandInteraction, channel: VoiceBasedChannel) {
        const input = interaction.options.get('input')?.value as string;
        const isValid = ytdl.validateURL(input);
        var tempUrl = input;

        if (!channel) {
            interaction.reply({ content: 'Join a channel 🙉', ephemeral: true });
            return;
        }
        // If no argument is supplied
        if (!input) {
            interaction.reply({ content: 'Invalid request 🙊', ephemeral: true });
            return;
        }

        // If the argument is not a valid link, try to search yt for it
        if (!isValid && input !== 'random') {
            const search = await searchHelper.searchYT(tempUrl);
            const result = search.results;
            if (result.length < 1) {
                interaction.reply({ content: "Didn't find anything lol", ephemeral: true });
                return;
            }
            tempUrl = result[0].link
            if (!ytdl.validateURL(tempUrl)) {
                interaction.reply({ content: 'Could not find any matching videos 🙈', ephemeral: true });
                return;
            }
        } else if (input === 'random') {
            let search = await searchHelper.getSuggestedVideo();
            tempUrl = `https://youtube.com/watch?v=${search.items[0].id}`;
            while (!ytdl.validateURL(tempUrl)) {
                search = await searchHelper.getSuggestedVideo();
                tempUrl = `https://youtube.com/watch?v=${search.items[0].id}`;
            }
        }
        try {
            await ytdl.getBasicInfo(tempUrl);
        } catch {
            interaction.reply({ content: 'I cannot play this video ☹, check if it is externally playable or age restricted', ephemeral: true });
            return;
        }

        if (global.mediaPlayers.has(channel.id)) {
            const q = global.mediaPlayers.get(channel.id);
            q?.add(tempUrl, interaction);
        } else {
            const q = new MediaPlayer(channel, interaction.channel);
            q.add(tempUrl, interaction);
            global.mediaPlayers.set(channel.id, q);
        }
        const player = global.mediaPlayers.get(channel.id);
        interaction.reply({ content: `Added ${tempUrl} to the queue at position ${player?.getPosition(tempUrl)} 🐵`, ephemeral: true })
        console.log(player?.isPlaying);
        if (!player?.isPlaying) {
            player?.start();
        }
    },
};
