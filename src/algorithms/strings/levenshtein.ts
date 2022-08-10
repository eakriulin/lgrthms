// O(nm) time | O(nm) space
export function levenshteinDistance(string1: string, string2: string): number {
    const table = buildTable(string1, string2);

    for (let i = 1; i <= string1.length; i++) {
        for (let j = 1; j <= string2.length; j++) {
            if (string1[i - 1] === string2[j - 1]) {
                table[i][j] = table[i - 1][j - 1];
            } else {
                table[i][j] = 1 + Math.min(
                    table[i - 1][j],
                    table[i - 1][j - 1],
                    table[i][j - 1],
                );
            }
        }
    }

    return table[string1.length][string2.length];
}

function buildTable(string1: string, string2: string): number[][] {
    const table: number[][] = [];

    for (let i = 0; i <= string1.length; i++) {
        const row: number[] = [];

        for (let j = 0; j <= string2.length; j++) {
            row.push(j);
        }

        row[0] = i;
        table.push(row);
    }

    return table;
}
