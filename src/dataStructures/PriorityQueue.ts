import { MaxHeap } from './MaxHeap';

interface IHeapItem<T> {
    data: T;
    priority: number;
}

export class PriorityQueue<T = any> {
    private readonly MIN_PRIORITY = 0;
    private readonly heap: MaxHeap<IHeapItem<T>>;

    constructor() {
        const compareFn = (a: IHeapItem<T>, b: IHeapItem<T>): number => a.priority - b.priority;
        this.heap = new MaxHeap<IHeapItem<T>>(compareFn);
    }

    public get size(): number {
        return this.heap.size;
    }

    // O(log(n)) time | O(1) space
    public enqueue(value: T, priority: number = this.MIN_PRIORITY): number {
        if (priority < this.MIN_PRIORITY) {
            throw new Error('Cannot enqueue value, priority must be greater than or equal to 0');
        }
        this.heap.insert({ data: value, priority });
        return this.heap.size;
    }

    // O(log(n)) time | O(1) space
    public dequeue(): T | undefined {
        const item = this.heap.extract();
        if (item) {
            return item.data;
        }
    }

    // O(1) time | O(1) space
    public peek(): T | undefined {
        const item = this.heap.peek();
        if (item) {
            return item.data;
        }
    }
}
