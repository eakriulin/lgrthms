/* eslint-disable no-magic-numbers */
import { Queue } from './Queue';

describe('Queue', () => {
    test('init | new instance => size is 0', () => {
        const queue = new Queue<string>();
        expect(queue).toBeTruthy();
        expect(queue.size).toBe(0);
    });

    test('enqueue | enqueue a new value => value is added, size is updated', () => {
        const queue = new Queue<string>();

        expect(queue.enqueue('value')).toBe(1);
        expect(queue.size).toBe(1);

        expect(queue.enqueue('value')).toBe(2);
        expect(queue.size).toBe(2);

        expect(queue.enqueue('value')).toBe(3);
        expect(queue.size).toBe(3);
    });

    test('peek | empty queue, peek at the first value => undefined', () => {
        const queue = new Queue<number>();
        expect(queue.peek()).toBe(undefined);
    });

    test('peek | non-empty queue, peek at the first value => the first value is returned', () => {
        const queue = new Queue<string>();
        
        queue.enqueue('1');
        expect(queue.peek()).toBe('1');

        queue.enqueue('2');
        expect(queue.peek()).toBe('1');

        queue.enqueue('3');
        expect(queue.peek()).toBe('1');
    });

    test('dequeue | empty queue, dequeue the first value => undefined', () => {
        const queue = new Queue<boolean>();
        expect(queue.dequeue()).toBe(undefined);
    });
    
    test('dequeue | non-empty queue, dequeue the first value => the first value is returned, length is decreased', () => {
        const queue = new Queue<{ value: number }>();

        const one = { value: 1 };
        const two = { value: 2 };
        const three = { value: 3 };
        
        queue.enqueue(one);
        queue.enqueue(two);
        queue.enqueue(three);

        expect(queue.peek()).toBe(one);
        expect(queue.size).toBe(3);

        expect(queue.dequeue()).toBe(one);
        expect(queue.peek()).toBe(two);
        expect(queue.size).toBe(2);

        expect(queue.dequeue()).toBe(two);
        expect(queue.peek()).toBe(three);
        expect(queue.size).toBe(1);

        expect(queue.dequeue()).toBe(three);
        expect(queue.peek()).toBe(undefined);
        expect(queue.size).toBe(0);
    });
});
