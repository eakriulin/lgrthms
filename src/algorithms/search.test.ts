/* eslint-disable no-magic-numbers */
import { binarySearch, findNLargest, findNSmallest, searchInMatrix, searchInSortedMatrix, shiftedBinarySearch } from './search';

describe('binarySearch', () => {
    test('binarySearch | empty array, search for a value => undefined', () => {
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

        const numbersLastIdx = numbers.length - 1;
        const stringsLastIdx = strings.length - 1;
        const objectsLastIdx = objects.length - 1;

        expect(binarySearch(numbers, numbers[0])).toBe(numbers[0]);
        expect(binarySearch(numbers, numbers[2])).toBe(numbers[2]);
        expect(binarySearch(numbers, numbers[4])).toBe(numbers[4]);
        expect(binarySearch(numbers, numbers[numbersLastIdx - 1])).toBe(numbers[numbersLastIdx - 1]);
        expect(binarySearch(numbers, numbers[numbersLastIdx])).toBe(numbers[numbersLastIdx]);

        expect(binarySearch(strings, strings[0])).toBe(strings[0]);
        expect(binarySearch(strings, strings[2])).toBe(strings[2]);
        expect(binarySearch(strings, strings[4])).toBe(strings[4]);
        expect(binarySearch(strings, strings[stringsLastIdx - 1])).toBe(strings[stringsLastIdx - 1]);
        expect(binarySearch(strings, strings[stringsLastIdx])).toBe(strings[stringsLastIdx]);

        expect(binarySearch(objects, objects[0].value, object => object.value)).toStrictEqual(objects[0]);
        expect(binarySearch(objects, objects[2].value, object => object.value)).toStrictEqual(objects[2]);
        expect(binarySearch(objects, objects[4].value, object => object.value)).toStrictEqual(objects[4]);
        expect(binarySearch(objects, objects[objectsLastIdx - 1].value, object => object.value)).toStrictEqual(objects[objectsLastIdx - 1]);
        expect(binarySearch(objects, objects[objectsLastIdx].value, object => object.value)).toStrictEqual(objects[objectsLastIdx]);
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
        expect(binarySearch(numbers, 104)).toBe(undefined);

        expect(binarySearch(strings, '105')).toBe(undefined);
        expect(binarySearch(strings, '106')).toBe(undefined);
        expect(binarySearch(strings, '107')).toBe(undefined);
        expect(binarySearch(strings, '108')).toBe(undefined);

        expect(binarySearch(objects, 109, object => object.value)).toBe(undefined);
        expect(binarySearch(objects, 110, object => object.value)).toBe(undefined);
        expect(binarySearch(objects, 111, object => object.value)).toBe(undefined);
        expect(binarySearch(objects, 112, object => object.value)).toBe(undefined);
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

    test('shiftedBinarySearch | empty array, search for a value => undefined', () => {
        const array = [];
        expect(shiftedBinarySearch(array, 0)).toBe(undefined);
        expect(shiftedBinarySearch(array, 'a string')).toBe(undefined);
        expect(shiftedBinarySearch(array, null)).toBe(undefined);
    });

    test('shiftedBinarySearch | sorted array (shifted at random index), random values, find existing value => value returned', () => {
        const min = 5;
        const max = 100;
        const length = Math.floor(Math.random() * (max - min + 1)) + min;

        const numbers = Array.from({ length }, () => Math.floor(Math.random() * max));
        const strings = Array.from({ length }, () => Math.floor(Math.random() * max).toString());
        const objects = Array.from({ length }, () => ({ value: Math.floor(Math.random() * max) }));

        numbers.sort((a, b) => a - b);
        strings.sort();
        objects.sort((a, b) => a.value - b.value);

        const numbersIdx = Math.floor(Math.random() * numbers.length / 2);
        const stringsIdx = Math.floor(Math.random() * strings.length / 2);
        const objectsIdx = Math.floor(Math.random() * objects.length / 2);

        const numbersPart = numbers.splice(numbersIdx);
        const stringsPart = strings.splice(stringsIdx);
        const objectsPart = objects.splice(objectsIdx);

        const shiftedNumbers = [...numbersPart, ...numbers];
        const shiftedStrings = [...stringsPart, ...strings];
        const shiftedObjects = [...objectsPart, ...objects];

        const numbersLastIdx = shiftedNumbers.length - 1;
        const stringsLastIdx = shiftedStrings.length - 1;
        const objectsLastIdx = shiftedObjects.length - 1;

        expect(shiftedBinarySearch(shiftedNumbers, shiftedNumbers[0])).toBe(shiftedNumbers[0]);
        expect(shiftedBinarySearch(shiftedNumbers, shiftedNumbers[2])).toBe(shiftedNumbers[2]);
        expect(shiftedBinarySearch(shiftedNumbers, shiftedNumbers[4])).toBe(shiftedNumbers[4]);
        expect(shiftedBinarySearch(shiftedNumbers, shiftedNumbers[numbersLastIdx - 1])).toBe(shiftedNumbers[numbersLastIdx - 1]);
        expect(shiftedBinarySearch(shiftedNumbers, shiftedNumbers[numbersLastIdx])).toBe(shiftedNumbers[numbersLastIdx]);

        expect(shiftedBinarySearch(shiftedStrings, shiftedStrings[0])).toBe(shiftedStrings[0]);
        expect(shiftedBinarySearch(shiftedStrings, shiftedStrings[2])).toBe(shiftedStrings[2]);
        expect(shiftedBinarySearch(shiftedStrings, shiftedStrings[4])).toBe(shiftedStrings[4]);
        expect(shiftedBinarySearch(shiftedStrings, shiftedStrings[stringsLastIdx - 1])).toBe(shiftedStrings[stringsLastIdx - 1]);
        expect(shiftedBinarySearch(shiftedStrings, shiftedStrings[stringsLastIdx])).toBe(shiftedStrings[stringsLastIdx]);

        expect(shiftedBinarySearch(shiftedObjects, shiftedObjects[0].value, object => object.value)).toStrictEqual(shiftedObjects[0]);
        expect(shiftedBinarySearch(shiftedObjects, shiftedObjects[2].value, object => object.value)).toStrictEqual(shiftedObjects[2]);
        expect(shiftedBinarySearch(shiftedObjects, shiftedObjects[4].value, object => object.value)).toStrictEqual(shiftedObjects[4]);
        expect(shiftedBinarySearch(shiftedObjects, shiftedObjects[objectsLastIdx - 1].value, object => object.value)).toStrictEqual(shiftedObjects[objectsLastIdx - 1]);
        expect(shiftedBinarySearch(shiftedObjects, shiftedObjects[objectsLastIdx].value, object => object.value)).toStrictEqual(shiftedObjects[objectsLastIdx]);
    });

    test('shiftedBinarySearch | sorted array (shifted at random index), random values, find non-existing value => undefined', () => {
        const min = 5;
        const max = 100;
        const length = Math.floor(Math.random() * (max - min + 1)) + min;

        const numbers = Array.from({ length }, () => Math.floor(Math.random() * max));
        const strings = Array.from({ length }, () => Math.floor(Math.random() * max).toString());
        const objects = Array.from({ length }, () => ({ value: Math.floor(Math.random() * max) }));

        numbers.sort((a, b) => a - b);
        strings.sort();
        objects.sort((a, b) => a.value - b.value);

        const numbersIdx = Math.floor(Math.random() * numbers.length / 2);
        const stringsIdx = Math.floor(Math.random() * strings.length / 2);
        const objectsIdx = Math.floor(Math.random() * objects.length / 2);

        const numbersPart = numbers.splice(numbersIdx);
        const stringsPart = strings.splice(stringsIdx);
        const objectsPart = objects.splice(objectsIdx);

        const shiftedNumbers = [...numbersPart, ...numbers];
        const shiftedStrings = [...stringsPart, ...strings];
        const shiftedObjects = [...objectsPart, ...objects];

        expect(shiftedBinarySearch(shiftedNumbers, 101)).toBe(undefined);
        expect(shiftedBinarySearch(shiftedNumbers, 102)).toBe(undefined);
        expect(shiftedBinarySearch(shiftedNumbers, 103)).toBe(undefined);
        expect(shiftedBinarySearch(shiftedNumbers, 104)).toBe(undefined);

        expect(shiftedBinarySearch(shiftedStrings, '105')).toBe(undefined);
        expect(shiftedBinarySearch(shiftedStrings, '106')).toBe(undefined);
        expect(shiftedBinarySearch(shiftedStrings, '107')).toBe(undefined);
        expect(shiftedBinarySearch(shiftedStrings, '108')).toBe(undefined);

        expect(shiftedBinarySearch(shiftedObjects, 109, object => object.value)).toBe(undefined);
        expect(shiftedBinarySearch(shiftedObjects, 110, object => object.value)).toBe(undefined);
        expect(shiftedBinarySearch(shiftedObjects, 111, object => object.value)).toBe(undefined);
        expect(shiftedBinarySearch(shiftedObjects, 112, object => object.value)).toBe(undefined);
    });

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
