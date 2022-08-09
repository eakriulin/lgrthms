import { MinHeap } from '../../dataStructures/MinHeap';

interface IPoint {
    row: number;
    col: number;
}

interface IPointInfo {
    point: IPoint;
    prev: IPoint | null;
    distance: number;
    priority: number;
}

interface IResultantPath {
    path: IPoint[];
    distance: number;
}

const MOVES = [[-1, 0], [0, 1], [0, -1], [1, 0]];
const OBSTACLE_VALUE = 1;

// O(wh * log(wh)) time | O(wh) space — where
// w is the width of the matrix
// h is the height of the matrix
export function aStarAlgorithm(start: IPoint, finish: IPoint, matrix: number[][]): any {
    const pointInfos: Record<string, IPointInfo> = {};
    const pointInfosHeap: MinHeap<IPointInfo> = new MinHeap((a, b) => a.priority - b.priority);

    if (!isValidPointAndNotObstacle(start, matrix) || !isValidPointAndNotObstacle(finish, matrix)) {
        return getResultantPath(finish, pointInfos);
    }

    const startInfo: IPointInfo = { point: start, prev: null, distance: 0, priority: 0 };

    pointInfos[getKey(start)] = startInfo;
    pointInfosHeap.insert(startInfo);

    while (pointInfosHeap.size > 0) {
        const pointInfo = pointInfosHeap.extract();
        const point = pointInfo.point;

        if (point.row === finish.row && point.col === finish.col) {
            break;
        }

        for (const move of MOVES) {
            const neighbor = getPoint(point.row + move[0], point.col + move[1]);
            if (!isValidPointAndNotObstacle(neighbor, matrix)) {
                continue;
            }

            const key = getKey(neighbor);
            const distance = pointInfo.distance + 1;
            if (pointInfos[key] && distance >= pointInfos[key].distance) {
                continue;
            }

            const priority = distance + manhattanDistance(neighbor, finish);
            const neighborInfo = { point: neighbor, prev: point, distance, priority };
            pointInfos[key] = neighborInfo;
            pointInfosHeap.insert(neighborInfo);
        }
    }

    return getResultantPath(finish, pointInfos);
}

function isValidPointAndNotObstacle(point: IPoint, matrix: number[][]): boolean {
    const isRowInBound = point.row >= 0 && point.row < matrix.length;
    const isColInBound = point.col >= 0 && point.col < matrix[0].length;
    return isRowInBound && isColInBound && matrix[point.row][point.col] !== OBSTACLE_VALUE;
}

function getResultantPath(finish: IPoint, pointInfos: Record<string, IPointInfo>): IResultantPath {
    const resultantPath: IResultantPath = { path: [], distance: -1 };

    const finishKey = getKey(finish);
    if (pointInfos[finishKey] === undefined) {
        return resultantPath;
    }

    resultantPath.distance = pointInfos[finishKey].distance;
    let current = finish;

    while (current) {
        resultantPath.path.push(current);
        current = pointInfos[getKey(current)].prev;
    }

    resultantPath.path.reverse();
    return resultantPath;
}

function manhattanDistance(current: IPoint, finish: IPoint): number {
    return Math.abs(current.row - finish.row) + Math.abs(current.col - finish.col);
}

function getPoint(row: number, col: number): IPoint {
    return { row, col };
}

function getKey(point: IPoint): string {
    return `${point.row}_${point.col}`;
}
