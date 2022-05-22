export class Stack<T = any> {
    private readonly stack: T[];

    constructor() {
        this.stack = [];
    }

    public get size(): number {
        return this.stack.length;
    }

    public push(value: T): number {
        this.stack.push(value);
        return this.stack.length;
    }

    public pop(): T | undefined {
        return this.stack.pop();
    }

    public peek(): T | undefined {
        const lastIndex = this.stack.length - 1;
        return this.stack[lastIndex];
    }
}
