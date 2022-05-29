class Node<T = any> {
    public id: string;
    public value: T;
    public edges: Record<string, number>;

    constructor(id: string, value: T) {
        this.id = id;
        this.value = value;
        this.edges = {};
    }
}

export class Graph<T = any> {
    private readonly DEFAULT_WEIGHT = 1;

    private _nextId: number;
    private _size: number;
    private readonly _graph: Record<string, Node<T>>;

    constructor() {
        this._nextId = 1;
        this._size = 0;
        this._graph = {};
    }

    public get size(): number {
        return this._size;
    }

    // O(1) time | O(1) space
    public getNode(id: number | string): Node<T> | undefined {
        return this._graph[id];
    }

    // O(e) time | O(e) space — where e is the number of edges of the given node
    public getEdges(id: number | string): { neighborId: string; weight: number }[] {
        const node = this.getNode(id);
        if (!node) {
            return [];
        }
        return Object.keys(node.edges).map(neighborId => ({ neighborId, weight: node.edges[neighborId] }));
    }

    // O(1) time | O(1) space
    public addNode(value: T, id?: number | string): Node<T> {
        if (id && !['number', 'string'].includes(typeof id)) {
            throw new Error('Cannot add node with given id, id must be a number or a string');
        } else if (typeof id === 'number') {
            this._nextId = id + 1;
        } else if (!id) {
            id = this._nextId;
            this._nextId++;
        }

        id = typeof id === 'number' ? String(id) : id;
        const node = new Node(id, value);
        this._graph[id] = node;
        this._size++;

        return node;
    }

    // O(1) time | O(1) space
    public addEdge(nodeId: number | string, neighborId: number | string, weight: number = this.DEFAULT_WEIGHT): void {
        if (!this._graph[nodeId]) {
            throw new Error('Cannot find node with given nodeId');
        }

        if (!this._graph[neighborId]) {
            throw new Error('Cannot find node with given neighborId');
        }

        const node = this._graph[nodeId];
        node.edges[neighborId] = weight;
    }

    // O(n) time | O(1) space
    public removeNode(id: number | string): void {
        if (!this._graph[id]) {
            return;
        }

        delete this._graph[id];
        for (const nodeId in this._graph) {
            this.removeEdge(nodeId, id);
        }

        this._size--;
    }

    // O(1) time | O(1) space
    public removeEdge(nodeId: number | string, neighborId: number | string): void {
        if (!this._graph[nodeId]) {
            return;
        }

        const node = this._graph[nodeId];
        delete node.edges[neighborId];
    }

    // O(1) time | O(1) space
    public adjacent(nodeId: number | string, neighborId: number | string): boolean {
        const node = this.getNode(nodeId);
        return Boolean(node && neighborId in node.edges);
    }
}
