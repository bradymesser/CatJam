import { createReadStream } from 'fs';
import MediaQueue from './MediaQueue';
import ytdl from 'ytdl-core';
import { VoiceChannel } from 'discord.js';
import { AudioPlayer, AudioPlayerStatus, createAudioPlayer, createAudioResource, DiscordGatewayAdapterCreator, getVoiceConnection, joinVoiceChannel, JoinVoiceChannelOptions, PlayerSubscription } from '@discordjs/voice';

export default class MediaPlayer {
    public queue: MediaQueue;
    public channel: VoiceChannel;
    public isPlaying: boolean;
    public lastRequest: any;
    public first: any;
    public player: AudioPlayer;
    public soundPlayer: AudioPlayer;

    private timeout?: NodeJS.Timeout;
    private subscription?: PlayerSubscription;

    constructor(channel: any) {
        this.queue = new MediaQueue();
        this.channel = channel;
        this.isPlaying = false;
        this.lastRequest = null;
        this.first = true;
        this.player = createAudioPlayer();
        this.soundPlayer = createAudioPlayer();
        this.player.on(AudioPlayerStatus.Idle, () => {
            this.isPlaying = false;
            console.debug('ENTERING IDLE STATE')
            this.queue.dequeue();
            this.playNext();
        })
        this.player.on(AudioPlayerStatus.Playing, () => {
            this.isPlaying = true;
            console.debug('ENTERING PLAYING STATE')
            clearTimeout(this.timeout);
        });
        this.player.on(AudioPlayerStatus.Paused, () => {
            console.debug('ENTERING PAUSED STATE')
            this.resetTimeout();
            this.isPlaying = false;
        });
        this.player.on('error', () => {
            console.error('error in player')
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
        await this.join();
        this.playNext();
    }

    async playSound(name: string) {
        await this.join();
        this.player.stop();
        // this.subscription?.unsubscribe();
        const connection = this.getConnection();
        console.debug(`Loading file ${name}`)
        const audioResource = createAudioResource(createReadStream(name));
        this.player.play(audioResource);
        connection?.subscribe(this.player);
        if (!this.player.checkPlayable()) {
            console.debug(`Player not playable for sound ${name} \n`);
            this.playNext();
        }
        // this.soundPlayer.on(AudioPlayerStatus.Idle, () => {
        //     console.log('11111')
        //     this.soundPlayer.stop(true);
        //     console.log('asdf')
        //     // subscription?.unsubscribe();
        //     console.log('here')
        //     this.subscription = this.getConnection()?.subscribe(this.player);
        //     if (!this.resume()) {
        //         console.error("Could not unpause player");
        //         this.resetTimeout();
        //     } else {
        //         console.log("Unpaused successfully");
        //     }
        //     this.soundPlayer.removeAllListeners();
        // })
        // this.soundPlayer.on(AudioPlayerStatus.Playing, () => {
        //     this.isPlaying = true;
        //     clearTimeout(this.timeout);
        // });
        // this.soundPlayer.on(AudioPlayerStatus.Paused, () => {
        //     this.isPlaying = false;
        //     this.soundPlayer.removeAllListeners();
        // });
        // this.soundPlayer.on('error', () => {
        //     this.isPlaying = false;
        //     this.soundPlayer.removeAllListeners();
        //     this.playNext();
        // })
        // console.log(subscription)
        // audioPlayer.on(AudioPlayerStatus.Idle, () => {

        // })
    }

    playNext() {
        if (this.queue.getLength() > 0) {
            const req = this.next();
            if (!req) return;
            const stream = ytdl(req.url, { filter: 'audioonly' });
            this.player.play(createAudioResource(stream));
            this.subscription = this.getConnection()?.subscribe(this.player);
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

    private destroyCurrentDispatcher() {
        this.player.stop(true);
    }

    private setTimeout() {
        this.timeout = setTimeout(() => {
            this.destroyCurrentDispatcher();
            this.leave();
        }, 300000)
    }

    private resetTimeout() {
        console.debug(`Resetting timeout for ${this.channel.id}`)
        if (this.timeout) {
            console.debug("CLEARING TIMEOUT")
            clearTimeout(this.timeout);
        }
        this.setTimeout();
    }
}