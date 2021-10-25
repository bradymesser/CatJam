const MediaQueue = require('./MediaQueue');
const ytdl = require('ytdl-core');

module.exports = class MediaPlayer {

    constructor(channel) {
        this.queue = new MediaQueue();
        this.channel = channel;
        this.isPlaying = false;
        this.connection = null;
        this.lastRequest = null;
        this.dispatcher = null;
    }

    setLastRequest(req) {
        this.lastRequest = req;
    }

    getPosition(url) {
        return this.queue.find(url);
    }
    add(url) {
        this.queue.enqueue(url);
    }

    next() {
        return this.queue.dequeue();
    }

    async start() {
        if (this.channel) {
            this.connection = await this.channel.join();
            this.playNext();
        } else {
            this.lastRequest.reply('Join a channel numb nuts');
        }
    }

    playNext() {
        if (this.queue.getLength() > 0) {
            this.isPlaying = true;
            const url = this.next();
            const stream = ytdl(url, { filter: 'audioonly' });
            this.dispatcher = this.connection.playStream(stream);
            this.lastRequest.reply(`Playing ${url}`);
            this.dispatcher.on('end', () => {
                this.playNext();
            })
        } else {
            this.isPlaying = false;
            this.dispatcher.end();
            this.dispatcher = null;
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
        this.dispatcher.end();
        this.isPlaying = false;
    }

    skip() {
        this.playNext();
    }
}