import { BaseCommandInteraction } from "discord.js";

export default class MediaQueue {
    public queue: { url: string, interaction: BaseCommandInteraction }[];

    constructor() {
        this.queue = [];
    }

    enqueue(url: string, interaction: BaseCommandInteraction) {
        if (this.queue.findIndex(e => e.url === url) === -1) {
            this.queue.push({ url, interaction });
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