module.exports = class MediaQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(url) {
        if (this.queue.findIndex(e => e === url) === -1) {
            this.queue.push(url);
        }
    }

    dequeue() {
        if (this.queue.length > 0) {
            return this.queue.shift();
        }
    }

    find(url) {
        return this.queue.findIndex(e => e === url);
    }

    getLength() {
        return this.queue.length;
    }

    clear() {
        this.queue = [];
    }
};