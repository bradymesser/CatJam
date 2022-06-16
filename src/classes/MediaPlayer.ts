// const MediaQueue = require('./MediaQueue');
import MediaQueue from './MediaQueue';
import ytdl from 'ytdl-core';
import { VoiceChannel } from 'discord.js';
import { AudioPlayer, AudioPlayerStatus, createAudioPlayer, createAudioResource, DiscordGatewayAdapterCreator, getVoiceConnection, joinVoiceChannel, JoinVoiceChannelOptions } from '@discordjs/voice';
// const ytdl = require('ytdl-core');
// const { Readable } = require('stream');

export default class MediaPlayer {
    public queue: MediaQueue;
    public channel: VoiceChannel;
    public isPlaying: boolean;
    public lastRequest: any;
    public first: any;
    public player: AudioPlayer;

    private timeout?: NodeJS.Timeout;

    constructor(channel: any) {
        this.queue = new MediaQueue();
        this.channel = channel;
        this.isPlaying = false;
        this.lastRequest = null;
        this.first = true;
        this.player = new AudioPlayer();
        this.player.on(AudioPlayerStatus.Idle, () => {
            this.isPlaying = false;
            this.queue.dequeue();
            this.playNext();
        })
        this.player.on(AudioPlayerStatus.Playing, () => {
            this.isPlaying = true;
            clearTimeout(this.timeout);
        });
        this.player.on(AudioPlayerStatus.Paused, () => {
            this.isPlaying = false;
        });
        this.player.on('error', () => {
            this.isPlaying = false;
            this.playNext();
        })
    }

    setLastRequest(req: any) {
        this.lastRequest = req;
    }

    getPosition(url: string) {
        return this.queue.find(url);
    }
    add(url: string, msg: any) {
        this.queue.enqueue(url, msg);
    }

    next() {
        return this.queue.get(0);
    }

    removeCurrentSong() {
        this.player.pause();
        this.queue.dequeue();
    }

    getConnection() {
        return getVoiceConnection(this.channel.guild.id)
    }


    async join() {
        if (!this.getConnection()) {
            joinVoiceChannel({
                channelId: this.channel.id,
                guildId: this.channel.guild.id,
                adapterCreator: this.channel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator
            });
        }
    }
    async start() {
        if (this.channel) {
            await this.join();
            this.playNext();
        }
    }

    async playSound(name: string) {
        await this.join();
        this.pause()
        const audioPlayer = createAudioPlayer();
        const audioResource = createAudioResource(name);
        const connection = this.getConnection();
        audioPlayer.play(audioResource);
        audioPlayer.on(AudioPlayerStatus.Idle, () => {
            audioPlayer.stop();
            if (!this.resume()) {
                console.error("Could not unpause player");
                this.resetTimeout();
            }
        })
        connection?.subscribe(audioPlayer);
    }

    playNext() {
        if (this.queue.getLength() > 0) {
            const req = this.next();
            if (!req) return;
            const stream = ytdl(req.url, { filter: 'audioonly' });
            const audioPlayer = this.player;
            audioPlayer.play(createAudioResource(stream));
            this.getConnection()?.subscribe(audioPlayer);
        } else {
            // When no songs left in the queue, start a timer for disconnect
            this.resetTimeout();
        }
    }

    pause() {
        this.player.pause();
    }

    resume() {
        return this.player.unpause();
    }

    stop() {
        this.queue.clear();
        this.destroyCurrentDispatcher();
    }

    skip() {
        this.removeCurrentSong();
        this.playNext();
    }

    leave() {
        this.queue.clear();
        this.destroyCurrentDispatcher();
        if (this.channel) {
            this.getConnection()?.destroy();
            global.mediaPlayers.delete(this.channel.id);
        }
    }

    getState() {
        return this.player.state;
    }

    destroyCurrentDispatcher() {
        this.player.stop(true);
    }

    private setTimeout() {
        this.timeout = setTimeout(() => {
            this.destroyCurrentDispatcher();
            this.leave();
        }, 300000)
    }

    private resetTimeout() {
        clearTimeout(this.timeout);
        this.setTimeout();
    }
}