const BYTES_IN_NUMBER = 4;
const MAX_BYTE_VALUE = 255;

export function bytesSort(array: number[], direction: 'asc' | 'desc'): number[]
export function bytesSort(array: string[], direction: 'asc' | 'desc'): string[]
export function bytesSort<T>(array: T[], direction: 'asc' | 'desc', get: (element: T) => number | string): T[]
export function bytesSort<T>(array: T[], direction: 'asc' | 'desc', get?: (element: T) => number | string): T[] {
    if (array.length <= 1) {
        return array;
    }

    get = get ? get : (element: T | number | string): number | string => element as number | string;

    const buffers: Buffer[] = new Array(array.length);
    let maxLength = 0;

    for (let i = 0; i < array.length; i++) {
        const bytes = toBuffer(array[i], get);
        buffers[i] = bytes;
        maxLength = Math.max(maxLength, bytes.length);
    }

    for (let i = maxLength - 1; i >= 0; i--) {
        countingSort(array, buffers, direction, i);
    }

    if (typeof get(array[0]) === 'number') {
        sortNegativeNumbers(array, get as (element: T) => number, direction);
    }

    return array;
}

function countingSort<T>(
    array: T[],
    buffers: Buffer[],
    direction: 'asc' | 'desc',
    index: number,
): void {
    const counts = new Array<number>(MAX_BYTE_VALUE + 1).fill(0);
    const sorted = new Array<T>(array.length);
    const sortedBuffers = new Array<Buffer>(array.length);

    for (let i = 0; i < array.length; i++) {
        const buffer = buffers[i];
        const byte = buffer[index] || 0;
        counts[byte]++;
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
        const buffer = buffers[i];

        const byte = buffer[index] || 0;
        counts[byte]--;

        const sortedIndex = counts[byte];

        sorted[sortedIndex] = element;
        sortedBuffers[sortedIndex] = buffer;
    }

    for (let i = 0; i < sorted.length; i++) {
        array[i] = sorted[i];
        buffers[i] = sortedBuffers[i];
    }
}

function sortNegativeNumbers<T>(array: T[], get: (element: T) => number, direction: 'asc' | 'desc'): void {
    const lastIndex = array.length - 1;

    if (direction === 'asc' && array[0] < array[lastIndex]) {
        return;
    }

    if (direction === 'desc' && array[0] > array[lastIndex]) {
        return;
    }

    const auxiliaryArray = [...array];
    let sortedIndex = direction === 'asc' ? 0 : lastIndex;
    let leftIndex = 0;
    let rightIndex = lastIndex;

    while(leftIndex <= rightIndex) {
        if (get(auxiliaryArray[leftIndex]) < get(auxiliaryArray[rightIndex])) {
            array[sortedIndex] = auxiliaryArray[leftIndex];
            leftIndex++;
        } else {
            array[sortedIndex] = auxiliaryArray[rightIndex];
            rightIndex--;
        }
        sortedIndex = direction === 'asc' ? sortedIndex + 1 : sortedIndex - 1;
    }
}

function toBuffer<T>(element: T, get: (element: T) => number | string): Buffer {
    const value = get(element);

    if (typeof value === 'string') {
        return Buffer.from(value);
    }

    const buffer = Buffer.allocUnsafe(BYTES_IN_NUMBER);
    buffer.writeFloatBE(value);
    return buffer;
}
