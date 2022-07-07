import { Comparator } from '../../utils/Comparator';
import { swap } from '../../utils/arrays';

// Best: O(nlog(n)) time | O(log(n)) space
// Avg: O(nlog(n)) time | O(log(n)) space
// Worst: O(n^2) time | O(log(n)) space
export function quickSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const comparator = new Comparator(compareFn);
    doQuickSort(array, comparator, 0, array.length - 1);
    return array;
}

function doQuickSort<T>(array: T[], comparator: Comparator<T>, startIdx: number, endIdx: number): void {
    if (endIdx <= startIdx) {
        return;
    }

    const pivotIdx = startIdx;
    let leftIdx = pivotIdx + 1;
    let rightIdx = endIdx;

    while(leftIdx <= rightIdx) {
        if (comparator.isGreaterThan(array[leftIdx], array[pivotIdx]) && comparator.isLessThan(array[rightIdx], array[leftIdx])) {
            swap(array, leftIdx, rightIdx);
        }

        if (comparator.isLessThanOrEqual(array[leftIdx], array[pivotIdx])) {
            leftIdx++;
        }

        if (comparator.isGreaterThanOrEqual(array[rightIdx], array[pivotIdx])) {
            rightIdx--;
        }
    }

    swap(array, pivotIdx, rightIdx);

    const leftLength = rightIdx - 1 - startIdx;
    const rightLength = endIdx - rightIdx + 1;

    if (leftLength <= rightLength) {
        doQuickSort(array, comparator, startIdx, rightIdx - 1);
        doQuickSort(array, comparator, rightIdx + 1, endIdx);
    } else {
        doQuickSort(array, comparator, rightIdx + 1, endIdx);
        doQuickSort(array, comparator, startIdx, rightIdx - 1);
    }
}
