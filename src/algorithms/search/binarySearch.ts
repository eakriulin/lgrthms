// O(log(n)) time | O(1) space
export function binarySearch<T, K>(
    array: T[],
    target: K,
): T | undefined
export function binarySearch<T, K>(
    array: T[],
    target: K,
    get: (element: T) => K
): T | undefined
export function binarySearch<T, K>(
    array: T[],
    target: K,
    get?: (element: T) => T | K,
): T | undefined  {
    const index = binarySearchIndex(array, target, get);
    return index !== -1 ? array[index] : undefined;
}

// O(log(n)) time | O(1) space
export function binarySearchIndex<T, K>(
    array: T[],
    target: K,
): number
export function binarySearchIndex<T, K>(
    array: T[],
    target: K,
    get: (element: T) => K
): number
export function binarySearchIndex<T, K>(
    array: T[],
    target: K,
    get?: (element: T) => T | K,
): number  {
    let leftIdx = 0;
    let rightIdx = array.length - 1;

    get = get ? get : (element: T): T => element;

    while (leftIdx <= rightIdx) {
        const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        const element = array[middleIdx];
        const value = get(element);

        if (target === value) {
            return middleIdx;
        }

        if (target < value) {
            rightIdx = middleIdx - 1;
        } else {
            leftIdx = middleIdx + 1;
        }
    }

    return -1;
}

// O(log(n)) time | O(1) space
export function shiftedBinarySearch<T, K>(
    array: T[],
    target: K,
): T | undefined
export function shiftedBinarySearch<T, K>(
    array: T[],
    target: K,
    get: (element: T) => K
): T | undefined
export function shiftedBinarySearch<T, K>(
    array: T[],
    target: K,
    get?: (element: T) => T | K,
): T | undefined  {
    const index = shiftedBinarySearchIndex(array, target, get);
    return index !== -1 ? array[index] : undefined;
}

// O(log(n)) time | O(1) space
export function shiftedBinarySearchIndex<T, K>(
    array: T[],
    target: K,
): number
export function shiftedBinarySearchIndex<T, K>(
    array: T[],
    target: K,
    get: (element: T) => K
): number
export function shiftedBinarySearchIndex<T, K>(
    array: T[],
    target: K,
    get?: (element: T) => T | K,
): number  {
    let leftIdx = 0;
    let rightIdx = array.length - 1;

    get = get ? get : (element: T): T => element;

    while (leftIdx <= rightIdx) {
        const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        const middleValue = get(array[middleIdx]);

        if (target === middleValue) {
            return middleIdx;
        }

        const leftValue = get(array[leftIdx]);
        const rightValue = get(array[rightIdx]);

        if (leftValue <= middleValue) {
            if (target < middleValue && target >= leftValue) {
                rightIdx = middleIdx - 1;
            } else {
                leftIdx = middleIdx + 1;
            }
        } else {
            if (target > middleValue && target <= rightValue) {
                leftIdx = middleIdx + 1;
            } else {
                rightIdx = middleIdx - 1;
            }
        }
    }

    return -1;
}

// O(log(n)) time | O(1) space
export function binarySearchFirst<T, K>(
    array: T[],
    target: K,
): T | undefined
export function binarySearchFirst<T, K>(
    array: T[],
    target: K,
    get: (element: T) => K,
): T | undefined
export function binarySearchFirst<T, K>(
    array: T[],
    target: K,
    get?: (element: T) => T | K,
): T | undefined {
    const index = binarySearchFirstIndex(array, target, get);
    return index !== -1 ? array[index] : undefined;
}

// O(log(n)) time | O(1) space
export function binarySearchFirstIndex<T, K>(
    array: T[],
    target: K,
): number
export function binarySearchFirstIndex<T, K>(
    array: T[],
    target: K,
    get: (element: T) => K,
): number
export function binarySearchFirstIndex<T, K>(
    array: T[],
    target: K,
    get?: (element: T) => T | K,
): number {
    let leftIdx = 0;
    let rightIdx = array.length - 1;

    get = get ? get : (element: T): T => element;

    while (leftIdx <= rightIdx) {
        const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        const middleValue = get(array[middleIdx]);

        if (target === middleValue) {
            if (middleIdx === 0) {
                return middleIdx;
            }

            const middlePreviousValue = get(array[middleIdx - 1]);
            if (target === middlePreviousValue) {
                rightIdx = middleIdx - 1;
            } else {
                return middleIdx;
            }
        }

        if (target < middleValue) {
            rightIdx = middleIdx - 1;
        } else {
            leftIdx = middleIdx + 1;
        }
    }

    return -1;
}

// O(log(n)) time | O(1) space
export function binarySearchLast<T, K>(
    array: T[],
    target: K,
): T | undefined
export function binarySearchLast<T, K>(
    array: T[],
    target: K,
    get: (element: T) => K,
): T | undefined
export function binarySearchLast<T, K>(
    array: T[],
    target: K,
    get?: (element: T) => T | K,
): T | undefined {
    const index = binarySearchLastIndex(array, target, get);
    return index !== -1 ? array[index] : undefined;
}

// O(log(n)) time | O(1) space
export function binarySearchLastIndex<T, K>(
    array: T[],
    target: K,
): number
export function binarySearchLastIndex<T, K>(
    array: T[],
    target: K,
    get: (element: T) => K,
): number
export function binarySearchLastIndex<T, K>(
    array: T[],
    target: K,
    get?: (element: T) => T | K,
): number {
    let leftIdx = 0;
    let rightIdx = array.length - 1;

    get = get ? get : (element: T): T => element;

    while (leftIdx <= rightIdx) {
        const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        const middleValue = get(array[middleIdx]);

        if (target === middleValue) {
            if (middleIdx === array.length - 1) {
                return middleIdx;
            }

            const middleNextValue = get(array[middleIdx + 1]);
            if (target === middleNextValue) {
                leftIdx = middleIdx + 1;
            } else {
                return middleIdx;
            }
        }

        if (target < middleValue) {
            rightIdx = middleIdx - 1;
        } else {
            leftIdx = middleIdx + 1;
        }
    }

    return -1;
}

// O(log(n)) time | O(1) space
export function searchForRange<T, K>(
    array: T[],
    target: K
): [number, number]
export function searchForRange<T, K>(
    array: T[],
    target: K,
    get: (element: T) => K,
): [number, number]
export function searchForRange<T, K>(
    array: T[],
    target: K,
    get?: (element: T) => T | K,
): [number, number] {
    get = get ? get : (element: T): T => element;
    return [binarySearchFirstIndex(array, target, get), binarySearchLastIndex(array, target, get)];
}
