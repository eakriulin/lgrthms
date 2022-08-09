/* eslint-disable no-magic-numbers */
import { Graph } from '../../dataStructures/Graph';
import { dijkstrasAlgorithm } from './path';

describe('Path finding algorithms', () => {
    test('dijkstrasAlgorithm | directed acyclic graph with weighted edges => valid path and distance are returned', () => {
        const graph = new Graph<number>();

        const node0 = graph.addNode(0, 0);
        const node1 = graph.addNode(1, 1);
        const node2 = graph.addNode(2, 2);
        const node3 = graph.addNode(3, 3);
        const node4 = graph.addNode(4, 4);
        const node5 = graph.addNode(5, 5);

        graph.addEdge(node0.id, node1.id, 7);
        graph.addEdge(node1.id, node2.id, 6);
        graph.addEdge(node1.id, node3.id, 20);
        graph.addEdge(node1.id, node4.id, 3);
        graph.addEdge(node2.id, node3.id, 13);
        graph.addEdge(node3.id, node4.id, 2);

        expect(dijkstrasAlgorithm(node0.id, node0.id, graph)).toStrictEqual({ path: [node0.id], distance: 0 });
        expect(dijkstrasAlgorithm(node0.id, node1.id, graph)).toStrictEqual({ path: [node0.id, node1.id], distance: 7 });
        expect(dijkstrasAlgorithm(node0.id, node2.id, graph)).toStrictEqual({ path: [node0.id, node1.id, node2.id], distance: 13 });
        expect(dijkstrasAlgorithm(node0.id, node3.id, graph)).toStrictEqual({ path: [node0.id, node1.id, node2.id, node3.id], distance: 26 });
        expect(dijkstrasAlgorithm(node0.id, node4.id, graph)).toStrictEqual({ path: [node0.id, node1.id, node4.id], distance: 10 });
        expect(dijkstrasAlgorithm(node0.id, node5.id, graph)).toStrictEqual({ path: [], distance: -1 });
    });

    test('dijkstrasAlgorithm | undirected cyclic graph with weighted edges => valid path and distance are returned', () => {
        const graph = new Graph<number>();

        const node0 = graph.addNode(0, 0);
        const node1 = graph.addNode(1, 1);
        const node2 = graph.addNode(2, 2);
        const node3 = graph.addNode(3, 3);
        const node4 = graph.addNode(4, 4);
        const node5 = graph.addNode(5, 5);

        graph.addEdge(node0.id, node1.id, 7);
        graph.addEdge(node1.id, node0.id, 7);
        graph.addEdge(node1.id, node2.id, 6);
        graph.addEdge(node2.id, node1.id, 6);
        graph.addEdge(node1.id, node3.id, 20);
        graph.addEdge(node3.id, node1.id, 20);
        graph.addEdge(node1.id, node4.id, 3);
        graph.addEdge(node4.id, node1.id, 3);
        graph.addEdge(node2.id, node3.id, 13);
        graph.addEdge(node3.id, node2.id, 13);
        graph.addEdge(node3.id, node4.id, 2);
        graph.addEdge(node4.id, node3.id, 2);

        expect(dijkstrasAlgorithm(node0.id, node0.id, graph)).toStrictEqual({ path: [node0.id], distance: 0 });
        expect(dijkstrasAlgorithm(node0.id, node1.id, graph)).toStrictEqual({ path: [node0.id, node1.id], distance: 7 });
        expect(dijkstrasAlgorithm(node0.id, node2.id, graph)).toStrictEqual({ path: [node0.id, node1.id, node2.id], distance: 13 });
        expect(dijkstrasAlgorithm(node0.id, node3.id, graph)).toStrictEqual({ path: [node0.id, node1.id, node4.id, node3.id], distance: 12 });
        expect(dijkstrasAlgorithm(node0.id, node4.id, graph)).toStrictEqual({ path: [node0.id, node1.id, node4.id], distance: 10 });
        expect(dijkstrasAlgorithm(node0.id, node5.id, graph)).toStrictEqual({ path: [], distance: -1 });
    });
});
