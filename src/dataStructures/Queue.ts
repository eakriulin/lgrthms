import { DoublyLinkedList } from './DoublyLinkedList';

export class Queue<T = any> {
    private readonly queue: DoublyLinkedList<T>;

    constructor() {
        this.queue = new DoublyLinkedList<T>();
    }

    public get size(): number {
        return this.queue.length;
    }

    // O(1) time | O(1) space
    public enqueue(value: T): number {
        this.queue.insert(value);
        return this.queue.length;
    }

    // O(1) time | O(1) space
    public dequeue(): T | undefined {
        const node = this.queue.head;
        if (node) {
            this.queue.removeNode(node);
            return node.value;
        }
    }

    // O(1) time | O(1) space
    public peek(): T | undefined {
        const node = this.queue.head;
        return node ? node.value : undefined;
    }
}
