const NUMBER_BASE = 10;

export function radixSort(array: number[], direction: 'asc' | 'desc'): number[]
export function radixSort<T>(array: T[], direction: 'asc' | 'desc', get: (element: T) => number): T[]
export function radixSort<T>(array: T[], direction: 'asc' | 'desc', get?: (element: T) => number): T[] {
    if (array.length <= 1) {
        return array;
    }

    get = get ? get : (element: T | number): number => element as number;

    let largest = -Infinity;
    for (const element of array) {
        const value = get(element);
        largest = Math.max(largest, value);
    }

    let pass = 0;
    while (Math.floor(largest / NUMBER_BASE ** pass) > 0) {
        countingSort(array, direction, get, pass);
        pass++;
    }

    return array;
}

function countingSort<T>(
    array: T[],
    direction: 'asc' | 'desc',
    get: (element: T | number) => number,
    pass: number,
): void {
    const counts = new Array<number>(NUMBER_BASE).fill(0);
    const sorted = new Array<T>(array.length);

    for (let i = 0; i < array.length; i++) {
        const value = get(array[i]);
        const radix = getRadix(value, pass);
        counts[radix]++;
    }

    if (direction === 'asc') {
        for (let i = 1; i < counts.length; i++) {
            counts[i] += counts[i - 1];
        }
    } else {
        for (let i = counts.length - 2; i >= 0; i--) {
            counts[i] += counts[i + 1];
        }
    }

    for (let i = array.length - 1; i >= 0; i--) {
        const element = array[i];
        const value = get(element);

        const radix = getRadix(value, pass);
        counts[radix]--;

        const sortedIndex = counts[radix];
        sorted[sortedIndex] = element;
    }

    for (let i = 0; i < sorted.length; i++) {
        array[i] = sorted[i];
    }
}

function getRadix(value: number, pass: number): number {
    return Math.floor(value / NUMBER_BASE ** pass) % NUMBER_BASE;
}
