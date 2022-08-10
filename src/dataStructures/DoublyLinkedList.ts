class Node<T = any> {
    public value: T;
    public next: Node<T> | null;
    public prev: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export class DoublyLinkedList<T = any> {
    private _head: Node<T> | null;
    private _tail: Node<T> | null;
    private _length: number;

    constructor() {
        this._head = null;
        this._tail = null;
        this._length = 0;
    }

    public get head(): Node<T> | null {
        return this._head;
    }

    public get tail(): Node<T> | null {
        return this._tail;
    }

    public get length(): number {
        return this._length;
    }

    // Best: O(1) time | O(1) space
    // Average: O(n) time | O(1) space
    public get(index: number): T | undefined {
        const node = this.getNode(index);
        return node ? node.value : undefined;
    }

    // Best: O(1) time | O(1) space
    // Average: O(n) time | O(1) space
    public getNode(index: number): Node<T> | undefined {
        const lastIndex = this._length - 1;
        if (index < 0 || index > lastIndex) {
            return;
        }

        if (index === lastIndex) {
            return this._tail;
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

        if (index === lastIndex + 1) {
            return this.setTail(value);
        }

        const insertAfterIndex = index - 1;
        const insertAfterNode = this.getNode(insertAfterIndex);

        return this.insertAfter(value, insertAfterNode);
    }

    // O(1) time | O(1) space
    public insertAfter(value: T, node: Node<T>): Node<T> {
        const nodeToInsert = new Node(value);

        nodeToInsert.next = node.next;
        nodeToInsert.prev = node;
        node.next = nodeToInsert;

        if (nodeToInsert.next) {
            nodeToInsert.next.prev = nodeToInsert;
        } else {
            this._tail = nodeToInsert;
        }

        this._length++;
        return nodeToInsert;
    }

    // O(1) time | O(1) space
    public insertBefore(value: T, node: Node<T>): Node<T> {
        const nodeToInsert = new Node(value);

        nodeToInsert.prev = node.prev;
        nodeToInsert.next = node;
        node.prev = nodeToInsert;

        if (nodeToInsert.prev) {
            nodeToInsert.prev.next = nodeToInsert;
        } else {
            this._head = nodeToInsert;
        }
        
        this._length++;
        return nodeToInsert;
    }

    // O(n) time | O(1) space
    public removeAtIndex(index: number): void {
        const node = this.getNode(index);
        if (node) {
            return this.removeNode(node);
        }
    }

    // O(n) time | O(1) space
    public removeWithValue(predicate: (value: T) => unknown): void {
        let current = this._head;
        while(current) {
            const next = current.next;
            if (predicate(current.value)) {
                this.removeNode(current);
            }
            current = next;
        }
    }

    // O(1) time | O(1) space
    public removeNode(node: Node<T> | null | undefined): void {
        if (!node) {
            return;
        }

        if (node === this._head) {
            this._head = node.next;
        }
        if (node === this._tail) {
            this._tail = node.prev;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }

        node.prev = null;
        node.next = null;
        this._length--;
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
        if ( ! this._head) {
            const node = new Node(value);
            this._head = node;
            this._tail = node;
            this._length++;
            return node;
        }
        return this.insertBefore(value, this._head);
    }

    // O(1) time | O(1) space
    private setTail(value: T): Node<T> {
        if ( ! this._tail) {
            const node = new Node(value);
            this._head = node;
            this._tail = node;
            this._length++;
            return node;
        }
        return this.insertAfter(value, this._tail);
    }
}
