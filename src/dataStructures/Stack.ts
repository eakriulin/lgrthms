export class Stack<T = any> {
    private readonly stack: T[];

    constructor() {
        this.stack = [];
    }

    public get size(): number {
        return this.stack.length;
    }

    // O(1) time | O(1) space
    public push(value: T): number {
        this.stack.push(value);
        return this.stack.length;
    }

    // O(1) time | O(1) space
    public pop(): T | undefined {
        return this.stack.pop();
    }

    // O(1) time | O(1) space
    public peek(): T | undefined {
        const lastIndex = this.stack.length - 1;
        return this.stack[lastIndex];
    }
}
