/* eslint-disable no-magic-numbers */
import { bytesSort } from './bytesSort';

describe('bytesSort', () => {
    function getRandomSign(value: number): number {
        return value * (Math.random() < 0.5 ? -1 : 1);
    }

    test('bytesSort | random array, sort asc => sorted array', () => {
        const min = 5;
        const max = 100;
        const length = Math.floor(Math.random() * (max - min + 1)) + min;

        const numbers = Array.from({ length }, () => getRandomSign(Math.random() * max));
        const strings = Array.from({ length }, () => Math.floor(Math.random() * max).toString());
        const objects = Array.from({ length }, () => ({ value: getRandomSign(Math.random() * max) }));

        bytesSort(numbers, 'asc');
        bytesSort(strings, 'asc');
        bytesSort(objects, 'asc', object => object.value);

        for (let i = 1; i < numbers.length; i++) {
            expect(numbers[i - 1]).toBeLessThanOrEqual(numbers[i]);
        }

        for (let i = 1; i < strings.length; i++) {
            expect(strings[i - 1].localeCompare(strings[i])).toBeLessThanOrEqual(0);
        }

        for (let i = 1; i < objects.length; i++) {
            expect(objects[i - 1].value).toBeLessThanOrEqual(objects[i].value);
        }
    });

    test('bytesSort | random array, sort desc => sorted array', () => {
        const min = 5;
        const max = 100;
        const length = Math.floor(Math.random() * (max - min + 1)) + min;

        const numbers = Array.from({ length }, () => getRandomSign(Math.random() * max));
        const strings = Array.from({ length }, () => Math.floor(Math.random() * max).toString());
        const objects = Array.from({ length }, () => ({ value: getRandomSign(Math.random() * max) }));

        bytesSort(numbers, 'desc');
        bytesSort(strings, 'desc');
        bytesSort(objects, 'desc', object => object.value);

        for (let i = 1; i < numbers.length; i++) {
            expect(numbers[i - 1]).toBeGreaterThanOrEqual(numbers[i]);
        }

        for (let i = 1; i < strings.length; i++) {
            expect(strings[i - 1].localeCompare(strings[i])).toBeGreaterThanOrEqual(0);
        }

        for (let i = 1; i < objects.length; i++) {
            expect(objects[i - 1].value).toBeGreaterThanOrEqual(objects[i].value);
        }
    });
});
