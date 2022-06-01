import { Queue } from './Queue';

export class BinaryTree<T = any> {
    private _parent: BinaryTree<T> | null;
    private _left: BinaryTree<T> | null;
    private _right: BinaryTree<T> | null;
    private _size: number;
    public value: T;

    constructor(value: T) {
        this._parent = null;
        this._left = null;
        this._right = null;
        this._size = 1;
        this.value = value;
    }

    public get size(): number {
        return this._size;
    }

    // O(1) time | O(1) space
    public set parent(tree: BinaryTree<T>) {
        this._parent = tree;
    }

    public get parent(): BinaryTree<T> | null {
        return this._parent;
    }

    // O(log(n)) time | O(1) space
    public set left(tree: BinaryTree<T>) {
        const currentSize = this._left?.size || 0;
        const sizeToAdd = tree.size - currentSize;

        tree.parent = this;
        this._left = tree;
        this._size += sizeToAdd;

        let current = this.parent;
        while(current) {
            current._size += sizeToAdd;
            current = current.parent;
        }
    }

    public get left(): BinaryTree<T> | null {
        return this._left;
    }

    // O(log(n)) time | O(1) space
    public set right(tree: BinaryTree<T>) {
        const currentSize = this._right?.size || 0;
        const sizeToAdd = tree.size - currentSize;

        tree.parent = this;
        this._right = tree;
        this._size += sizeToAdd;

        let current = this.parent;
        while(current) {
            current._size += sizeToAdd;
            current = current.parent;
        }
    }

    public get right(): BinaryTree<T> | null {
        return this._right;
    }

    // O(n) time | O(n) space
    public insert(value: T): BinaryTree<T> {
        const tree = new BinaryTree(value);
        const queue = new Queue<BinaryTree<T>>();
        queue.enqueue(this);

        while(queue.size > 0) {
            const current = queue.dequeue();

            if (!current.left) {
                tree.parent = current;
                current.left = tree;
                break;
            } else {
                queue.enqueue(current.left);
            }

            if (!current.right) {
                tree.parent = current;
                current.right = tree;
                break;
            } else {
                queue.enqueue(current.right);
            }
        }

        return tree;
    }

    // O(n) time | O(n) space
    public remove(tree: BinaryTree<T>): void {
        let deepest = this as BinaryTree<T>;
        let isFound = false;

        const queue = new Queue<BinaryTree<T>>();
        queue.enqueue(this);

        while(queue.size > 0) {
            const current = queue.dequeue();
            if (!current) {
                continue;
            }

            if (!isFound) {
                isFound = tree === current;
            }

            deepest = current;
            queue.enqueue(current._left);
            queue.enqueue(current._right);
        }

        if (!isFound) {
            return;
        }

        if (deepest.parent === null) {
            return;
        } else if (deepest.parent._left === deepest) {
            deepest.parent._left = null;
        } else {
            deepest.parent._right = null;
        }

        tree.value = deepest.value;

        let current = deepest.parent;
        while(current) {
            current._size--;
            current = current.parent;
        }

        deepest._parent = null;
        deepest._left = null;
        deepest._right = null;
        deepest._size = 1;
    }

    // O(n^2) time | O(n) space
    public removeWithValue(predicate: (value: T) => unknown): void {
        const trees: BinaryTree<T>[] = [];
        const queue = new Queue<BinaryTree<T>>();
        queue.enqueue(this);

        while(queue.size > 0) {
            const current = queue.dequeue();
            if (!current) {
                continue;
            }

            trees.push(current);
            queue.enqueue(current._left);
            queue.enqueue(current._right);
        }

        for (let i = trees.length - 1; i >= 0; i--) {
            const tree = trees[i];
            if (predicate(tree.value)) {
                this.remove(tree);
            }
        }
    }

    // O(n) time | O(h) space
    public dfs(predicate: (value: T) => unknown): BinaryTree<T> | null {
        if (predicate(this.value)) {
            return this;
        }
        return (this.left ? this.left.dfs(predicate) : null) || (this.right ? this.right.dfs(predicate) : null);
    }

    // O(n) time | O(h) space
    public deepFirstSearch(predicate: (value: T) => unknown): BinaryTree<T> | null {
       return this.dfs(predicate);
    }

    // O(n) time | O(n) space
    public bfs(predicate: (value: T) => unknown): BinaryTree<T> | null {
        const queue = new Queue<BinaryTree<T>>();
        queue.enqueue(this);

        while(queue.size > 0) {
            const current = queue.dequeue();
            if (!current) {
                continue;
            }

            if (predicate(current.value)) {
                return current;
            }

            queue.enqueue(current.left);
            queue.enqueue(current.right);
        }

        return null;
    }

    // O(n) time | O(n) space
    public breadthFirstSearch(predicate: (value: T) => unknown): BinaryTree<T> | null {
        return this.bfs(predicate);
    }


    // O(n) time | O(h) space
    public traverseInOrder(callbackfn: (value: T) => void): void {
        if (this.left) {
            this.left.traverseInOrder(callbackfn);
        }

        callbackfn(this.value);

        if (this.right) {
            this.right.traverseInOrder(callbackfn);
        }
    }

    // O(n) time | O(h) space
    public traversePreOrder(callbackfn: (value: T) => void): void {
        callbackfn(this.value);

        if (this.left) {
            this.left.traversePreOrder(callbackfn);
        }

        if (this.right) {
            this.right.traversePreOrder(callbackfn);
        }
    }

    // O(n) time | O(h) space
    public traversePostOrder(callbackfn: (value: T) => void): void {
        if (this.left) {
            this.left.traversePostOrder(callbackfn);
        }

        if (this.right) {
            this.right.traversePostOrder(callbackfn);
        }

        callbackfn(this.value);
    }
}
