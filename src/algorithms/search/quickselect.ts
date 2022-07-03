import { swap } from "../../utils/arrays";

// Best: O(n) time | O(1) space
// Avg: O(n) time | O(1) space
// Worst: O(n^2) time | O(1) space
export function quickselectKthSmallest<T>(
    array: T[],
    k: number,
): T
export function quickselectKthSmallest<T, K>(
    array: T[],
    k: number,
    get: (element: T) => K,
): T
export function quickselectKthSmallest<T, K>(
    array: T[],
    k: number,
    get?: (element: T) => T | K,
): T | undefined {
    if (k <= 0 || k > array.length) {
        return;
    }

    get = get ? get : (element: T): T => element;

    const targetIdx = k - 1;
    let startIdx = 0;
    let endIdx = array.length - 1;

    while(startIdx <= endIdx) {
        const pivotIdx = doQuicksortAndGetPivotIdx(array, get, startIdx, endIdx);

        if (targetIdx === pivotIdx) {
            return array[pivotIdx];
        }

        if (pivotIdx > targetIdx) {
            endIdx = pivotIdx - 1;
        } else {
            startIdx = pivotIdx + 1;
        }
    }
}

// Best: O(n) time | O(1) space
// Avg: O(n) time | O(1) space
// Worst: O(n^2) time | O(1) space
export function quickselectKthLargest<T>(
    array: T[],
    k: number,
): T
export function quickselectKthLargest<T, K>(
    array: T[],
    k: number,
    get: (element: T) => K,
): T
export function quickselectKthLargest<T, K>(
    array: T[],
    k: number,
    get?: (element: T) => T | K,
): T | undefined {
    if (k <= 0 || k > array.length) {
        return;
    }

    get = get ? get : (element: T): T => element;

    const targetIdx = array.length - k;
    let startIdx = 0;
    let endIdx = array.length - 1;

    while(startIdx <= endIdx) {
        const pivotIdx = doQuicksortAndGetPivotIdx(array, get, startIdx, endIdx);

        if (targetIdx === pivotIdx) {
            return array[pivotIdx];
        }

        if (pivotIdx > targetIdx) {
            endIdx = pivotIdx - 1;
        } else {
            startIdx = pivotIdx + 1;
        }
    }
}

function doQuicksortAndGetPivotIdx<T, K>(
    array: T[],
    get: (element: T) => T | K,
    startIdx: number,
    endIdx: number,
): number {
    const pivotIdx = startIdx;
    let leftIdx = pivotIdx + 1;
    let rightIdx = endIdx;

    while (leftIdx <= rightIdx) {
        const pivotValue = get(array[pivotIdx]);
        const leftValue = get(array[leftIdx]);
        const rightValue = get(array[rightIdx]);

        if (leftValue > pivotValue && rightValue < pivotValue) {
            swap(array, leftIdx, rightIdx);
        }

        if (leftValue <= pivotValue) {
            leftIdx++;
        }

        if (rightValue >= pivotValue) {
            rightIdx--;
        }
    }

    swap(array, pivotIdx, rightIdx);
    return rightIdx;
}
