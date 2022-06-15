// const MediaQueue = require('./MediaQueue');
import MediaQueue from './MediaQueue';
import ytdl from 'ytdl-core';
import { Readable } from 'stream';
import { Channel, ChannelManager, Message, VoiceChannel } from 'discord.js';
import { AudioPlayer, AudioResource, createAudioPlayer, createAudioResource, CreateVoiceConnectionOptions, DiscordGatewayAdapterCreator, getVoiceConnection, joinVoiceChannel, JoinVoiceChannelOptions } from '@discordjs/voice';
// const ytdl = require('ytdl-core');
// const { Readable } = require('stream');

export default class MediaPlayer {
	public queue: any;
    public channel: VoiceChannel;
	public isPlaying: any;
    // public connection: any;
	public lastRequest: any;
	public dispatcher: any;
	public first: any;
	public timeout: any;

    constructor(channel: any) {
        this.queue = new MediaQueue();
        this.channel = channel;
        this.isPlaying = false;
        // this.connection = null;
        this.lastRequest = null;
        this.dispatcher = null;
        this.first = true;
        this.timeout = null;
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
        this.destroyCurrentDispatcher();
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

    playSound(name: string) {
        this.join();
        this.pause();
        const audioPlayer = createAudioPlayer();
        audioPlayer.play(createAudioResource(name));
        this.getConnection()?.subscribe(audioPlayer);
        // dispatcher.on('end', () => {
        //     this.resume();
        // });
    }

    playNext() {
        if (this.queue.getLength() > 0) {
            this.isPlaying = true;
            // clearTimeout(this.timeout);
            const req = this.next();
            const stream = ytdl(req.url, { filter: 'audioonly' });
            const audioPlayer = createAudioPlayer();
            audioPlayer.play(createAudioResource(stream));
            this.getConnection()?.subscribe(audioPlayer);
            // this.dispatcher = this.getConnection().playStream(stream);
            req.msg.reply(`Playing ${req.url}`);
            this.dispatcher.on('end', () => {
                this.queue.dequeue();
                this.playNext();
            })
        } else {
            this.isPlaying = false;
            this.destroyCurrentDispatcher();
            // this.timeout = setTimeout(() => {
            //     this.leave();
            // }, 300000)
        }
    }

    pause() {
        this.dispatcher.pause();
        this.isPlaying = false;
    }

    resume() {
        if (this.dispatcher) {
            this.dispatcher.resume();
            this.isPlaying = true;
        }
    }

    stop() {
        this.queue.clear();
        this.destroyCurrentDispatcher();
        this.isPlaying = false;
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
        }
        this.isPlaying = false;
    }

    destroyCurrentDispatcher() {
        if (this.dispatcher) {
            this.dispatcher.end();
            this.dispatcher = null;
        }
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