/* eslint-disable no-magic-numbers */
import { binarySearch, searchForRange, shiftedBinarySearch } from './binarySearch';

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

    test('searchForRange | empty array, search for a value range => [-1, -1]', () => {
        const array = [];
        expect(searchForRange(array, 0)).toStrictEqual([-1, -1]);
        expect(searchForRange(array, 'a string')).toStrictEqual([-1, -1]);
        expect(searchForRange(array, null)).toStrictEqual([-1, -1]);
    });

    test('searchForRange | sorted array, search for an existing value range => range', () => {
        const numbers = [0, 1, 1, 13, 21, 21, 21, 21, 30, 30];
        const strings = ['0', '1', '1', '13', '21', '21', '21', '21', '30', '30'];
        const objects = [{ value: 0 }, { value: 1 }, { value: 1 }, { value: 13 }, { value: 21 }, { value: 21 }, { value: 21 }, { value: 21 }, { value: 30 }, { value: 30 }];

        expect(searchForRange(numbers, 0)).toStrictEqual([0, 0]);
        expect(searchForRange(numbers, 13)).toStrictEqual([3, 3]);
        expect(searchForRange(numbers, 1)).toStrictEqual([1, 2]);
        expect(searchForRange(numbers, 21)).toStrictEqual([4, 7]);
        expect(searchForRange(numbers, 30)).toStrictEqual([8, 9]);

        expect(searchForRange(strings, '0')).toStrictEqual([0, 0]);
        expect(searchForRange(strings, '13')).toStrictEqual([3, 3]);
        expect(searchForRange(strings, '1')).toStrictEqual([1, 2]);
        expect(searchForRange(strings, '21')).toStrictEqual([4, 7]);
        expect(searchForRange(strings, '30')).toStrictEqual([8, 9]);

        expect(searchForRange(objects, 0, object => object.value)).toStrictEqual([0, 0]);
        expect(searchForRange(objects, 13, object => object.value)).toStrictEqual([3, 3]);
        expect(searchForRange(objects, 1, object => object.value)).toStrictEqual([1, 2]);
        expect(searchForRange(objects, 21, object => object.value)).toStrictEqual([4, 7]);
        expect(searchForRange(objects, 30, object => object.value)).toStrictEqual([8, 9]);
    });

    test('searchForRange | sorted array, search for a non-existing value range => [-1, -1]', () => {
        const numbers = [0, 1, 1, 13, 21, 21, 21, 21, 30, 30];
        const strings = ['0', '1', '1', '13', '21', '21', '21', '21', '30', '30'];
        const objects = [{ value: 0 }, { value: 1 }, { value: 1 }, { value: 13 }, { value: 21 }, { value: 21 }, { value: 21 }, { value: 21 }, { value: 30 }, { value: 30 }];

        expect(searchForRange(numbers, 100)).toStrictEqual([-1, -1]);
        expect(searchForRange(numbers, 200)).toStrictEqual([-1, -1]);
        expect(searchForRange(numbers, -10)).toStrictEqual([-1, -1]);

        expect(searchForRange(strings, 'non')).toStrictEqual([-1, -1]);
        expect(searchForRange(strings, 'existing')).toStrictEqual([-1, -1]);
        expect(searchForRange(strings, 'string')).toStrictEqual([-1, -1]);

        expect(searchForRange(objects, 300, object => object.value)).toStrictEqual([-1, -1]);
        expect(searchForRange(objects, -20, object => object.value)).toStrictEqual([-1, -1]);
        expect(searchForRange(objects, 400, object => object.value)).toStrictEqual([-1, -1]);
    });
});
