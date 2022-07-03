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

// O(nm) time | O(1) space — where
// n is the number of rows
// m is the number of columns
export function searchInMatrix<T, K>(
    matrix: T[][],
    target: K,
): T | undefined
export function searchInMatrix<T, K>(
    matrix: T[][],
    target: K,
    get: (element: T) => K,
): T | undefined
export function searchInMatrix<T, K>(
    matrix: T[][],
    target: K,
    get?: (element: T) => T | K,
): T | undefined {
    get = get ? get : (element: T): T => element;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (target === get(matrix[i][j])) {
                return matrix[i][j];
            }
        }
    }
}

// O(n + m) time | O(1) space — where
// n is the number of rows
// m is the number of columns
export function searchInSortedMatrix<T, K>(
    matrix: T[][],
    target: K,
): T | undefined
export function searchInSortedMatrix<T, K>(
    matrix: T[][],
    target: K,
    get: (element: T) => K,
): T | undefined
export function searchInSortedMatrix<T, K>(
    matrix: T[][],
    target: K,
    get?: (element: T) => T | K,
): T | undefined {
    get = get ? get : (element: T): T => element;

    let i = 0;
    let j = matrix[i].length - 1;

    while (i < matrix.length && j >= 0) {
        if (target === get(matrix[i][j])) {
            return matrix[i][j];
        }

        if (target < get(matrix[i][j])) {
            j--;
        } else {
            i++;
        }
    }
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

function binarySearchFirstIndex<T, K>(
    array: T[],
    target: K,
    get?: (element: T) => T | K,
): number {
    let leftIdx = 0;
    let rightIdx = array.length - 1;

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

function binarySearchLastIndex<T, K>(
    array: T[],
    target: K,
    get?: (element: T) => T | K,
): number {
    let leftIdx = 0;
    let rightIdx = array.length - 1;

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

function swap<T>(array: T[], i: number, j: number): void {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
