import { Graph } from '../../dataStructures/Graph';
import { MinHeap } from '../../dataStructures/MinHeap';
import { Queue } from '../../dataStructures/Queue';

interface INodeInfo {
    nodeId: string;
    prevId: string;
    distance: number;
}

interface IResultantPath {
    path: string[];
    distance: number;
}

// O((n + e) * nlog(n)) time | O(n) space — where
// n is the number of nodes
// e is the number of edges
export function dijkstrasAlgorithm(startId: string, finishId: string, graph: Graph): IResultantPath {
    const nodeInfos: Record<string, INodeInfo> = {};
    const nodeInfosHeap: MinHeap<INodeInfo> = new MinHeap<INodeInfo>((a, b) => a.distance - b.distance);

    if (!graph.getNode(startId) || !graph.getNode(finishId)) {
        return getResultantPath(finishId, nodeInfos);
    }

    const startInfo: INodeInfo = { nodeId: startId, prevId: '', distance: 0 };

    nodeInfos[startId] = startInfo;
    nodeInfosHeap.insert(startInfo);

    while (nodeInfosHeap.size > 0) {
        const nodeInfo = nodeInfosHeap.extract();
        const node = graph.getNode(nodeInfo.nodeId);

        for (const neighborId in node.edges) {
            const currentDistance = nodeInfo.distance;
            const distanceToNeighbor = node.edges[neighborId];
            const totalDistance = currentDistance + distanceToNeighbor;

            if (nodeInfos[neighborId] === undefined || totalDistance < nodeInfos[neighborId].distance) {
                const neighborInfo: INodeInfo = { nodeId: neighborId, prevId: nodeInfo.nodeId, distance: totalDistance };
                nodeInfos[neighborId] = neighborInfo;
                nodeInfosHeap.insert(neighborInfo);
            }
        }
    }

    return getResultantPath(finishId, nodeInfos);
}

// O(n + e) time | O(n) space — where
// n is the number of nodes
// e is the number of edges
export function bfsShortestPath(startId: string, finishId: string, graph: Graph): IResultantPath {
    const nodeInfos: Record<string, INodeInfo> = {};
    const queue = new Queue<INodeInfo>();

    if (!graph.getNode(startId) || !graph.getNode(finishId)) {
        return getResultantPath(finishId, nodeInfos);
    }

    const startInfo: INodeInfo = { nodeId: startId, prevId: '', distance: 0 };

    nodeInfos[startId] = startInfo;
    queue.enqueue(startInfo);

    while (queue.size > 0) {
        const nodeInfo = queue.dequeue();
        const node = graph.getNode(nodeInfo.nodeId);

        for (const neighborId in node.edges) {
            const currentDistance = nodeInfo.distance;
            const distanceToNeighbor = node.edges[neighborId];
            const totalDistance = currentDistance + distanceToNeighbor;

            if (nodeInfos[neighborId] === undefined || totalDistance < nodeInfos[neighborId].distance) {
                const neighborInfo: INodeInfo = { nodeId: neighborId, prevId: nodeInfo.nodeId, distance: totalDistance };
                nodeInfos[neighborId] = neighborInfo;
                queue.enqueue(neighborInfo);
            }
        }
    }

    return getResultantPath(finishId, nodeInfos);
}

function getResultantPath(finishId: string, nodeInfos: Record<string, INodeInfo>): IResultantPath {
    const resultantPath: IResultantPath = { path: [], distance: -1 };
    if (nodeInfos[finishId] === undefined) {
        return resultantPath;
    }

    resultantPath.distance = nodeInfos[finishId].distance;
    let currentId = finishId;

    while (currentId) {
        resultantPath.path.push(currentId);
        currentId = nodeInfos[currentId].prevId;
    }

    resultantPath.path.reverse();
    return resultantPath;
}
