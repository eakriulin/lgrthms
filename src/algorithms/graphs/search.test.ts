/* eslint-disable no-magic-numbers */
import { breadthFirstSearch, depthFirstSearch } from './search';
import { Graph } from '../../dataStructures/Graph';

describe('Graph search', () => {
    test('depthFirstSearch | directed acyclic graph, find existing reachable value => node id is returned', () => {
        const graph = new Graph();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);
        const node4 = graph.addNode(4);
        const node5 = graph.addNode(5);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node2.id, node4.id);
        graph.addEdge(node4.id, node5.id);

        expect(depthFirstSearch(node1.id, graph, (value: number) => value === 5)).toBe(node5.id);
    });

    test('depthFirstSearch | directed acyclic graph, find existing unreachable value => undefined is returned', () => {
        const graph = new Graph();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);
        const node4 = graph.addNode(4);
        graph.addNode(5);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node2.id, node4.id);

        expect(depthFirstSearch(node1.id, graph, (value: number) => value === 5)).toBe(undefined);
    });

    test('depthFirstSearch | directed acyclic graph, find non-existing value => undefined is returned', () => {
        const graph = new Graph();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);
        const node4 = graph.addNode(4);
        const node5 = graph.addNode(5);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node2.id, node4.id);
        graph.addEdge(node4.id, node5.id);

        expect(depthFirstSearch(node1.id, graph, (value: number) => value === 10)).toBe(undefined);
    });

    test('depthFirstSearch | undirected graph, find existing reachable value => node id is returned', () => {
        const graph = new Graph();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);
        const node4 = graph.addNode(4);
        const node5 = graph.addNode(5);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node2.id, node1.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node3.id, node2.id);
        graph.addEdge(node2.id, node4.id);
        graph.addEdge(node4.id, node2.id);
        graph.addEdge(node4.id, node5.id);
        graph.addEdge(node5.id, node4.id);

        expect(depthFirstSearch(node2.id, graph, (value: number) => value === 5)).toBe(node5.id);
    });

    test('depthFirstSearch | undirected graph, find existing unreachable value => undefined is returned', () => {
        const graph = new Graph();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);
        const node4 = graph.addNode(4);
        graph.addNode(5);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node2.id, node1.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node3.id, node2.id);
        graph.addEdge(node2.id, node4.id);
        graph.addEdge(node4.id, node2.id);

        expect(depthFirstSearch(node2.id, graph, (value: number) => value === 5)).toBe(undefined);
    });

    test('depthFirstSearch | undirected graph, find non-existing value => undefined is returned', () => {
        const graph = new Graph();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);
        const node4 = graph.addNode(4);
        const node5 = graph.addNode(5);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node2.id, node1.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node3.id, node2.id);
        graph.addEdge(node2.id, node4.id);
        graph.addEdge(node4.id, node2.id);
        graph.addEdge(node4.id, node5.id);
        graph.addEdge(node5.id, node4.id);

        expect(depthFirstSearch(node2.id, graph, (value: number) => value === 10)).toBe(undefined);
    });

    test('breadthFirstSearch | directed acyclic graph, find existing reachable value => node id is returned', () => {
        const graph = new Graph();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);
        const node4 = graph.addNode(4);
        const node5 = graph.addNode(5);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node2.id, node4.id);
        graph.addEdge(node4.id, node5.id);

        expect(breadthFirstSearch(node1.id, graph, (value: number) => value === 5)).toBe(node5.id);
    });

    test('breadthFirstSearch | directed acyclic graph, find existing unreachable value => undefined is returned', () => {
        const graph = new Graph();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);
        const node4 = graph.addNode(4);
        graph.addNode(5);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node2.id, node4.id);

        expect(breadthFirstSearch(node1.id, graph, (value: number) => value === 5)).toBe(undefined);
    });

    test('breadthFirstSearch | directed acyclic graph, find non-existing value => undefined is returned', () => {
        const graph = new Graph();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);
        const node4 = graph.addNode(4);
        const node5 = graph.addNode(5);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node2.id, node4.id);
        graph.addEdge(node4.id, node5.id);

        expect(breadthFirstSearch(node1.id, graph, (value: number) => value === 10)).toBe(undefined);
    });

    test('breadthFirstSearch | undirected graph, find existing reachable value => node id is returned', () => {
        const graph = new Graph();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);
        const node4 = graph.addNode(4);
        const node5 = graph.addNode(5);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node2.id, node1.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node3.id, node2.id);
        graph.addEdge(node2.id, node4.id);
        graph.addEdge(node4.id, node2.id);
        graph.addEdge(node4.id, node5.id);
        graph.addEdge(node5.id, node4.id);

        expect(breadthFirstSearch(node2.id, graph, (value: number) => value === 5)).toBe(node5.id);
    });

    test('breadthFirstSearch | undirected graph, find existing unreachable value => undefined is returned', () => {
        const graph = new Graph();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);
        const node4 = graph.addNode(4);
        graph.addNode(5);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node2.id, node1.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node3.id, node2.id);
        graph.addEdge(node2.id, node4.id);
        graph.addEdge(node4.id, node2.id);

        expect(breadthFirstSearch(node2.id, graph, (value: number) => value === 5)).toBe(undefined);
    });

    test('breadthFirstSearch | undirected graph, find non-existing value => undefined is returned', () => {
        const graph = new Graph();

        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);
        const node4 = graph.addNode(4);
        const node5 = graph.addNode(5);

        graph.addEdge(node1.id, node2.id);
        graph.addEdge(node2.id, node1.id);
        graph.addEdge(node2.id, node3.id);
        graph.addEdge(node3.id, node2.id);
        graph.addEdge(node2.id, node4.id);
        graph.addEdge(node4.id, node2.id);
        graph.addEdge(node4.id, node5.id);
        graph.addEdge(node5.id, node4.id);

        expect(breadthFirstSearch(node2.id, graph, (value: number) => value === 10)).toBe(undefined);
    });
});
