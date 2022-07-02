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
    let leftIdx = 0;
    let rightIdx = array.length - 1;

    while (leftIdx <= rightIdx) {
        const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        const element = array[middleIdx];
        const value = get ? get(element) : element;

        if (target === value) {
            return element;
        }

        if (target < value) {
            rightIdx = middleIdx - 1;
        } else {
            leftIdx = middleIdx + 1;
        }
    }
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
    let leftIdx = 0;
    let rightIdx = array.length - 1;

    get = get ? get : (element: T): T => element;

    while (leftIdx <= rightIdx) {
        const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        const middleValue = get(array[middleIdx]);

        if (target === middleValue) {
            return array[middleIdx];
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
}

// O(nm) time | O(m) space — where
// n is the length of the array
// m is the number of elements to find
export function findNSmallest<T, K>(array: T[], n: number, get?: (element: T) => K | T): T[] {
    if (n === 0) {
        return [];
    }

    if (array.length < n) {
        throw new Error(`Cannot find ${n} smallest elements in array with length ${array.length}`);
    }

    const smallest: T[] = new Array(n).fill(null);
    get = get ? get : (element: T): T => element;

    for (const element of array) {
        let currentElement = element;

        for (let i = 0; i < smallest.length; i++) {
            const currentSmallest = smallest[i];

            if (currentSmallest === null || get(currentElement) < get(currentSmallest)) {
                smallest[i] = currentElement;
                currentElement = currentSmallest;
            }
        }
    }

    return smallest;
}

// O(nm) time | O(m) space — where
// n is the length of the array
// m is the number of elements to find
export function findNLargest<T, K>(array: T[], n: number, get?: (element: T) => K | T): T[] {
    if (n === 0) {
        return [];
    }

    if (array.length < n) {
        throw new Error(`Cannot find ${n} largest elements in array with length ${array.length}`);
    }

    const largest: T[] = new Array(n).fill(null);
    get = get ? get : (element: T): T => element;

    for (const element of array) {
        let currentElement = element;

        for (let i = 0; i < largest.length; i++) {
            const currentLargest = largest[i];

            if (currentLargest === null || get(currentElement) > get(currentLargest)) {
                largest[i] = currentElement;
                currentElement = currentLargest;
            }
        }
    }

    return largest;
}
