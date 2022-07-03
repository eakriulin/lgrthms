/* eslint-disable no-magic-numbers */
import { searchInMatrix, searchInSortedMatrix } from './searchInMatrix';

describe('searchInMatrix', () => {
    test('searchInMatrix | empty matrix, search for a value => undefined', () => {
        const matrix = [[]];
        expect(searchInMatrix(matrix, 0)).toBe(undefined);
        expect(searchInMatrix(matrix, 'a string')).toBe(undefined);
        expect(searchInMatrix(matrix, null)).toBe(undefined);
    });

    test('searchInMatrix | matrix, search for an existing value => value returned', () => {
        const numbers = [[20, 21, 22, 23, 24], [0, 1, 2, 3, 4], [10, 11, 12, 13, 14]];
        const strings = [['20', '21', '22', '23', '24'], ['0', '1', '2', '3', '4'], ['10', '11', '12', '13', '14']];
        const objects = [[{ value: 20 }, { value: 21 }, { value: 22 }, { value: 23 }, { value: 24 }], [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }], [{ value: 10 }, { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }]];

        expect(searchInMatrix(numbers, numbers[0][0])).toBe(numbers[0][0]);
        expect(searchInMatrix(numbers, numbers[1][2])).toBe(numbers[1][2]);
        expect(searchInMatrix(numbers, numbers[2][4])).toBe(numbers[2][4]);

        expect(searchInMatrix(strings, strings[0][0])).toBe(strings[0][0]);
        expect(searchInMatrix(strings, strings[1][2])).toBe(strings[1][2]);
        expect(searchInMatrix(strings, strings[2][4])).toBe(strings[2][4]);

        expect(searchInMatrix(objects, objects[0][0].value, object => object.value)).toBe(objects[0][0]);
        expect(searchInMatrix(objects, objects[1][2].value, object => object.value)).toBe(objects[1][2]);
        expect(searchInMatrix(objects, objects[2][4].value, object => object.value)).toBe(objects[2][4]);
    });

    test('searchInMatrix | matrix, search for a non-existing value => undefined', () => {
        const numbers = [[20, 21, 22, 23, 24], [0, 1, 2, 3, 4], [10, 11, 12, 13, 14]];
        const strings = [['20', '21', '22', '23', '24'], ['0', '1', '2', '3', '4'], ['10', '11', '12', '13', '14']];
        const objects = [[{ value: 20 }, { value: 21 }, { value: 22 }, { value: 23 }, { value: 24 }], [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }], [{ value: 10 }, { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }]];

        expect(searchInMatrix(numbers, 100)).toBe(undefined);
        expect(searchInMatrix(numbers, 200)).toBe(undefined);
        expect(searchInMatrix(numbers, 300)).toBe(undefined);

        expect(searchInMatrix(strings, 'non')).toBe(undefined);
        expect(searchInMatrix(strings, 'existing')).toBe(undefined);
        expect(searchInMatrix(strings, 'string')).toBe(undefined);

        expect(searchInMatrix(objects, 400, object => object.value)).toBe(undefined);
        expect(searchInMatrix(objects, 500, object => object.value)).toBe(undefined);
        expect(searchInMatrix(objects, 600, object => object.value)).toBe(undefined);
    });

    test('searchInSortedMatrix | empty matrix, search for a value => undefined', () => {
        const matrix = [[]];
        expect(searchInSortedMatrix(matrix, 0)).toBe(undefined);
        expect(searchInSortedMatrix(matrix, 'a string')).toBe(undefined);
        expect(searchInSortedMatrix(matrix, null)).toBe(undefined);
    });

    test('searchInSortedMatrix | sorted matrix, search for an existing value => value returned', () => {
        const numbers = [[0, 1, 2, 3, 4], [10, 11, 12, 13, 14], [20, 21, 22, 23, 24]];
        const strings = [['0', '1', '2', '3', '4'], ['00', '11', '22', '33', '44'], ['000', '111', '222', '333', '444']];
        const objects = [[{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }], [{ value: 10 }, { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }], [{ value: 20 }, { value: 21 }, { value: 22 }, { value: 23 }, { value: 24 }]];

        expect(searchInSortedMatrix(numbers, numbers[0][0])).toBe(numbers[0][0]);
        expect(searchInSortedMatrix(numbers, numbers[1][2])).toBe(numbers[1][2]);
        expect(searchInSortedMatrix(numbers, numbers[2][4])).toBe(numbers[2][4]);

        expect(searchInSortedMatrix(strings, strings[0][0])).toBe(strings[0][0]);
        expect(searchInSortedMatrix(strings, strings[1][2])).toBe(strings[1][2]);
        expect(searchInSortedMatrix(strings, strings[2][4])).toBe(strings[2][4]);

        expect(searchInSortedMatrix(objects, objects[0][0].value, object => object.value)).toBe(objects[0][0]);
        expect(searchInSortedMatrix(objects, objects[1][2].value, object => object.value)).toBe(objects[1][2]);
        expect(searchInSortedMatrix(objects, objects[2][4].value, object => object.value)).toBe(objects[2][4]);
    });

    test('searchInSortedMatrix | sorted matrix, search for a non-existing value => undefined', () => {
        const numbers = [[0, 1, 2, 3, 4], [10, 11, 12, 13, 14], [20, 21, 22, 23, 24]];
        const strings = [['0', '1', '2', '3', '4'], ['00', '11', '22', '33', '44'], ['000', '111', '222', '333', '444']];
        const objects = [[{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }], [{ value: 10 }, { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }], [{ value: 20 }, { value: 21 }, { value: 22 }, { value: 23 }, { value: 24 }]];

        expect(searchInSortedMatrix(numbers, 100)).toBe(undefined);
        expect(searchInSortedMatrix(numbers, 200)).toBe(undefined);
        expect(searchInSortedMatrix(numbers, 300)).toBe(undefined);

        expect(searchInSortedMatrix(strings, 'non')).toBe(undefined);
        expect(searchInSortedMatrix(strings, 'existing')).toBe(undefined);
        expect(searchInSortedMatrix(strings, 'string')).toBe(undefined);

        expect(searchInSortedMatrix(objects, 400, object => object.value)).toBe(undefined);
        expect(searchInSortedMatrix(objects, 500, object => object.value)).toBe(undefined);
        expect(searchInSortedMatrix(objects, 600, object => object.value)).toBe(undefined);
    });
});
