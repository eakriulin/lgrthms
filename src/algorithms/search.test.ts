/* eslint-disable no-magic-numbers */
import { binarySearch } from './search';

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
});
