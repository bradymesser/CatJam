// const ytdl = require('ytdl-core');
import ytdl from 'ytdl-core';
import searchHelper from '../helpers/yt_search.js';
// const searchHelper = require('../helpers/yt_search');
import MediaPlayer from '../classes/MediaPlayer.js';
import { Command } from '../interfaces/command.js';
// const MediaPlayer = require('../classes/MediaPlayer');

export const Play: Command = {
    name: '!play',
    description: '`!play` [url | youtube search | random] to queue up an audio source',
    async execute(msg, args) {
        const input = args.join(' ');
        const channel = msg.member.voiceChannel;
        const isValid = ytdl.validateURL(input);
        var tempUrl = input;

        if (!channel) {
            msg.reply('Join a channel numb nuts');
            return;
        }
        // If no argument is supplied
        if (!input) {
            msg.reply('Invalid request');
            return;
        }

        // If the argument is not a valid link, try to search yt for it
        if (!isValid && input !== 'random') {
            const search = await searchHelper.searchYT(tempUrl);
            const result = search.results;
            if (result.length < 1) {
                msg.reply("Shit be scuffed sometimes idk why it didnt find anything");
                return;
            }
            tempUrl = result[0].link
            if (!ytdl.validateURL(tempUrl)) {
                msg.reply('Could not find any matching videos.');
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
            q.add(tempUrl, msg);
        } else {
            const q = new MediaPlayer(channel);
            q.add(tempUrl, msg);
            global.mediaPlayers.set(channel.id, q);
        }
        const player = global.mediaPlayers.get(channel.id);
        player.setLastRequest(msg);
        msg.reply(`Added ${tempUrl} to the queue at position ${player.getPosition(tempUrl)}`)
        if (!player.isPlaying) {
            player.start();
        }
    },
};
