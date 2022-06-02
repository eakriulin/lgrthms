/* eslint-disable no-magic-numbers */
import { MinHeap } from './MinHeap';

describe('MinHeap', () => {
    test('init | new instance => size is 0', () => {
        const heap = new MinHeap<number>();
        expect(heap).toBeTruthy();
        expect(heap.size).toBe(0);
    });

    test('insert, peek | insert a handful of values, default comparator => size is updated, min heap property is preserved', () => {
        const heap = new MinHeap<number>();

        heap.insert(10);
        expect(heap.size).toBe(1);
        expect(heap.peek()).toBe(10);

        heap.insert(9);
        expect(heap.size).toBe(2);
        expect(heap.peek()).toBe(9);

        heap.insert(8);
        expect(heap.size).toBe(3);
        expect(heap.peek()).toBe(8);

        heap.insert(7);
        expect(heap.size).toBe(4);
        expect(heap.peek()).toBe(7);

        heap.insert(100);
        expect(heap.size).toBe(5);
        expect(heap.peek()).toBe(7);

        heap.insert(50);
        expect(heap.size).toBe(6);
        expect(heap.peek()).toBe(7);

        heap.insert(6);
        expect(heap.size).toBe(7);
        expect(heap.peek()).toBe(6);

        heap.insert(42);
        expect(heap.size).toBe(8);
        expect(heap.peek()).toBe(6);

        heap.insert(5);
        expect(heap.size).toBe(9);
        expect(heap.peek()).toBe(5);
    });

    test('insert, peek | insert a handful of values, custom comparator => size is updated, min heap property is preserved', () => {
        interface IValue { value: number }

        const compare = (a: IValue, b: IValue): number => a.value - b.value;
        const heap = new MinHeap<IValue>(compare);

        heap.insert({ value: 10 });
        expect(heap.size).toBe(1);
        expect(heap.peek()).toStrictEqual({ value: 10 });

        heap.insert({ value: 9 });
        expect(heap.size).toBe(2);
        expect(heap.peek()).toStrictEqual({ value: 9 });

        heap.insert({ value: 8 });
        expect(heap.size).toBe(3);
        expect(heap.peek()).toStrictEqual({ value: 8 });

        heap.insert({ value: 7 });
        expect(heap.size).toBe(4);
        expect(heap.peek()).toStrictEqual({ value: 7 });

        heap.insert({ value: 100 });
        expect(heap.size).toBe(5);
        expect(heap.peek()).toStrictEqual({ value: 7 });

        heap.insert({ value: 50 });
        expect(heap.size).toBe(6);
        expect(heap.peek()).toStrictEqual({ value: 7 });

        heap.insert({ value: 6 });
        expect(heap.size).toBe(7);
        expect(heap.peek()).toStrictEqual({ value: 6 });

        heap.insert({ value: 42 });
        expect(heap.size).toBe(8);
        expect(heap.peek()).toStrictEqual({ value: 6 });

        heap.insert({ value: 5 });
        expect(heap.size).toBe(9);
        expect(heap.peek()).toStrictEqual({ value: 5 });
    });

    test('extract | extract from an empty heap => undefined, size 0', () => {
        const heap = new MinHeap<number>();
        expect(heap.extract()).toBe(undefined);
        expect(heap.size).toBe(0);
    });

    test('extract | extract min value, default comparator => min value, size is updated', () => {
        const heap = new MinHeap<number>();

        heap.insert(10);
        heap.insert(9);
        heap.insert(8);
        heap.insert(7);
        heap.insert(100);
        heap.insert(50);
        heap.insert(6);
        heap.insert(42);
        heap.insert(5);

        expect(heap.size).toBe(9);

        expect(heap.extract()).toBe(5);
        expect(heap.size).toBe(8);

        expect(heap.extract()).toBe(6);
        expect(heap.size).toBe(7);

        expect(heap.extract()).toBe(7);
        expect(heap.size).toBe(6);

        expect(heap.extract()).toBe(8);
        expect(heap.size).toBe(5);

        expect(heap.extract()).toBe(9);
        expect(heap.size).toBe(4);

        expect(heap.extract()).toBe(10);
        expect(heap.size).toBe(3);

        expect(heap.extract()).toBe(42);
        expect(heap.size).toBe(2);

        expect(heap.extract()).toBe(50);
        expect(heap.size).toBe(1);

        expect(heap.extract()).toBe(100);
        expect(heap.size).toBe(0);
    });

    test('extract | extract min value, custom comparator => min value, size is updated', () => {
        interface IValue { value: number }

        const compare = (a: IValue, b: IValue): number => a.value - b.value;
        const heap = new MinHeap<IValue>(compare);

        heap.insert({ value: 10 });
        heap.insert({ value: 9 });
        heap.insert({ value: 8 });
        heap.insert({ value: 7 });
        heap.insert({ value: 100 });
        heap.insert({ value: 50 });
        heap.insert({ value: 6 });
        heap.insert({ value: 42 });
        heap.insert({ value: 5 });

        expect(heap.size).toBe(9);

        expect(heap.extract()).toStrictEqual({ value: 5 });
        expect(heap.size).toBe(8);

        expect(heap.extract()).toStrictEqual({ value: 6 });
        expect(heap.size).toBe(7);

        expect(heap.extract()).toStrictEqual({ value: 7 });
        expect(heap.size).toBe(6);

        expect(heap.extract()).toStrictEqual({ value: 8 });
        expect(heap.size).toBe(5);

        expect(heap.extract()).toStrictEqual({ value: 9 });
        expect(heap.size).toBe(4);

        expect(heap.extract()).toStrictEqual({ value: 10 });
        expect(heap.size).toBe(3);

        expect(heap.extract()).toStrictEqual({ value: 42 });
        expect(heap.size).toBe(2);

        expect(heap.extract()).toStrictEqual({ value: 50 });
        expect(heap.size).toBe(1);

        expect(heap.extract()).toStrictEqual({ value: 100 });
        expect(heap.size).toBe(0);
    });

    test('build | build heap from an existing array => min heap property is preserved, size is updated', () => {
        const heap = new MinHeap<number>();

        heap.build([100, 5, 7, 10, 9, 42, 6, 8, 50]);

        expect(heap.size).toBe(9);
        expect(heap.toArray()).toStrictEqual([5, 8, 6, 10, 9, 42, 7, 100, 50]);

        heap.build([48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41]);

        expect(heap.size).toBe(14);
        expect(heap.toArray()).toStrictEqual([-5, 2, 6, 7, 8, 8, 24, 391, 24, 56, 12, 24, 48, 41]);
    });
});
