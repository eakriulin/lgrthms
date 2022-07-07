import { Comparator } from '../../utils/Comparator';
import { swap } from '../../utils/arrays';

// O(n^2) time | O(1) space
export function bubbleSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const comparator = new Comparator(compareFn);

    let isSorted = false;
    let lastIdx = array.length - 1;

    while(!isSorted) {
        isSorted = true;
        for (let i = 0; i < lastIdx; i++) {
            if (comparator.isGreaterThan(array[i], array[i + 1])) {
                swap(array, i, i + 1);
                isSorted = false;
            }
        }
        lastIdx--;
    }

    return array;
}
