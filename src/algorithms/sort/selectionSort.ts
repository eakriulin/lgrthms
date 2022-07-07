import { Comparator } from '../../utils/Comparator';
import { swap } from '../../utils/arrays';

// O(n^2) time | O(1) space
export function selectionSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const comparator = new Comparator(compareFn);

    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (comparator.isLessThan(array[j], array[minIdx])) {
                minIdx = j;
            }
        }
        swap(array, i, minIdx);
    }

    return array;
}
