/* eslint-disable no-magic-numbers */
import { radixSort } from './radixSort';

describe('radixSort', () => {
    test('radixSort | random array, sort asc => sorted array', () => {
        const min = 5;
        const max = 100;
        const length = Math.floor(Math.random() * (max - min + 1)) + min;

        const numbers = Array.from({ length }, () => Math.floor(Math.random() * max));
        const objects = Array.from({ length }, () => ({ value: Math.floor(Math.random() * max) }));

        radixSort(numbers, 'asc');
        radixSort(objects, 'asc', object => object.value);

        for (let i = 1; i < numbers.length; i++) {
            expect(numbers[i - 1]).toBeLessThanOrEqual(numbers[i]);
        }

        for (let i = 1; i < objects.length; i++) {
            expect(objects[i - 1].value).toBeLessThanOrEqual(objects[i].value);
        }
    });

    test('radixSort | random array, sort desc => sorted array', () => {
        const min = 5;
        const max = 100;
        const length = Math.floor(Math.random() * (max - min + 1)) + min;

        const numbers = Array.from({ length }, () => Math.floor(Math.random() * max));
        const objects = Array.from({ length }, () => ({ value: Math.floor(Math.random() * max) }));

        radixSort(numbers, 'desc');
        radixSort(objects, 'desc', object => object.value);

        for (let i = 1; i < numbers.length; i++) {
            expect(numbers[i - 1]).toBeGreaterThanOrEqual(numbers[i]);
        }

        for (let i = 1; i < objects.length; i++) {
            expect(objects[i - 1].value).toBeGreaterThanOrEqual(objects[i].value);
        }
    });
});
