import { Comparator } from '../../utils/Comparator';
import { swap } from '../../utils/arrays';

// O(nlog(n)) time | O(1) space
export function heapSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const comparator = new Comparator(compareFn);

    buildMaxHeap(array, comparator);
    for (let lastIndex = array.length - 1; lastIndex > 0; lastIndex--) {
        swap(array, 0, lastIndex);
        siftDown(array, 0, lastIndex - 1, comparator);
    }

    return array;
}

function buildMaxHeap<T>(array: T[], comparator: Comparator<T>): void {
    const lastIndex = array.length - 1;
    const firstParentIndex = getParentIndex(lastIndex);

    for (let parentIndex = firstParentIndex; parentIndex >= 0; parentIndex--) {
        siftDown(array, parentIndex, lastIndex, comparator);
    }
}

function siftDown<T>(array: T[], index: number, lastIndex: number, comparator: Comparator<T>): void {
    let childOneIndex = getChildIndex(index, lastIndex, 1);

    while (childOneIndex !== -1) {
        const childTwoIndex = getChildIndex(index, lastIndex, 2);
        let childIndexToSwapWith = childOneIndex;

        if (childTwoIndex !== -1 && comparator.isGreaterThan(array[childTwoIndex], array[childOneIndex])) {
            childIndexToSwapWith = childTwoIndex;
        }

        if (comparator.isGreaterThan(array[childIndexToSwapWith], array[index])) {
            swap(array, index, childIndexToSwapWith);
            index = childIndexToSwapWith;
            childOneIndex = getChildIndex(index, lastIndex, 1);
        } else {
            break;
        }
    }
}

function getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
}
 
function getChildIndex(parentIndex: number, lastIndex: number, childNumber: 1 | 2): number {
    const childIndex = parentIndex * 2 + childNumber;
    return childIndex > lastIndex ? -1 : childIndex;
}
