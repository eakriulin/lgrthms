// O(nm) time | O(m) space — where
// n is the length of the array
// m is the number of elements to find
export function findKSmallest<T, K>(array: T[], k: number, get?: (element: T) => K | T): T[] {
    if (k === 0) {
        return [];
    }

    if (array.length < k) {
        throw new Error(`Cannot find ${k} smallest elements in array with length ${array.length}`);
    }

    const smallest: T[] = new Array(k).fill(null);
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
export function findKLargest<T, K>(array: T[], k: number, get?: (element: T) => K | T): T[] {
    if (k === 0) {
        return [];
    }

    if (array.length < k) {
        throw new Error(`Cannot find ${k} largest elements in array with length ${array.length}`);
    }

    const largest: T[] = new Array(k).fill(null);
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
