/* eslint-disable no-magic-numbers */
import { quickselectKthLargest, quickselectKthSmallest } from './quickselect';

describe('quickselect', () => {
    test('quickselectKthSmallest | array, k is out of scope => undefined', () => {
        const array = [4, 2, 1, 5, 6];
        expect(quickselectKthSmallest(array, -10)).toBe(undefined);
        expect(quickselectKthSmallest(array, 0)).toBe(undefined);
        expect(quickselectKthSmallest(array, 100)).toBe(undefined);
    });

    test('quickselectKthSmallest | array, k is in scope => k-th smallest value returned', () => {
        const numbers = [4, 2, 1, 5, 6];
        expect(quickselectKthSmallest(numbers, 1)).toBe(1);
        expect(quickselectKthSmallest(numbers, 2)).toBe(2);
        expect(quickselectKthSmallest(numbers, 3)).toBe(4);
        expect(quickselectKthSmallest(numbers, 4)).toBe(5);
        expect(quickselectKthSmallest(numbers, 5)).toBe(6);

        const strings = ['dddd', 'b', 'aa', 'eeeee', 'ffffff'];
        expect(quickselectKthSmallest(strings, 1, string => string.length)).toBe('b');
        expect(quickselectKthSmallest(strings, 2, string => string.length)).toBe('aa');
        expect(quickselectKthSmallest(strings, 3, string => string.length)).toBe('dddd');
        expect(quickselectKthSmallest(strings, 4, string => string.length)).toBe('eeeee');
        expect(quickselectKthSmallest(strings, 5, string => string.length)).toBe('ffffff');

        const objects = [{ value: 4 }, { value: 2 }, { value: 1 }, { value: 5 }, { value: 6 }];
        expect(quickselectKthSmallest(objects, 1, object => object.value)).toStrictEqual({ value: 1 });
        expect(quickselectKthSmallest(objects, 2, object => object.value)).toStrictEqual({ value: 2 });
        expect(quickselectKthSmallest(objects, 3, object => object.value)).toStrictEqual({ value: 4 });
        expect(quickselectKthSmallest(objects, 4, object => object.value)).toStrictEqual({ value: 5 });
        expect(quickselectKthSmallest(objects, 5, object => object.value)).toStrictEqual({ value: 6 });
    });

    test('quickselectKthLargest | array, k is out of scope => undefined', () => {
        const array = [4, 2, 1, 5, 6];
        expect(quickselectKthLargest(array, -10)).toBe(undefined);
        expect(quickselectKthLargest(array, 0)).toBe(undefined);
        expect(quickselectKthLargest(array, 100)).toBe(undefined);
    });

    test('quickselectKthLargest | array, k is in scope => k-th smallest value returned', () => {
        const numbers = [4, 2, 1, 5, 6];
        expect(quickselectKthLargest(numbers, 1)).toBe(6);
        expect(quickselectKthLargest(numbers, 2)).toBe(5);
        expect(quickselectKthLargest(numbers, 3)).toBe(4);
        expect(quickselectKthLargest(numbers, 4)).toBe(2);
        expect(quickselectKthLargest(numbers, 5)).toBe(1);

        const strings = ['dddd', 'b', 'aa', 'eeeee', 'ffffff'];
        expect(quickselectKthLargest(strings, 1, string => string.length)).toBe('ffffff');
        expect(quickselectKthLargest(strings, 2, string => string.length)).toBe('eeeee');
        expect(quickselectKthLargest(strings, 3, string => string.length)).toBe('dddd');
        expect(quickselectKthLargest(strings, 4, string => string.length)).toBe('aa');
        expect(quickselectKthLargest(strings, 5, string => string.length)).toBe('b');

        const objects = [{ value: 4 }, { value: 2 }, { value: 1 }, { value: 5 }, { value: 6 }];
        expect(quickselectKthLargest(objects, 1, object => object.value)).toStrictEqual({ value: 6 });
        expect(quickselectKthLargest(objects, 2, object => object.value)).toStrictEqual({ value: 5 });
        expect(quickselectKthLargest(objects, 3, object => object.value)).toStrictEqual({ value: 4 });
        expect(quickselectKthLargest(objects, 4, object => object.value)).toStrictEqual({ value: 2 });
        expect(quickselectKthLargest(objects, 5, object => object.value)).toStrictEqual({ value: 1 });
    });
});
