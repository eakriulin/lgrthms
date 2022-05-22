import { DoublyLinkedList } from './DoublyLinkedList';

export class Queue<T = any> {
    private readonly queue: DoublyLinkedList<T>;

    constructor() {
        this.queue = new DoublyLinkedList<T>();
    }

    public get size(): number {
        return this.queue.length;
    }

    public enqueue(value: T): number {
        this.queue.insert(value);
        return this.queue.length;
    }

    public dequeue(): T | undefined {
        const node = this.queue.head;
        if (node) {
            this.queue.removeNode(node);
            return node.value;
        }
    }

    public peek(): T | undefined {
        const node = this.queue.head;
        return node ? node.value : undefined;
    }
}
