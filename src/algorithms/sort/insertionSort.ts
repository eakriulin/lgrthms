import { Comparator } from '../../utils/Comparator';
import { swap } from '../../utils/arrays';

// O(n^2) time | O(1) space
export function insertionSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const comparator = new Comparator(compareFn);

    for (let i = 1; i < array.length; i++) {
        let j = i;
        while (j > 0 && comparator.isLessThan(array[j], array[j - 1])) {
            swap(array, j, j - 1);
            j--;
        }
    }

    return array;
}
