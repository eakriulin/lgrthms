import { Comparator } from "../utils/Comparator";

type CompareMethod = 'isLessThan' | 'isGreaterThan';

export class Heap<T = any> {
    private heap: T[];
    private readonly comparator: Comparator<T>;
    private readonly method: CompareMethod;

    constructor(method: CompareMethod, compareFn?: (a: T, b: T) => number) {
        this.heap = [];
        this.comparator = new Comparator(compareFn);
        this.method = method;
    }

    public get size(): number {
        return this.heap.length;
    }

    // O(n) time | O(n) space
    public build(array: T[]): void {
        this.heap = array;

        const lastIndex = this.heap.length - 1;
        const lastParentIndex = this.getParentIndex(lastIndex);

        for (let index = lastParentIndex; index >= 0; index--) {
            this.siftDown(index);
        }
    }

    // O(log(n)) time | O(1) space
    public insert(value: T): T {
        this.heap.push(value);
        this.siftUp(this.heap.length - 1);
        return value;
    }

    // O(1) time | O(1) space
    public peek(): T | undefined {
        return this.heap[0];
    }

    // O(n) time | O(n) space
    public toArray(): T[] {
        return [...this.heap];
    }

    // O(log(n)) time | O(1) space
    public extract(): T | undefined {
        if (this.heap.length === 0) {
            return;
        }

        this.swap(0, this.heap.length - 1);
        const value = this.heap.pop();
        this.siftDown(0);

        return value;
    }

    // O(log(n)) time | O(1) space
    private siftDown(index: number): void {
        let childOneIndex = this.getChildIndex(index, 1);

        while(childOneIndex !== -1) {
            const childTwoIndex = this.getChildIndex(index, 2);
            let childIndexToSwapWith = childOneIndex;

            if (childTwoIndex !== -1 && this.comparator[this.method](this.heap[childTwoIndex], this.heap[childOneIndex])) {
                childIndexToSwapWith = childTwoIndex;
            }

            if (this.comparator[this.method](this.heap[childIndexToSwapWith], this.heap[index])) {
                this.swap(childIndexToSwapWith, index);
                index = childIndexToSwapWith;
                childOneIndex = this.getChildIndex(index, 1);
            } else {
                break;
            }
        }
    }

    // O(log(n)) time | O(1) space
    private siftUp(index: number): void {
        let parentIndex = this.getParentIndex(index);

        while(index > 0 && this.comparator[this.method](this.heap[index], this.heap[parentIndex])) {
            this.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = this.getParentIndex(index);
        }
    }

    // O(1) time | O(1) space
    private swap(i: number, j: number): void {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    // O(1) time | O(1) space
    private getChildIndex(parentIndex: number, childNumber: 1 | 2): number {
        const childIndex = parentIndex * 2 + childNumber;
        const lastIndex = this.heap.length - 1;
        return childIndex > lastIndex ? -1 : childIndex;
    }

    // O(1) time | O(1) space
    private getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }
}
