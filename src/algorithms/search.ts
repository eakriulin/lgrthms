export function binarySearch<T, K>(
    array: T[],
    target: T | K,
    get?: (element: T) => K,
): T | undefined {
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
