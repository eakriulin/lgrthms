class Node<T = any> {
    public value: T;
    public next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export class SinglyLinkedList<T = any> {
    private _head: Node<T> | null;
    private _length: number;

    constructor() {
        this._head = null;
        this._length = 0;
    }

    public get head(): Node<T> | null {
        return this._head;
    }

    public get length(): number {
        return this._length;
    }

    // O(n) time | O(1) space
    public get(index: number): T | undefined {
        const node = this.getNode(index);
        return node ? node.value : undefined;
    }

    // O(n) time | O(1) space
    public getNode(index: number): Node<T> | undefined {
        const lastIndex = this._length - 1;
        if (index < 0 || index > lastIndex) {
            return;
        }

        let current = this._head;
        let currentIndex = 0;

        while(currentIndex < index) {
            current = current.next;
            currentIndex++;
        }

        return current || undefined;
    }

    // O(n) time | O(1) space
    public find(predicate: (value: T) => unknown): T | undefined {
        const node = this.findNode(predicate);
        return node ? node.value : undefined;
    }

    // O(n) time | O(1) space
    public findNode(predicate: (value: T) => unknown): Node<T> | undefined {
        let current = this._head;
        while(current) {
            if (predicate(current.value)) {
                return current;
            }
            current = current.next;
        }
    }

    // Best: O(1) time | O(1) space
    // Average: O(n) time | O(1) space
    public insert(value: T, index?: number): Node<T> {
        const lastIndex = this._length - 1;
        if (index === undefined) {
            index = lastIndex + 1;
        }

        if (index < 0 || index > lastIndex + 1) {
            throw new Error('Cannot insert value, given index is out of bounds');
        }

        if (index === 0) {
            return this.setHead(value);
        }

        const insertAfterIndex = index - 1;
        const insertAfterNode = this.getNode(insertAfterIndex);

        return this.insertAfter(value, insertAfterNode);
    }

    // O(1) time | O(1) space
    public insertAfter(value: T, node: Node<T>): Node<T> {
        const nodeToInsert = new Node(value);
        
        nodeToInsert.next = node.next;
        node.next = nodeToInsert;

        this._length++;
        return nodeToInsert;
    }

    // O(n) time | O(1) space
    public removeAtIndex(index: number): void {
        const lastIndex = this._length - 1;
        if (index < 0 || index > lastIndex) {
            return;
        }

        let current = this._head;
        let previous = null;

        let currentIndex = 0;
        while(currentIndex < index) {
            previous = current;
            current = current.next;
            currentIndex++;
        }

        return this.remove(current, previous);
    }

    // O(n) time | O(1) space
    public removeWithValue(predicate: (value: T) => unknown): void {
        let current = this._head;
        let previous = null;

        while(current) {
            if (predicate(current.value)) {
                this.remove(current, previous);
            } else {
                previous = current;
            }
            current = current.next;
        }
    }

    // O(n) time | O(1) space
    public removeNode(node: Node<T> | null | undefined): void {
        if (!node) {
            return;
        }

        let current = this._head;
        let previous = null;

        while(current) {
            if (current === node) {
                return this.remove(current, previous);
            }
            
            previous = current;
            current = current.next;
        }
    }

    // O(n) time | O(1) space
    public forEach(callbackfn: (value: T) => void): void {
        let current = this._head;
        while(current) {
            callbackfn(current.value);
            current = current.next;
        }
    }

    // O(1) time | O(1) space
    private setHead(value: T): Node<T> {
        const node = new Node(value);

        node.next = this._head;
        this._head = node;

        this._length++;
        return this._head;
    }

    // O(1) time | O(1) space
    private remove(node: Node<T>, previous: Node<T> | null): void {
        if (node === this._head) {
            this._head = node.next;
        } else if (previous) {
            previous.next = node.next;
        } else {
            throw new Error('Cannot remove node, make sure to pass valid parameters');
        }
        this._length--;
    }
}
