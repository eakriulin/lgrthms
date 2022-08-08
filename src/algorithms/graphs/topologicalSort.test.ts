/* eslint-disable no-magic-numbers */
import { topologicalSort } from './topologicalSort';

describe('topologicalSort', () => {
    test('topologicalSort | valid dependencies array (no cycles) => sorted array is returned', () => {
        const numbers = [1, 2, 3, 4];
        const numberDependencies = [
            { dependency: 2, prerequisite: 1 },
            { dependency: 3, prerequisite: 1 },
            { dependency: 2, prerequisite: 3 },
            { dependency: 2, prerequisite: 4 },
            { dependency: 3, prerequisite: 4 },
        ];

        const strings = ['a', 'b', 'c', 'd', 'e'];
        const stringDependencies = [
            { dependency: 'b', prerequisite: 'a' },
            { dependency: 'c', prerequisite: 'a' },
            { dependency: 'b', prerequisite: 'c' },
            { dependency: 'b', prerequisite: 'd' },
            { dependency: 'c', prerequisite: 'd' },
        ];

        const objects = [{ value: 100 }, { value: 13 }, { value: 50 }, { value: 21 }, { value: 76 }, { value: 48 }];
        const objectDependencies = [
            { dependency: 21, prerequisite: 13 },
            { dependency: 50, prerequisite: 21 },
            { dependency: 48, prerequisite: 21 },
            { dependency: 76, prerequisite: 50 },
            { dependency: 100, prerequisite: 48 },
            { dependency: 100, prerequisite: 76 },
        ];

        const numbersSorted = [1, 4, 3, 2];
        const stringsSorted = ['a', 'd', 'c', 'b', 'e'];
        const objectsSorted = [{ value: 13 }, { value: 21 }, { value: 48 }, { value: 50 }, { value: 76 }, { value: 100 }];

        expect(topologicalSort(numbers, numberDependencies)).toStrictEqual(numbersSorted);
        expect(topologicalSort(strings, stringDependencies)).toStrictEqual(stringsSorted);
        expect(topologicalSort(objects, objectDependencies, (element) => element.value)).toStrictEqual(objectsSorted);
    });

    test('topologicalSort | invalid dependencies array (contains cycles) => throw error', () => {
        const numbers = [1, 2, 3, 4];
        const numberDependencies = [
            { dependency: 2, prerequisite: 1 },
            { dependency: 3, prerequisite: 1 },
            { dependency: 2, prerequisite: 3 },
            { dependency: 2, prerequisite: 4 },
            { dependency: 3, prerequisite: 4 },
            { dependency: 1, prerequisite: 2 },
        ];

        const strings = ['a', 'b', 'c', 'd', 'e'];
        const stringDependencies = [
            { dependency: 'b', prerequisite: 'a' },
            { dependency: 'c', prerequisite: 'a' },
            { dependency: 'b', prerequisite: 'c' },
            { dependency: 'b', prerequisite: 'd' },
            { dependency: 'c', prerequisite: 'd' },
            { dependency: 'a', prerequisite: 'b' },
        ];

        const objects = [{ value: 100 }, { value: 13 }, { value: 50 }, { value: 21 }, { value: 76 }, { value: 48 }];
        const objectDependencies = [
            { dependency: 21, prerequisite: 13 },
            { dependency: 50, prerequisite: 21 },
            { dependency: 48, prerequisite: 21 },
            { dependency: 76, prerequisite: 50 },
            { dependency: 100, prerequisite: 48 },
            { dependency: 100, prerequisite: 76 },
            { dependency: 13, prerequisite: 100 },
        ];

        let error: Error | undefined = undefined;

        try {
            topologicalSort(numbers, numberDependencies);
        } catch (e) {
            error = e;
        }
        expect(error).toBeTruthy();

        error = undefined;

        try {
            topologicalSort(strings, stringDependencies);
        } catch (e) {
            error = e;
        }
        expect(error).toBeTruthy();

        error = undefined;

        try {
            topologicalSort(objects, objectDependencies, (element) => element.value);
        } catch (e) {
            error = e;
        }
        expect(error).toBeTruthy();
    });
});
