/* eslint-disable no-magic-numbers */
import { PriorityQueue } from './PriorityQueue';

describe('PriorityQueue', () => {
    test('init | new instance => size is 0', () => {
        const queue = new PriorityQueue<string>();
        expect(queue).toBeTruthy();
        expect(queue.size).toBe(0);
    });

    test('enqueue, peek | enqueue a value without priority => value is added, size is updated', () => {
        const queue = new PriorityQueue<string>();
        
        queue.enqueue('1');
        expect(queue.peek()).toBe('1');

        queue.enqueue('2');
        expect(queue.peek()).toBe('1');

        queue.enqueue('3');
        expect(queue.peek()).toBe('1');
    });

    test('enqueue, peek | enqueue a value with priority => value with the highest priority is at the top, size is updated', () => {
        const queue = new PriorityQueue<string>();

        expect(queue.size).toBe(0);
        expect(queue.peek()).toBe(undefined);

        queue.enqueue('medium', 3);
        expect(queue.size).toBe(1);
        expect(queue.peek()).toBe('medium');

        queue.enqueue('lowest', 1);
        expect(queue.size).toBe(2);
        expect(queue.peek()).toBe('medium');

        queue.enqueue('low', 2);
        expect(queue.size).toBe(3);
        expect(queue.peek()).toBe('medium');

        queue.enqueue('high', 4);
        expect(queue.size).toBe(4);
        expect(queue.peek()).toBe('high');

        queue.enqueue('highest', 5);
        expect(queue.size).toBe(5);
        expect(queue.peek()).toBe('highest');
    });

    test('enqueue | enqueue with a negative priority => throw error', () => {
        const queue = new PriorityQueue<string>();

        let error: Error | undefined = undefined;

        try {
            queue.enqueue('anything', -1);
        } catch (e) {
            error = e;
        }
        expect(error).toBeTruthy();
    });

    test('dequeue | dequeue a value without priority => value at the top of the heap is dequeued, size is updated', () => {
        const queue = new PriorityQueue<{ value: number }>();

        const one = { value: 1 };
        const two = { value: 2 };
        const three = { value: 3 };
        
        queue.enqueue(one);
        queue.enqueue(two);
        queue.enqueue(three);

        expect(queue.peek()).toBe(one);
        expect(queue.size).toBe(3);

        expect(queue.dequeue()).toBe(one);
        expect(queue.peek()).toBe(three);
        expect(queue.size).toBe(2);

        expect(queue.dequeue()).toBe(three);
        expect(queue.peek()).toBe(two);
        expect(queue.size).toBe(1);

        expect(queue.dequeue()).toBe(two);
        expect(queue.peek()).toBe(undefined);
        expect(queue.size).toBe(0);
    });

    test('dequeue | dequeue a value with priority => value with the highest priority is dequeued, size is updated', () => {
        const queue = new PriorityQueue<string>();

        expect(queue.size).toBe(0);
        expect(queue.dequeue()).toBe(undefined);

        queue.enqueue('medium', 3);
        queue.enqueue('lowest', 1);
        queue.enqueue('low', 2);
        queue.enqueue('medium', 3);
        queue.enqueue('highest', 5);
        queue.enqueue('highest', 5);
        queue.enqueue('high', 4);
        queue.enqueue('high', 4);
        queue.enqueue('highest', 5);
        queue.enqueue('low', 2);
        queue.enqueue('highest', 5);
        queue.enqueue('high', 4);
        queue.enqueue('medium', 3);
        queue.enqueue('high', 4);
        queue.enqueue('highest', 5);

        expect(queue.size).toBe(15);

        expect(queue.dequeue()).toBe('highest');
        expect(queue.size).toBe(14);
        expect(queue.dequeue()).toBe('highest');
        expect(queue.size).toBe(13);
        expect(queue.dequeue()).toBe('highest');
        expect(queue.size).toBe(12);
        expect(queue.dequeue()).toBe('highest');
        expect(queue.size).toBe(11);
        expect(queue.dequeue()).toBe('highest');
        expect(queue.size).toBe(10);
        expect(queue.dequeue()).toBe('high');
        expect(queue.size).toBe(9);
        expect(queue.dequeue()).toBe('high');
        expect(queue.size).toBe(8);
        expect(queue.dequeue()).toBe('high');
        expect(queue.size).toBe(7);
        expect(queue.dequeue()).toBe('high');
        expect(queue.size).toBe(6);
        expect(queue.dequeue()).toBe('medium');
        expect(queue.size).toBe(5);
        expect(queue.dequeue()).toBe('medium');
        expect(queue.size).toBe(4);
        expect(queue.dequeue()).toBe('medium');
        expect(queue.size).toBe(3);
        expect(queue.dequeue()).toBe('low');
        expect(queue.size).toBe(2);
        expect(queue.dequeue()).toBe('low');
        expect(queue.size).toBe(1);
        expect(queue.dequeue()).toBe('lowest');
        expect(queue.size).toBe(0);
    });
});
