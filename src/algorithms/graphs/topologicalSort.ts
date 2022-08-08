import { Graph } from '../../dataStructures/Graph';

type EntityId = number | string;

interface IGraphNodeValueInfo {
    visited: boolean;
    visiting: boolean;
}

interface IGraphNodeValue<T> {
    element: T;
    info: IGraphNodeValueInfo;
}

// O(n + e) time | O(n + e) space
export function topologicalSort(array: string[], dependencies: { dependency: string; prerequisite: string }[]): string[]
export function topologicalSort(array: number[], dependencies: { dependency: number; prerequisite: number }[]): number[]
export function topologicalSort<T>(
    array: T[],
    dependencies: { dependency: EntityId; prerequisite: EntityId }[],
    get: (element: T) => EntityId,
): T[]
export function topologicalSort<T>(
    array: T[],
    dependencies: { dependency: EntityId; prerequisite: EntityId }[],
    get?: (element: T) => EntityId,
): T[] {
    get = get ? get : (element: T): EntityId => element as unknown as EntityId;
    const graph = buildGraph(array, dependencies, get);

    const sorted: T[] = [];
    for (const element of array) {
        const nodeId = get(element);
        depthFirstTraverseAndPopulateSortedArray(nodeId, graph, sorted);
    }

    return sorted;
}

function buildGraph<T>(
    array: T[],
    dependencies: { dependency: EntityId; prerequisite: EntityId }[],
    get: (element: T) => EntityId,
): Graph<IGraphNodeValue<T>> {
    const graph = new Graph<IGraphNodeValue<T>>();

    for (const element of array) {
        const id = get(element);
        const info = { visited: false, visiting: false };
        graph.addNode({ element, info }, id);
    }

    for (const { dependency, prerequisite } of dependencies) {
        graph.addEdge(dependency, prerequisite);
    }

    return graph;
}

function depthFirstTraverseAndPopulateSortedArray<T>(
    nodeId: EntityId,
    graph: Graph<IGraphNodeValue<T>>,
    sorted: T[],
): void {
    const node = graph.getNode(nodeId);

    if (node.value.info.visited) {
        return;
    }

    if (node.value.info.visiting) {
        throw new Error(`Invalid dependencies array, detected cycle at node ${nodeId}`);
    }

    node.value.info.visiting = true;
    for (const neighborId in node.edges) {
        depthFirstTraverseAndPopulateSortedArray(neighborId, graph, sorted);
    }

    node.value.info.visiting = false;
    node.value.info.visited = true;

    sorted.push(node.value.element);
}
