import { Comparator } from '../../utils/Comparator';

// O(nlog(n)) time | O(n) space
export function mergeSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const comparator = new Comparator(compareFn);

    const auxiliaryArray = [...array];
    doMergeSort(array, auxiliaryArray, comparator, 0, array.length - 1);

    return array;
}

function doMergeSort<T>(mainArray: T[], auxiliaryArray: T[], comparator: Comparator<T>, startIdx: number, endIdx: number): void {
    if (startIdx === endIdx) {
        return;
    }

    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    doMergeSort(auxiliaryArray, mainArray, comparator, startIdx, middleIdx);
    doMergeSort(auxiliaryArray, mainArray, comparator, middleIdx + 1, endIdx);

    merge(mainArray, auxiliaryArray, comparator, startIdx, middleIdx, endIdx);
}

function merge<T>(mainArray: T[], auxiliaryArray: T[], comparator: Comparator<T>, startIdx: number, middleIdx: number, endIdx: number): void {
    let sortedIdx = startIdx;
    let leftIdx = startIdx;
    let rightIdx = middleIdx + 1;

    while (leftIdx <= middleIdx && rightIdx <= endIdx) {
        if (comparator.isLessThan(auxiliaryArray[leftIdx], auxiliaryArray[rightIdx])) {
            mainArray[sortedIdx] = auxiliaryArray[leftIdx];
            leftIdx++;
        } else {
            mainArray[sortedIdx] = auxiliaryArray[rightIdx];
            rightIdx++;
        }
        sortedIdx++;
    }

    while(leftIdx <= middleIdx) {
        mainArray[sortedIdx] = auxiliaryArray[leftIdx];
        leftIdx++;
        sortedIdx++;
    }

    while(rightIdx <= endIdx) {
        mainArray[sortedIdx] = auxiliaryArray[rightIdx];
        rightIdx++;
        sortedIdx++;
    }
}
