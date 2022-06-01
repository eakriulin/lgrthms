/* eslint-disable no-magic-numbers */
import { Comparator } from './Comparator';

describe('Comparator', () => {
    test('isEqual | compare two numbers, default comparator => A === A, A !== B', () => {
        const comparator = new Comparator();

        expect(comparator.isEqual(100, 100)).toBe(true);
        expect(comparator.isEqual(100, 200)).toBe(false);
    });

    test('isEqual | compare two strings by length, custom comparator => A === A, A !== B', () => {
        const comparator = new Comparator((a: string, b: string) => a.length - b.length);

        expect(comparator.isEqual('apple', 'apple')).toBe(true);
        expect(comparator.isEqual('apple', 'watermelon')).toBe(false);
    });

    test('isEqual | compare two objects by a nested field, custom comparator => A === A, A !== B', () => {
        const comparator = new Comparator((a: { score: number }, b: { score: number }) => a.score - b.score);

        expect(comparator.isEqual({ score: 1.5 }, { score: 1.5 })).toBe(true);
        expect(comparator.isEqual({ score: 1.5 }, { score: 1.6 })).toBe(false);
    });

    test('isLessThan | compare two numbers, default comparator => A < B, !B < A, !A < A', () => {
        const comparator = new Comparator();

        expect(comparator.isLessThan(1, 2)).toBe(true);
        expect(comparator.isLessThan(2, 1)).toBe(false);
        expect(comparator.isLessThan(1, 1)).toBe(false);
    });

    test('isLessThan | compare two strings by length, custom comparator => A < B, !B < A, !A < A', () => {
        const comparator = new Comparator((a: string, b: string) => a.length - b.length);

        expect(comparator.isLessThan('apple', 'watermelon')).toBe(true);
        expect(comparator.isLessThan('watermelon', 'apple')).toBe(false);
        expect(comparator.isLessThan('watermelon', 'watermelon')).toBe(false);
    });

    test('isLessThan | compare two objects by a nested field, custom comparator => A < B, !B < A, !A < A', () => {
        const comparator = new Comparator((a: { score: number }, b: { score: number }) => a.score - b.score);

        expect(comparator.isLessThan({ score: 1.5 }, { score: 1.6 })).toBe(true);
        expect(comparator.isLessThan({ score: 1.6 }, { score: 1.5 })).toBe(false);
        expect(comparator.isLessThan({ score: 1.6 }, { score: 1.6 })).toBe(false);
    });

    test('isGreaterThan | compare two numbers, default comparator => A > B, !B > A, !A > A', () => {
        const comparator = new Comparator();

        expect(comparator.isGreaterThan(2, 1)).toBe(true);
        expect(comparator.isGreaterThan(1, 2)).toBe(false);
        expect(comparator.isGreaterThan(2, 2)).toBe(false);
    });

    test('isGreaterThan | compare two strings by length, custom comparator => A > B, !B > A, !A > A', () => {
        const comparator = new Comparator((a: string, b: string) => a.length - b.length);

        expect(comparator.isGreaterThan('watermelon', 'apple')).toBe(true);
        expect(comparator.isGreaterThan('apple', 'watermelon')).toBe(false);
        expect(comparator.isGreaterThan('watermelon', 'watermelon')).toBe(false);
    });

    test('isGreaterThan | compare two objects by a nested field, custom comparator => A > B, !B > A, !A > A', () => {
        const comparator = new Comparator((a: { score: number }, b: { score: number }) => a.score - b.score);

        expect(comparator.isGreaterThan({ score: 1.6 }, { score: 1.5 })).toBe(true);
        expect(comparator.isGreaterThan({ score: 1.1 }, { score: 1.6 })).toBe(false);
        expect(comparator.isGreaterThan({ score: 1.6 }, { score: 1.6 })).toBe(false);
    });

    test('isLessThanOrEqual | compare two numbers, default comparator => A < B, A === A, !B < A', () => {
        const comparator = new Comparator();

        expect(comparator.isLessThanOrEqual(1, 2)).toBe(true);
        expect(comparator.isLessThanOrEqual(1, 1)).toBe(true);
        expect(comparator.isLessThanOrEqual(2, 1)).toBe(false);
    });

    test('isLessThanOrEqual | compare two strings by length, custom comparator => A < B, A === A, !B < A', () => {
        const comparator = new Comparator((a: string, b: string) => a.length - b.length);

        expect(comparator.isLessThanOrEqual('apple', 'watermelon')).toBe(true);
        expect(comparator.isLessThanOrEqual('apple', 'apple')).toBe(true);
        expect(comparator.isLessThanOrEqual('watermelon', 'apple')).toBe(false);
    });

    test('isLessThanOrEqual | compare two objects by a nested field, custom comparator => A < B, A === A, !B < A', () => {
        const comparator = new Comparator((a: { score: number }, b: { score: number }) => a.score - b.score);

        expect(comparator.isLessThanOrEqual({ score: 1.5 }, { score: 1.6 })).toBe(true);
        expect(comparator.isLessThanOrEqual({ score: 1.5 }, { score: 1.5 })).toBe(true);
        expect(comparator.isLessThanOrEqual({ score: 1.6 }, { score: 1.5 })).toBe(false);
    });

    test('isGreaterThanOrEqual | compare two numbers, default comparator => A > B, A === A, !B > A', () => {
        const comparator = new Comparator();

        expect(comparator.isGreaterThanOrEqual(2, 1)).toBe(true);
        expect(comparator.isGreaterThanOrEqual(2, 2)).toBe(true);
        expect(comparator.isGreaterThanOrEqual(1, 2)).toBe(false);
    });

    test('isGreaterThanOrEqual | compare two strings by length, custom comparator => A > B, A === A, !B > A', () => {
        const comparator = new Comparator((a: string, b: string) => a.length - b.length);

        expect(comparator.isGreaterThanOrEqual('watermelon', 'apple')).toBe(true);
        expect(comparator.isGreaterThanOrEqual('watermelon', 'watermelon')).toBe(true);
        expect(comparator.isGreaterThanOrEqual('apple', 'watermelon')).toBe(false);
    });

    test('isGreaterThanOrEqual | compare two objects by a nested field, custom comparator => A > B, A === A, !B > A', () => {
        const comparator = new Comparator((a: { score: number }, b: { score: number }) => a.score - b.score);

        expect(comparator.isGreaterThanOrEqual({ score: 1.6 }, { score: 1.5 })).toBe(true);
        expect(comparator.isGreaterThanOrEqual({ score: 1.6 }, { score: 1.6 })).toBe(true);
        expect(comparator.isGreaterThanOrEqual({ score: 1.5 }, { score: 1.6 })).toBe(false);
    });
});
