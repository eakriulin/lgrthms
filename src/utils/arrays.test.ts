import { swap } from './arrays';

/* eslint-disable no-magic-numbers */
describe('arrays', () => {
    test('swap | indexes are in bounds => values are swapped', () => {
        const array = [1, 2, 3, 4, 5];

        swap(array, 0, 4);
        expect(array[0]).toBe(5);
        expect(array[4]).toBe(1);

        swap(array, 1, 3);
        expect(array[1]).toBe(4);
        expect(array[3]).toBe(2);
    });

    test('swap | indexes are out of bounds => values are not swapped', () => {
        const array = [1, 2, 3, 4, 5];
        let error: Error | undefined;

        try {
            swap(array, -1, 6);
        } catch (e) {
            error = e;
        }

        expect(error).toBeTruthy();
    });
});
