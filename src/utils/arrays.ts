export function swap<T>(array: T[], i: number, j: number): void {
    if (i < 0 || j < 0 || i > array.length - 1 || j > array.length - 1) {
        throw new Error('Cannot swap values in array, indexes are out of bounds');
    }

    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
