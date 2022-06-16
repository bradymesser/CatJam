// const MediaQueue = require('./MediaQueue');
import MediaQueue from './MediaQueue';
import ytdl from 'ytdl-core';
import { Readable } from 'stream';
import { Channel, ChannelManager, Message, VoiceChannel } from 'discord.js';
import { AudioPlayer, AudioPlayerStatus, AudioResource, createAudioPlayer, createAudioResource, CreateVoiceConnectionOptions, DiscordGatewayAdapterCreator, getVoiceConnection, joinVoiceChannel, JoinVoiceChannelOptions } from '@discordjs/voice';
// const ytdl = require('ytdl-core');
// const { Readable } = require('stream');

export default class MediaPlayer {
	public queue: any;
    public channel: VoiceChannel;
    public isPlaying: boolean;
    // public connection: any;
	public lastRequest: any;
	// public dispatcher: any;
	public first: any;
	public timeout: any;
    public player: AudioPlayer;

    constructor(channel: any) {
        this.queue = new MediaQueue();
        this.channel = channel;
        this.isPlaying = false;
        // this.connection = null;
        this.lastRequest = null;
        // this.dispatcher = null;
        this.first = true;
        this.timeout = null;
        this.player = new AudioPlayer();
        this.player.on(AudioPlayerStatus.Idle, () => {
            this.isPlaying = false;
            this.queue.dequeue();
            this.playNext();
        })
        this.player.on(AudioPlayerStatus.Playing, () => {
            this.isPlaying = true;
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
        // this.destroyCurrentDispatcher();
        this.player.pause();
        this.queue.dequeue();
    }

    getConnection() {
        return getVoiceConnection(this.channel.guild.id)
    }


    async join() {
        const joinOptions: JoinVoiceChannelOptions = {
            channelId: this.channel.id,
            guildId: this.channel.guild.id
        }
        // const createConnectionOptions: CreateVoiceConnectionOptions = {
        //     adapterCreator: this.channel.
        // }
        if (!this.getConnection()) {
            joinVoiceChannel({
                channelId: this.channel.id,
                guildId: this.channel.guild.id,
                adapterCreator: this.channel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator
            });
            // this.attachVoiceListener();
            // this.playNext();
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
        // this.pause();
        this.pause()
        const audioPlayer = createAudioPlayer();
        const audioResource = createAudioResource(name);
        const connection = this.getConnection();
        audioPlayer.play(audioResource);
        audioPlayer.on(AudioPlayerStatus.Idle, () => {
            audioPlayer.stop();
            if (!this.resume()) {
                console.error("Could not unpause player");
            }
        })
        // if (!connection)
        connection?.subscribe(audioPlayer);
        // connection.pl
        // audioPlayer.on(event: AudioPlayerStatus,)
        // dispatcher.on('end', () => {
        //     this.resume();
        // });
    }

    playNext() {
        if (this.queue.getLength() > 0) {
            // this.isPlaying = true;
            // clearTimeout(this.timeout);
            const req = this.next();
            const stream = ytdl(req.url, { filter: 'audioonly' });
            const audioPlayer = this.player;
            audioPlayer.play(createAudioResource(stream));
            this.getConnection()?.subscribe(audioPlayer);
            // this.dispatcher = this.getConnection().playStream(stream);
            // req.msg.reply(`Playing ${req.url}`);
            // this.dispatcher.on('end', () => {
            //     this.queue.dequeue();
            //     this.playNext();
            // })
        } else {
            // setTimeout(() => {}, )
            // this.destroyCurrentDispatcher();
            // this.timeout = setTimeout(() => {
            //     this.leave();
            // }, 300000)
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

    // TODO add voice commands if possible, is possible to determine when someone speaks with the on 'speaking'
    attachVoiceListener() {
        // if (this.connection) {
        //     if (this.first) {
        //         class Silence extends Readable {
        //             _read() {
        //                 this.push(Buffer.from([0xF8, 0xFF, 0xFE]))
        //             }
        //         }
        //         this.connection.playOpusStream(new Silence())
        //         this.first = false
        //     }
        //     this.connection.on('speaking', (user, speaking) => {
        //         console.log(speaking, '1')
        //         setTimeout(() => {
        //             console.log('asdf');
        //             this.attachVoiceListener();
        //         }, 250)
        //         // const receiver = this.connection.createReceiver()
        //         // console.log(this.connection.voiceManager);
        //         // const audioStream = receiver.createPCMStream('asdf')
        //         // console.log(audioStream);
        //     })

        // }
    }
}