import { Comparator } from "../utils/Comparator";

class Node<T = any> {
    public parent: Node<T> | null;
    public left: Node<T> | null;
    public right: Node<T> | null;
    public value: T;

    constructor(value: T) {
        this.parent = null;
        this.left = null;
        this.right = null;
        this.value = value;
    }
}

export class BinarySearchTree<T = any> {
    private _root: Node<T> | null;
    private _size: number;
    private readonly comparator: Comparator<T>;

    constructor(compareFn?: (a: T, b: T) => number) {
        this._root = null;
        this._size = 0;
        this.comparator = new Comparator(compareFn);
    }

    public get root(): Node<T> | null {
        return this._root;
    }

    public get size(): number {
        return this._size;
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    public insert(value: T): Node<T> {
        const nodeToInsert = new Node(value);

        if (!this.root) {
            this._root = nodeToInsert;
            this._size++;
            return nodeToInsert;
        }

        let current = this._root;
        while(current) {
            if (this.comparator.isLessThan(value, current.value)) {
                if (current.left) {
                    current = current.left;
                    continue;
                } else {
                    current.left = nodeToInsert;
                    nodeToInsert.parent = current;
                    this._size++;
                    break;
                }
            } else {
                if (current.right) {
                    current = current.right;
                    continue;
                } else {
                    current.right = nodeToInsert;
                    nodeToInsert.parent = current;
                    this._size++;
                    break;
                }
            }
        }

        return nodeToInsert;
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    public remove(node: Node<T>, root: Node<T> | null = this._root): void {
        if (!root || !this.contains(node, root)) {
            return;
        }

        if (node.left && node.right) {
            this.removeNodeWithTwoChildren(node);
        } else if (!node.parent) {
            this.removeRoot(node);
        } else {
            this.removeSingleChildOrLeafNode(node);
        }

        this._size--;
    }

    // Best: O(log(n)) time | O(1) space
    // Average: O(log(n)^2) time | O(1) space
    // Worst: O(n^2) time | O(1) space
    public removeWithValue(target: T, predicate?: (value: T) => unknown): void {
        let nodeToRemove = this.findNode(target, predicate);
        while (nodeToRemove) {
            this.remove(nodeToRemove, nodeToRemove);
            nodeToRemove = this.findNode(target, predicate);
        }
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    public contains(node: Node<T>, root: Node<T> | null = this._root): boolean {
        let current = root;
        while(current) {
            if (current === node) {
                return true;
            }
            if (this.comparator.isLessThan(node.value, current.value)) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    public findNode(target: T, predicate?: (value: T) => unknown): Node<T> | undefined {
        const isDesiredValue = predicate
            ? predicate
            : (value: T): boolean => value === target;
        
        let current = this._root;
        while (current) {
            if (isDesiredValue(current.value)) {
                return current;
            }

            if (this.comparator.isLessThan(target, current.value)) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    public find(target: T, predicate?: (value: T) => unknown): T | undefined {
        const node = this.findNode(target, predicate);
        return node ? node.value : undefined;
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    public findMinNode(root: Node<T> | null = this._root): Node<T> | undefined {
        if (!root) {
            return;
        }

        let current = root;
        while(current.left) {
            current = current.left;
        }

        return current;
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    public findMin(root: Node<T> | null = this._root): T | undefined {
        const node = this.findMinNode(root);
        return node ? node.value : undefined;
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    public findMaxNode(root: Node<T> | null = this._root): Node<T> | undefined {
        if (!root) {
            return;
        }

        let current = root;
        while(current.right) {
            current = current.right;
        }

        return current;
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    public findMax(root: Node<T> | null = this._root): T | undefined {
        const node = this.findMaxNode(root);
        return node ? node.value : undefined;
    }

    // O(n) time | O(h) space
    public traverseInOrder(callbackfn: (value: T) => void, node: Node<T> | null = this._root): void {
        if (node) {
            this.traverseInOrder(callbackfn, node.left);
            callbackfn(node.value);
            this.traverseInOrder(callbackfn, node.right);
        }
    }

    // O(n) time | O(h) space
    public traversePreOrder(callbackfn: (value: T) => void, node: Node<T> | null = this._root): void {
        if (node) {
            callbackfn(node.value);
            this.traversePreOrder(callbackfn, node.left);
            this.traversePreOrder(callbackfn, node.right);
        }
    }

    // O(n) time | O(h) space
    public traversePostOrder(callbackfn: (value: T) => void, node: Node<T> | null = this._root): void {
        if (node) {
            this.traversePostOrder(callbackfn, node.left);
            this.traversePostOrder(callbackfn, node.right);
            callbackfn(node.value);
        }
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    private removeNodeWithTwoChildren(node: Node<T>): void {
        const nodeToReplaceWith = this.findMinNode(node.right);
        node.value = nodeToReplaceWith.value;
        this.removeSingleChildOrLeafNode(nodeToReplaceWith);
    }

    // O(1) time | O(1) space
    private removeRoot(node: Node<T>): void {
        if (node.left) {
            node.value = node.left.value;
            node.right = node.left.right;
            node.left = node.left.left;
        } else if (node.right) {
            node.value = node.right.value;
            node.left = node.right.left;
            node.right = node.right.right;
        } else {
            this._root = null;
        }
    }

    // O(1) time | O(1) space
    private removeSingleChildOrLeafNode(node: Node<T>): void {
        if (node.parent.left === node) {
            if (node.left) {
                node.parent.left = node.left;
                node.left.parent = node.parent;
            } else if (node.right) {
                node.parent.left = node.right;
                node.right.parent = node.parent;
            } else {
                node.parent.left = null;
            }
        }
        if (node.parent.right === node) {
            if (node.left) {
                node.parent.right = node.left;
                node.left.parent = node.parent;
            } else if (node.right) {
                node.parent.right = node.right;
                node.right.parent = node.parent;
            } else {
                node.parent.right = null;
            }
        }
    }
}
