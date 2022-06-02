import { Heap } from "./Heap";

export class MaxHeap<T = any> extends Heap<T> {
    constructor(compareFn?: (a: T, b: T) => number) {
        super('isGreaterThan', compareFn);
    }
}
