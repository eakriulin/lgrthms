import { Heap } from "./Heap";

export class MinHeap<T = any> extends Heap<T> {
    constructor(compareFn?: (a: T, b: T) => number) {
        super('isLessThan', compareFn);
    }
}
