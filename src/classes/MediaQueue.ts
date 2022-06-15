export default class MediaQueue {
    public queue: { url: string, msg: any }[];

    constructor() {
        this.queue = [];
    }

    enqueue(url: string, msg: any) {
        if (this.queue.findIndex(e => e.url === url) === -1) {
            this.queue.push({ url, msg });
        }
    }

    dequeue() {
        if (this.queue.length > 0) {
            return this.queue.shift();
        }
    }

    find(url: string) {
        return this.queue.findIndex(e => e.url === url);
    }

    getLength() {
        return this.queue.length;
    }

    clear() {
        this.queue = [];
    }
    get(index: number) {
        if (index < this.queue.length) {
            return this.queue[index];
        }
    }
};