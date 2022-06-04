interface TrieNode {
    [key: string]: TrieNode | string;
}

export class Trie {
    private readonly root: TrieNode;
    private readonly endSymbol: string;
    private _size: number;

    constructor() {
        this.root = {};
        this.endSymbol = '***';
        this._size = 0;
    }

    public get size(): number {
        return this._size;
    }

    // O(n) time | O(n) space — where n is is the length of the string
    public insert(string: string): number {
        let node = this.root;
        for (const char of string) {
            if (node[char] === undefined) {
                node[char] = {};
            }
            node = node[char] as TrieNode;
        }

        node[this.endSymbol] = string;
        this._size++;

        return this._size;
    }

    // O(n) time | O(1) space — where n is is the length of the string
    public contains(string: string): boolean {
        let node = this.root;
        for (const char of string) {
            if (node[char] === undefined) {
                return false;
            }
            node = node[char] as TrieNode;
        }
        return node[this.endSymbol] !== undefined;
    }

    // O(n) time | O(n space) — where n is is the length of the string
    public remove(string: string): void {
        this._remove(string, 0, this.root);
    }

    // O(m) time | O(n) space — where
    // m is the total number of characters in the trie
    // n is the length of the longest word
    public autocomplete(string: string, limit = Infinity): string[] {
        let node = this.root;
        for (const char of string) {
            if (node[char] === undefined) {
                return [];
            }
            node = node[char] as TrieNode;
        }

        return this._getWords(node, [], limit);
    }

    // O(m) time | O(n) space — where
    // m is the total number of characters in the trie
    // n is the length of the longest word
    public getWords(): string[] {
        return this._getWords(this.root, [], Infinity);
    }

    private _remove(string: string, index: number, node: TrieNode | string): boolean {
        if (index === string.length) {
            if (node[this.endSymbol] === undefined) {
                return false;
            }

            delete node[this.endSymbol];
            this._size--;

            return Object.keys(node).length === 0;
        }

        const char = string[index];
        if (node[char] === undefined) {
            return false;
        }

        const canRemove = this._remove(string, index + 1, node[char]);
        if (canRemove) {
            delete node[char];
        }

        return Object.keys(node).length === 0;
    }

    private _getWords(node: TrieNode, array: string[], limit: number): string[] {
        for (const char in node) {
            if (array.length === limit) {
                break;
            }
            if (char === this.endSymbol) {
                array.push(node[this.endSymbol] as string);
                continue;
            }
            this._getWords(node[char] as TrieNode, array, limit);
        }

        return array;
    }
}
