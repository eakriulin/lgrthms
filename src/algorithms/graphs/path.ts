import { Graph } from '../../dataStructures/Graph';
import { MinHeap } from '../../dataStructures/MinHeap';

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
    const nodeInfosHeap: MinHeap<INodeInfo> = new MinHeap<INodeInfo>();

    const startInfo = { nodeId: startId, prevId: '', distance: 0 };

    nodeInfos[startId] = startInfo;
    nodeInfosHeap.insert(startInfo);

    while (nodeInfosHeap.size > 0) {
        const nodeInfo = nodeInfosHeap.extract();
        if (!nodeInfo) {
            break;
        }

        const node = graph.getNode(nodeInfo.nodeId);
        for (const neighborId in node.edges) {
            const currentDistance = nodeInfo.distance;
            const distanceToNeighbor = node.edges[neighborId];
            const totalDistance = currentDistance + distanceToNeighbor;

            if (nodeInfos[neighborId] === undefined || totalDistance < nodeInfos[neighborId].distance) {
                const neighborInfo = { nodeId: neighborId, prevId: nodeInfo.nodeId, distance: totalDistance };
                nodeInfos[neighborId] = neighborInfo;
                nodeInfosHeap.insert(neighborInfo);
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
