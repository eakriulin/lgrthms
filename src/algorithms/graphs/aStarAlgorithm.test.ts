/* eslint-disable no-magic-numbers */
import { aStarAlgorithm } from './aStarAlgorithm';

describe('aStarAlgorithm', () => {
    test('aStarAlgorithm | adjacency matrix graph, valid start and finish points => valid path and distance are returned', () => {
        const matrix = [
            [0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
        ];

        expect(aStarAlgorithm({ row: 0, col: 0 }, { row: 0, col: 0 }, matrix)).toStrictEqual({ distance: 0, path: [{ row: 0, col: 0 }] });
        expect(aStarAlgorithm({ row: 0, col: 0 }, { row: 5, col: 4 }, matrix)).toStrictEqual({ distance: 9, path: [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 3, col: 4 }, { row: 4, col: 4 }, { row: 5, col: 4 }] });
        expect(aStarAlgorithm({ row: 1, col: 2 }, { row: 4, col: 2 }, matrix)).toStrictEqual({ distance: 7, path: [{ row: 1, col: 2 }, { row: 1, col: 3 }, { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 3, col: 4 }, { row: 4, col: 4 }, { row: 4, col: 3 }, { row: 4, col: 2 }] });
        expect(aStarAlgorithm({ row: 5, col: 4 }, { row: 0, col: 0 }, matrix)).toStrictEqual({ distance: 9, path: [{ row: 5, col: 4 }, { row: 4, col: 4 }, { row: 3, col: 4 }, { row: 2, col: 4 }, { row: 2, col: 3 }, { row: 1, col: 3 }, { row: 1, col: 2 }, { row: 1, col: 1 }, { row: 1, col: 0 }, { row: 0, col: 0 }] });
        expect(aStarAlgorithm({ row: 4, col: 2 }, { row: 1, col: 2 }, matrix)).toStrictEqual({ distance: 7, path: [{ row: 4, col: 2 }, { row: 4, col: 3 }, { row: 4, col: 4 }, { row: 3, col: 4 }, { row: 2, col: 4 }, { row: 2, col: 3 }, { row: 1, col: 3 }, { row: 1, col: 2 }] });
    });

    test('aStarAlgorithm | adjacency matrix graph, invalid start and finish points => empty path and no distance are returned', () => {
        const matrix = [
            [0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
        ];

        // out of bounds
        expect(aStarAlgorithm({ row: 0, col: 0 }, { row: -1, col: -1 }, matrix)).toStrictEqual({ distance: -1, path: [] });
        expect(aStarAlgorithm({ row: -2, col: -2 }, { row: 0, col: 0 }, matrix)).toStrictEqual({ distance: -1, path: [] });
        expect(aStarAlgorithm({ row: -3, col: -3 }, { row: -4, col: -4 }, matrix)).toStrictEqual({ distance: -1, path: [] });
        expect(aStarAlgorithm({ row: 0, col: 0 }, { row: 10, col: 10 }, matrix)).toStrictEqual({ distance: -1, path: [] });
        expect(aStarAlgorithm({ row: 20, col: 20 }, { row: 0, col: 0 }, matrix)).toStrictEqual({ distance: -1, path: [] });
        expect(aStarAlgorithm({ row: 30, col: 30 }, { row: 40, col: 40 }, matrix)).toStrictEqual({ distance: -1, path: [] });

        // obstacles
        expect(aStarAlgorithm({ row: 0, col: 0 }, { row: 0, col: 2 }, matrix)).toStrictEqual({ distance: -1, path: [] });
        expect(aStarAlgorithm({ row: 3, col: 1 }, { row: 0, col: 0 }, matrix)).toStrictEqual({ distance: -1, path: [] });
        expect(aStarAlgorithm({ row: 5, col: 2 }, { row: 5, col: 2 }, matrix)).toStrictEqual({ distance: -1, path: [] });
    });
});
