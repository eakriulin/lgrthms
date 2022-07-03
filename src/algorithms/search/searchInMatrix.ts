// O(nm) time | O(1) space — where
// n is the number of rows
// m is the number of columns
export function searchInMatrix<T, K>(
    matrix: T[][],
    target: K,
): T | undefined
export function searchInMatrix<T, K>(
    matrix: T[][],
    target: K,
    get: (element: T) => K,
): T | undefined
export function searchInMatrix<T, K>(
    matrix: T[][],
    target: K,
    get?: (element: T) => T | K,
): T | undefined {
    const [i, j] = searchInMatrixIndexes(matrix, target, get);
    return i !== -1 && j !== -1 ? matrix[i][j] : undefined;
}

// O(nm) time | O(1) space — where
// n is the number of rows
// m is the number of columns
export function searchInMatrixIndexes<T, K>(
    matrix: T[][],
    target: K,
): [number, number]
export function searchInMatrixIndexes<T, K>(
    matrix: T[][],
    target: K,
    get: (element: T) => K,
): [number, number]
export function searchInMatrixIndexes<T, K>(
    matrix: T[][],
    target: K,
    get?: (element: T) => T | K,
): [number, number] {
    get = get ? get : (element: T): T => element;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (target === get(matrix[i][j])) {
                return [i, j];
            }
        }
    }

    return [-1, -1];
}

// O(n + m) time | O(1) space — where
// n is the number of rows
// m is the number of columns
export function searchInSortedMatrix<T, K>(
    matrix: T[][],
    target: K,
): T | undefined
export function searchInSortedMatrix<T, K>(
    matrix: T[][],
    target: K,
    get: (element: T) => K,
): T | undefined
export function searchInSortedMatrix<T, K>(
    matrix: T[][],
    target: K,
    get?: (element: T) => T | K,
): T | undefined {
    const [i, j] = searchInSortedMatrixIndexes(matrix, target, get);
    return i !== -1 && j !== -1 ? matrix[i][j] : undefined;
}

// O(n + m) time | O(1) space — where
// n is the number of rows
// m is the number of columns
export function searchInSortedMatrixIndexes<T, K>(
    matrix: T[][],
    target: K,
): [number, number]
export function searchInSortedMatrixIndexes<T, K>(
    matrix: T[][],
    target: K,
    get: (element: T) => K,
): [number, number]
export function searchInSortedMatrixIndexes<T, K>(
    matrix: T[][],
    target: K,
    get?: (element: T) => T | K,
): [number, number] {
    get = get ? get : (element: T): T => element;

    let i = 0;
    let j = matrix[i].length - 1;

    while (i < matrix.length && j >= 0) {
        if (target === get(matrix[i][j])) {
            return [i, j];
        }

        if (target < get(matrix[i][j])) {
            j--;
        } else {
            i++;
        }
    }

    return [-1, -1];
}
