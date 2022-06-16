// const ytdl = require('ytdl-core');
import ytdl from 'ytdl-core';
import searchHelper from '../helpers/yt_search';
// const searchHelper = require('../helpers/yt_search');
import MediaPlayer from '../classes/MediaPlayer';
import { Command } from '../interfaces/command';
import { BaseCommandInteraction, GuildMember, VoiceBasedChannel } from 'discord.js';
// const MediaPlayer = require('../classes/MediaPlayer');

export const Play: Command = {
    name: 'play',
    description: 'play` [url | youtube search | random] to queue up an audio source',
    options: [{
        name: 'input',
        description: '[url | youtube search | random]',
        type: "STRING"
    }],
    async execute(interaction: BaseCommandInteraction, channel: VoiceBasedChannel) {
        // const channel = (interaction.member as GuildMember).voice.channel;
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

        if (global.mediaPlayers.has(channel.id)) {
            const q = global.mediaPlayers.get(channel.id);
            q?.add(tempUrl, interaction);
        } else {
            const q = new MediaPlayer(channel);
            q.add(tempUrl, mediaPlayers);
            global.mediaPlayers.set(channel.id, q);
        }
        const player = global.mediaPlayers.get(channel.id);
        // player?.setLastRequest(msg);
        interaction.reply({ content: `Added ${tempUrl} to the queue at position ${player?.getPosition(tempUrl)} 🐵`, ephemeral: true })
        if (!player?.isPlaying) {
            player?.start();
        }
    },
};
