/* eslint-disable no-magic-numbers */
import { Stack } from './Stack';

describe('Stack', () => {
    test('init | new instance => size is 0', () => {
        const stack = new Stack<string>();
        expect(stack).toBeTruthy();
        expect(stack.size).toBe(0);
    });

    test('push | push a new value => value is added, size is updated', () => {
        const stack = new Stack<string>();

        expect(stack.push('value')).toBe(1);
        expect(stack.size).toBe(1);

        expect(stack.push('value')).toBe(2);
        expect(stack.size).toBe(2);

        expect(stack.push('value')).toBe(3);
        expect(stack.size).toBe(3);
    });

    test('peek | empty stack, peek at the last value => undefined', () => {
        const stack = new Stack<number>();
        expect(stack.peek()).toBe(undefined);
    });

    test('peek | non-empty stack, peek at the last value => the last value is returned', () => {
        const stack = new Stack<string>();
        
        stack.push('1');
        expect(stack.peek()).toBe('1');

        stack.push('2');
        expect(stack.peek()).toBe('2');

        stack.push('3');
        expect(stack.peek()).toBe('3');
    });

    test('pop | empty stack, pop the last value => undefined', () => {
        const stack = new Stack<boolean>();
        expect(stack.pop()).toBe(undefined);
    });
    
    test('pop | non-empty stack, pop the last value => the last value is returned, length is decreased', () => {
        const stack = new Stack<{ value: number }>();

        const one = { value: 1 };
        const two = { value: 2 };
        const three = { value: 3 };
        
        stack.push(one);
        stack.push(two);
        stack.push(three);

        expect(stack.peek()).toBe(three);
        expect(stack.size).toBe(3);

        expect(stack.pop()).toBe(three);
        expect(stack.peek()).toBe(two);
        expect(stack.size).toBe(2);

        expect(stack.pop()).toBe(two);
        expect(stack.peek()).toBe(one);
        expect(stack.size).toBe(1);

        expect(stack.pop()).toBe(one);
        expect(stack.peek()).toBe(undefined);
        expect(stack.size).toBe(0);
    });
});
