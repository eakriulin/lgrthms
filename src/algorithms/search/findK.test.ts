/* eslint-disable no-magic-numbers */
import { findKLargest, findKSmallest } from './findK';

describe('findK', () => {
    test('findKSmallest |  array of length n, find 0 smallest => empty array', () => {
        const array = [4, 2, 1, 5, 6];
        expect(findKSmallest(array, 0)).toStrictEqual([]);
    });

    test('findKSmallest | array of length n, find n + 1 smallest => throw error', () => {
        const array = [4, 2, 1, 5, 6];
        let error: Error | undefined;

        try {
            findKSmallest(array, array.length + 1);
        } catch (e) {
            error = e;
        }

        expect(error).toBeTruthy();
    });

    test('findKSmallest | array of length n, find n smallest => sorted (asc) original array', () => {
        const numbers = [4, 2, 1, 5, 6];
        const smallestNumbers = findKSmallest(numbers, numbers.length);
        expect(smallestNumbers).toStrictEqual([1, 2, 4, 5, 6]);

        const strings = ['dddd', 'b', 'aa', 'eeeee', 'ffffff'];
        const smallestStrings = findKSmallest(strings, strings.length, string => string.length);
        expect(smallestStrings).toStrictEqual(['b', 'aa', 'dddd', 'eeeee', 'ffffff']);

        const objects = [{ value: 4 }, { value: 2 }, { value: 1 }, { value: 5 }, { value: 6 }];
        const smallestObjects = findKSmallest(objects, objects.length, object => object.value);
        expect(smallestObjects).toStrictEqual([{ value: 1 }, { value: 2 }, { value: 4 }, { value: 5 }, { value: 6 }]);
    });

    test('findKSmallest | array of length n, find 3 smallest => array of length 3', () => {
        const numbers = [4, 2, 1, 5, 6];
        const smallestNumbers = findKSmallest(numbers, 3);
        expect(smallestNumbers).toStrictEqual([1, 2, 4]);

        const strings = ['dddd', 'b', 'aa', 'eeeee', 'ffffff'];
        const smallestStrings = findKSmallest(strings, 3, string => string.length);
        expect(smallestStrings).toStrictEqual(['b', 'aa', 'dddd']);

        const objects = [{ value: 4 }, { value: 2 }, { value: 1 }, { value: 5 }, { value: 6 }];
        const smallestObjects = findKSmallest(objects, 3, object => object.value);
        expect(smallestObjects).toStrictEqual([{ value: 1 }, { value: 2 }, { value: 4 }]);
    });

    test('findKLargest |  array of length n, find 0 largest => empty array', () => {
        const array = [4, 2, 1, 5, 6];
        expect(findKLargest(array, 0)).toStrictEqual([]);
    });

    test('findKLargest | array of length n, find n + 1 largest => throw error', () => {
        const array = [4, 2, 1, 5, 6];
        let error: Error | undefined;

        try {
            findKLargest(array, array.length + 1);
        } catch (e) {
            error = e;
        }

        expect(error).toBeTruthy();
    });

    test('findKLargest | array of length n, find n largest => sorted (desc) original array', () => {
        const numbers = [4, 2, 1, 5, 6];
        const smallestNumbers = findKLargest(numbers, numbers.length);
        expect(smallestNumbers).toStrictEqual([6, 5, 4, 2, 1]);

        const strings = ['dddd', 'b', 'aa', 'eeeee', 'ffffff'];
        const smallestStrings = findKLargest(strings, strings.length, string => string.length);
        expect(smallestStrings).toStrictEqual(['ffffff', 'eeeee', 'dddd', 'aa', 'b']);

        const objects = [{ value: 4 }, { value: 2 }, { value: 1 }, { value: 5 }, { value: 6 }];
        const smallestObjects = findKLargest(objects, objects.length, object => object.value);
        expect(smallestObjects).toStrictEqual([{ value: 6 }, { value: 5 }, { value: 4 }, { value: 2 }, { value: 1 }]);
    });

    test('findKLargest | array of length n, find 3 largest => array of length 3', () => {
        const numbers = [4, 2, 6, 5, 6];
        const smallestNumbers = findKLargest(numbers, 3);
        expect(smallestNumbers).toStrictEqual([6, 6, 5]);

        const strings = ['dddd', 'b', 'aaaaaa', 'eeeee', 'ffffff'];
        const smallestStrings = findKLargest(strings, 3, string => string.length);
        expect(smallestStrings).toStrictEqual(['aaaaaa', 'ffffff', 'eeeee']);

        const objects = [{ value: 4 }, { value: 2 }, { value: 6 }, { value: 5 }, { value: 6 }];
        const smallestObjects = findKLargest(objects, 3, object => object.value);
        expect(smallestObjects).toStrictEqual([{ value: 6 }, { value: 6 }, { value: 5 }]);
    });
});
