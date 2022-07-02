/* eslint-disable no-magic-numbers */
import { binarySearch, findNLargest, findNSmallest } from './search';

describe('binarySearch', () => {
    test('binarySearch | empty array, search for a value => not found', () => {
        const array = [];
        expect(binarySearch(array, 0)).toBe(undefined);
        expect(binarySearch(array, 'a string')).toBe(undefined);
        expect(binarySearch(array, null)).toBe(undefined);
    });

    test('binarySearch | sorted array, random values, find existing value => value returned', () => {
        const min = 5;
        const max = 100;
        const length = Math.floor(Math.random() * (max - min + 1)) + min;

        const numbers = Array.from({ length }, () => Math.floor(Math.random() * max));
        const strings = Array.from({ length }, () => Math.floor(Math.random() * max).toString());
        const objects = Array.from({ length }, () => ({ value: Math.floor(Math.random() * max) }));

        numbers.sort((a, b) => a - b);
        strings.sort();
        objects.sort((a, b) => a.value - b.value);

        expect(binarySearch(numbers, numbers[0])).toBe(numbers[0]);
        expect(binarySearch(numbers, numbers[2])).toBe(numbers[2]);
        expect(binarySearch(numbers, numbers[4])).toBe(numbers[4]);

        expect(binarySearch(strings, strings[0])).toBe(strings[0]);
        expect(binarySearch(strings, strings[2])).toBe(strings[2]);
        expect(binarySearch(strings, strings[4])).toBe(strings[4]);

        expect(binarySearch(objects, objects[0].value, object => object.value)).toStrictEqual(objects[0]);
        expect(binarySearch(objects, objects[2].value, object => object.value)).toStrictEqual(objects[2]);
        expect(binarySearch(objects, objects[4].value, object => object.value)).toStrictEqual(objects[4]);
    });

    test('binarySearch | sorted array, random values, find non-existing value => undefined', () => {
        const min = 5;
        const max = 100;
        const length = Math.floor(Math.random() * (max - min + 1)) + min;

        const numbers = Array.from({ length }, () => Math.floor(Math.random() * max));
        const strings = Array.from({ length }, () => Math.floor(Math.random() * max).toString());
        const objects = Array.from({ length }, () => ({ value: Math.floor(Math.random() * max) }));

        numbers.sort((a, b) => a - b);
        strings.sort();
        objects.sort((a, b) => a.value - b.value);

        expect(binarySearch(numbers, 101)).toBe(undefined);
        expect(binarySearch(numbers, 102)).toBe(undefined);
        expect(binarySearch(numbers, 103)).toBe(undefined);

        expect(binarySearch(strings, '104')).toBe(undefined);
        expect(binarySearch(strings, '105')).toBe(undefined);
        expect(binarySearch(strings, '106')).toBe(undefined);

        expect(binarySearch(objects, 107, object => object.value)).toBe(undefined);
        expect(binarySearch(objects, 108, object => object.value)).toBe(undefined);
        expect(binarySearch(objects, 109, object => object.value)).toBe(undefined);
    });

    test('findNSmallest |  array of length n, find 0 smallest => empty array', () => {
        const array = [4, 2, 1, 5, 6];
        expect(findNSmallest(array, 0)).toStrictEqual([]);
    });

    test('findNSmallest | array of length n, find n + 1 smallest => throw error', () => {
        const array = [4, 2, 1, 5, 6];
        let error: Error | undefined;

        try {
            findNSmallest(array, array.length + 1);
        } catch (e) {
            error = e;
        }

        expect(error).toBeTruthy();
    });

    test('findNSmallest | array of length n, find n smallest => sorted (asc) original array', () => {
        const numbers = [4, 2, 1, 5, 6];
        const smallestNumbers = findNSmallest(numbers, numbers.length);
        expect(smallestNumbers).toStrictEqual([1, 2, 4, 5, 6]);

        const strings = ['dddd', 'b', 'aa', 'eeeee', 'ffffff'];
        const smallestStrings = findNSmallest(strings, strings.length, string => string.length);
        expect(smallestStrings).toStrictEqual(['b', 'aa', 'dddd', 'eeeee', 'ffffff']);

        const objects = [{ value: 4 }, { value: 2 }, { value: 1 }, { value: 5 }, { value: 6 }];
        const smallestObjects = findNSmallest(objects, objects.length, object => object.value);
        expect(smallestObjects).toStrictEqual([{ value: 1 }, { value: 2 }, { value: 4 }, { value: 5 }, { value: 6 }]);
    });

    test('findNSmallest | array of length n, find 3 smallest => array of length 3', () => {
        const numbers = [4, 2, 1, 5, 6];
        const smallestNumbers = findNSmallest(numbers, 3);
        expect(smallestNumbers).toStrictEqual([1, 2, 4]);

        const strings = ['dddd', 'b', 'aa', 'eeeee', 'ffffff'];
        const smallestStrings = findNSmallest(strings, 3, string => string.length);
        expect(smallestStrings).toStrictEqual(['b', 'aa', 'dddd']);

        const objects = [{ value: 4 }, { value: 2 }, { value: 1 }, { value: 5 }, { value: 6 }];
        const smallestObjects = findNSmallest(objects, 3, object => object.value);
        expect(smallestObjects).toStrictEqual([{ value: 1 }, { value: 2 }, { value: 4 }]);
    });

    test('findNLargest |  array of length n, find 0 largest => empty array', () => {
        const array = [4, 2, 1, 5, 6];
        expect(findNLargest(array, 0)).toStrictEqual([]);
    });

    test('findNLargest | array of length n, find n + 1 largest => throw error', () => {
        const array = [4, 2, 1, 5, 6];
        let error: Error | undefined;

        try {
            findNLargest(array, array.length + 1);
        } catch (e) {
            error = e;
        }

        expect(error).toBeTruthy();
    });

    test('findNLargest | array of length n, find n largest => sorted (desc) original array', () => {
        const numbers = [4, 2, 1, 5, 6];
        const smallestNumbers = findNLargest(numbers, numbers.length);
        expect(smallestNumbers).toStrictEqual([6, 5, 4, 2, 1]);

        const strings = ['dddd', 'b', 'aa', 'eeeee', 'ffffff'];
        const smallestStrings = findNLargest(strings, strings.length, string => string.length);
        expect(smallestStrings).toStrictEqual(['ffffff', 'eeeee', 'dddd', 'aa', 'b']);

        const objects = [{ value: 4 }, { value: 2 }, { value: 1 }, { value: 5 }, { value: 6 }];
        const smallestObjects = findNLargest(objects, objects.length, object => object.value);
        expect(smallestObjects).toStrictEqual([{ value: 6 }, { value: 5 }, { value: 4 }, { value: 2 }, { value: 1 }]);
    });

    test('findNLargest | array of length n, find 3 largest => array of length 3', () => {
        const numbers = [4, 2, 6, 5, 6];
        const smallestNumbers = findNLargest(numbers, 3);
        expect(smallestNumbers).toStrictEqual([6, 6, 5]);

        const strings = ['dddd', 'b', 'aaaaaa', 'eeeee', 'ffffff'];
        const smallestStrings = findNLargest(strings, 3, string => string.length);
        expect(smallestStrings).toStrictEqual(['aaaaaa', 'ffffff', 'eeeee']);

        const objects = [{ value: 4 }, { value: 2 }, { value: 6 }, { value: 5 }, { value: 6 }];
        const smallestObjects = findNLargest(objects, 3, object => object.value);
        expect(smallestObjects).toStrictEqual([{ value: 6 }, { value: 6 }, { value: 5 }]);
    });
});
