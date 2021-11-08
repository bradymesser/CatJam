export default class MediaQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(url, msg) {
        if (this.queue.findIndex(e => e === url) === -1) {
            this.queue.push({ url, msg });
        }
    }

    dequeue() {
        if (this.queue.length > 0) {
            return this.queue.shift();
        }
    }

    find(url) {
        return this.queue.findIndex(e => e.url === url);
    }

    getLength() {
        return this.queue.length;
    }

    clear() {
        this.queue = [];
    }
    get(index) {
        if (index < this.queue.length) {
            return this.queue[index];
        }
    }
};