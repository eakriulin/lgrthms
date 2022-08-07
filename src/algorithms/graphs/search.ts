import { Graph } from '../../dataStructures/Graph';
import { Queue } from '../../dataStructures/Queue';
import { Stack } from '../../dataStructures/Stack';

// O(n + e) time | O(n) space
export function breadthFirstSearch<T>(nodeId: string, graph: Graph<T>, predicate: (value: T) => unknown): string | undefined {
    return bfs(nodeId, graph, predicate);
}

// O(n + e) time | O(n) space
export function bfs<T>(nodeId: string, graph: Graph<T>, predicate: (value: T) => unknown): string | undefined {
    const visited = new Set<string>();

    const queue = new Queue<string>();
    queue.enqueue(nodeId);

    while (queue.size > 0) {
        const currentId = queue.dequeue();
        visited.add(currentId);

        const current = graph.getNode(currentId);
        if (predicate(current.value)) {
            return current.id;
        }

        for (const neighborId in current.edges) {
            if (!visited.has(neighborId)) {
                queue.enqueue(neighborId);
            }
        }
    }
}

// O(n + e) time | O(n) space
export function depthFirstSearch<T>(nodeId: string, graph: Graph<T>, predicate: (value: T) => unknown): string | undefined {
    return dfs(nodeId, graph, predicate);
}

// O(n + e) time | O(n) space
export function dfs<T>(nodeId: string, graph: Graph<T>, predicate: (value: T) => unknown): string | undefined {
    const visited = new Set<string>();
    
    const stack = new Stack<string>();
    stack.push(nodeId);

    while (stack.size > 0) {
        const currentId = stack.pop();
        visited.add(currentId);

        const current = graph.getNode(currentId);
        if (predicate(current.value)) {
            return current.id;
        }

        for (const neighborId in current.edges) {
            if (!visited.has(neighborId)) {
                stack.push(neighborId);
            }
        }
    }
}
