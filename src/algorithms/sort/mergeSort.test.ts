import { mergeSort } from './mergeSort';

describe('mergeSort', () => {
    test('mergeSort | random array, sort asc => sorted array', () => {
        const min = 5;
        const max = 100;
        const length = Math.floor(Math.random() * (max - min + 1)) + min;

        const numbers = Array.from({ length }, () => Math.floor(Math.random() * max));
        const strings = Array.from({ length }, () => Math.floor(Math.random() * max).toString());
        const objects = Array.from({ length }, () => ({ value: Math.floor(Math.random() * max) }));

        mergeSort(numbers, (a, b) => a - b);
        mergeSort(strings);
        mergeSort(objects, (a, b) => a.value - b.value);

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

    test('mergeSort | random array, sort desc => sorted array', () => {
        const min = 5;
        const max = 100;
        const length = Math.floor(Math.random() * (max - min + 1)) + min;

        const numbers = Array.from({ length }, () => Math.floor(Math.random() * max));
        const strings = Array.from({ length }, () => Math.floor(Math.random() * max).toString());
        const objects = Array.from({ length }, () => ({ value: Math.floor(Math.random() * max) }));

        mergeSort(numbers, (a, b) => b - a);
        mergeSort(strings, (a, b) => b.localeCompare(a));
        mergeSort(objects, (a, b) => b.value - a.value);

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
