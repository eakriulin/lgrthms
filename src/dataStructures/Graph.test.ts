/* eslint-disable no-magic-numbers */
import { Graph } from './Graph';

describe('Graph', () => {
    test('init | new instance => size is 0', () => {
        const graph = new Graph<string>();
        expect(graph).toBeTruthy();
        expect(graph.size).toBe(0);
    });

    test('addNode | add a new node => node is added, size is updated, nextId is updated', () => {
        const graph = new Graph<string>();

        const node1 = graph.addNode('node 1');
        expect(node1.id).toBe('1');
        expect(node1.value).toBe('node 1');
        expect(graph.size).toBe(1);

        const node2 = graph.addNode('node 2', 'arbitraryId');
        expect(node2.id).toBe('arbitraryId');
        expect(node2.value).toBe('node 2');
        expect(graph.size).toBe(2);

        const node3 = graph.addNode('node 3');
        expect(node3.id).toBe('2');
        expect(node3.value).toBe('node 3');
        expect(graph.size).toBe(3);

        const node4 = graph.addNode('node 4', 4);
        expect(node4.id).toBe('4');
        expect(node4.value).toBe('node 4');
        expect(graph.size).toBe(4);

        const node5 = graph.addNode('node 5');
        expect(node5.id).toBe('5');
        expect(node5.value).toBe('node 5');
        expect(graph.size).toBe(5);

        const node6 = graph.addNode('node 6', 10);
        expect(node6.id).toBe('10');
        expect(node6.value).toBe('node 6');
        expect(graph.size).toBe(6);

        const node7 = graph.addNode('node 7');
        expect(node7.id).toBe('11');
        expect(node7.value).toBe('node 7');
        expect(graph.size).toBe(7);
    });

    test('addNode | invalid id => throw error', () => {
        const graph = new Graph<string>();

        let error: Error;

        try {
            graph.addNode('this is the value', { id: 'invalid id' } as any);
        } catch (e) {
            error = e;
        }
        expect(error).toBeTruthy();

        error = undefined;
        expect(error).toBeFalsy();

        try {
            graph.addNode('this is the value', ['invalid id'] as any);
        } catch (e) {
            error = e;
        }
        expect(error).toBeTruthy();

        error = undefined;
        expect(error).toBeFalsy();

        try {
            graph.addNode('this is the value', true as any);
        } catch (e) {
            error = e;
        }
        expect(error).toBeTruthy();
    });

    test('getNode | get an existing node => node', () => {
        const graph = new Graph<number>();

        const addedNode = graph.addNode(1, 'arbitraryId');
        const node = graph.getNode('arbitraryId');

        expect(node).toBeTruthy();
        expect(node).toBe(addedNode);
    });

    test('getNode | get a non-existing node => undefined', () => {
        const graph = new Graph<number>();

        graph.addNode(1);
        const node = graph.getNode('arbitraryId');

        expect(node).toBeFalsy();
        expect(node).toBe(undefined);
    });

    test('addEdge | connect existing nodes => edges are added, weights are set', () => {
        const graph = new Graph<{ value: number }>();

        const node1 = graph.addNode({ value: 1 });
        const node2 = graph.addNode({ value: 2 });
        const node3 = graph.addNode({ value: 3 });
        const node4 = graph.addNode({ value: 4 });

        graph.addEdge(node1.id, node2.id, 5);
        graph.addEdge(node1.id, node3.id, 10);
        graph.addEdge(node1.id, node4.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node3.id, node2.id);

        expect(node1.edges[node2.id]).toBe(5);
        expect(node1.edges[node3.id]).toBe(10);
        expect(node1.edges[node4.id]).toBe(1);
        expect(node2.edges[node3.id]).toBe(1);
        expect(node3.edges[node2.id]).toBe(1);

        expect(Object.keys(node1.edges).length).toBe(3);
        expect(Object.keys(node2.edges).length).toBe(1);
        expect(Object.keys(node3.edges).length).toBe(1);
        expect(Object.keys(node4.edges).length).toBe(0);
    });

    test('addEdge | connect non-existing nodes => throw error', () => {
        const graph = new Graph<{ value: number }>();

        graph.addNode({ value: 1 }, 'id1');
        graph.addNode({ value: 2 }, 'id2');

        let error: Error;

        try {
            graph.addEdge('id1', 'nonExistingId');
        } catch (e) {
            error = e;
        }
        expect(error).toBeTruthy();

        error = undefined;
        expect(error).toBeFalsy();

        try {
            graph.addEdge('nonExistingId', 'id2');
        } catch (e) {
            error = e;
        }
        expect(error).toBeTruthy();
    });

    test('getEdges | get edges of a node with neighbors => array with edges', () => {
        const graph = new Graph<{ value: number }>();

        const node1 = graph.addNode({ value: 1 });
        const node2 = graph.addNode({ value: 2 });
        const node3 = graph.addNode({ value: 3 });
        const node4 = graph.addNode({ value: 4 });

        graph.addEdge(node1.id, node2.id, 5);
        graph.addEdge(node1.id, node3.id, 10);
        graph.addEdge(node1.id, node4.id);

        const edges = graph.getEdges(node1.id);
        const expectedEdges = [
            { neighborId: node2.id, weight: 5 },
            { neighborId: node3.id, weight: 10 },
            { neighborId: node4.id, weight: 1 },
        ];

        expect(edges).toStrictEqual(expectedEdges);
    });

    test('getEdges | get edges of a node without neighbors => empty array', () => {
        const graph = new Graph<{ value: number }>();

        const node1 = graph.addNode({ value: 1 });
        const node2 = graph.addNode({ value: 2 });
        const node3 = graph.addNode({ value: 3 });
        const node4 = graph.addNode({ value: 4 });

        graph.addEdge(node1.id, node2.id, 5);
        graph.addEdge(node1.id, node3.id, 10);
        graph.addEdge(node1.id, node4.id);

        const edges = graph.getEdges(node4.id);
        const expectedEdges = [];

        expect(edges).toStrictEqual(expectedEdges);
    });

    test('removeEdge | remove an edge of an existing node to an existing neighbor => edges are deleted', () => {
        const graph = new Graph<boolean>();

        const node1 = graph.addNode(true);
        const node2 = graph.addNode(true);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node2.id, node1.id);

        expect(node1.edges[node2.id]).toBe(1);
        expect(Object.keys(node1.edges).length).toBe(1);
        expect(node2.edges[node1.id]).toBe(1);
        expect(Object.keys(node2.edges).length).toBe(1);

        graph.removeEdge(node1.id, node2.id);

        expect(node1.edges[node2.id]).toBeFalsy();
        expect(Object.keys(node1.edges).length).toBe(0);

        graph.removeEdge(node2.id, node1.id);

        expect(node2.edges[node1.id]).toBeFalsy();
        expect(Object.keys(node2.edges).length).toBe(0);
    });

    test('removeEdge | remove an edge of an existing node to a non-existing neighbor => nothing changed', () => {
        const graph = new Graph<boolean>();

        const node1 = graph.addNode(true);
        const node2 = graph.addNode(true);

        expect(node1.edges[node2.id]).toBeFalsy();
        expect(Object.keys(node1.edges).length).toBe(0);
        expect(node2.edges[node1.id]).toBeFalsy();
        expect(Object.keys(node2.edges).length).toBe(0);

        graph.removeEdge(node1.id, node2.id);

        expect(node1.edges[node2.id]).toBeFalsy();
        expect(Object.keys(node1.edges).length).toBe(0);

        graph.removeEdge(node2.id, node1.id);

        expect(node2.edges[node1.id]).toBeFalsy();
        expect(Object.keys(node2.edges).length).toBe(0);
    });

    test('removeEdge | remove an edge of a non-existing node => nothing changed', () => {
        const graph = new Graph<boolean>();
        graph.removeEdge('nonExistingNodeId', 'nonExistingNeighborId');
    });

    test('removeNode | remove an existing node => node is removed, edges to the node are removed, size is updated', () => {
        const graph = new Graph<number>();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node1.id, node3.id);
        graph.addEdge(node2.id, node1.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node3.id, node1.id);
        graph.addEdge(node3.id, node2.id);

        expect(graph.size).toBe(3);
        expect(graph.getNode(node1.id)).toBeTruthy();
        expect(node2.edges[node1.id]).toBeTruthy();
        expect(node3.edges[node1.id]).toBeTruthy();

        graph.removeNode(node1.id);

        expect(graph.size).toBe(2);
        expect(graph.getNode(node1.id)).toBeFalsy();
        expect(node2.edges[node1.id]).toBeFalsy();
        expect(node3.edges[node1.id]).toBeFalsy();
    });

    test('removeNode | remove a non-existing node => nothing changed', () => {
        const graph = new Graph<number>();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node1.id, node3.id);
        graph.addEdge(node2.id, node1.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node3.id, node1.id);
        graph.addEdge(node3.id, node2.id);

        expect(graph.size).toBe(3);
        expect(graph.getNode(node1.id)).toBeTruthy();
        expect(node2.edges[node1.id]).toBeTruthy();
        expect(node3.edges[node1.id]).toBeTruthy();

        graph.removeNode('nonExistingNodeId');

        expect(graph.size).toBe(3);
        expect(graph.getNode(node1.id)).toBeTruthy();
        expect(node2.edges[node1.id]).toBeTruthy();
        expect(node3.edges[node1.id]).toBeTruthy();
    });

    test('adjacent | node has an edge to the neighbor = true', () => {
        const graph = new Graph<number>();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);

        graph.addEdge(node1.id, node2.id);

        const adjacent = graph.adjacent(node1.id, node2.id);
        expect(adjacent).toBe(true);
    });

    test('adjacent | node doesn\'t have an edge to the neighbor = false', () => {
        const graph = new Graph<number>();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);

        graph.addEdge(node2.id, node1.id);

        const adjacent = graph.adjacent(node1.id, node2.id);
        expect(adjacent).toBe(false);
    });
});
