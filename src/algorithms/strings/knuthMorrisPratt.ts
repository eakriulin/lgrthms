// O(n + m) time | O(m) space — where
// n is the length of the string
// m is the length of the substring
export function knuthMorrisPratt(string: string, substring: string): boolean {
    const pattern = buildPattern(substring);

    let i = 0;
    let j = 0;

    while (i + substring.length - j <= string.length) {
        if (string[i] === substring[j]) {
            if (j === substring.length - 1) {
                return true;
            }
            i++;
            j++;
        } else if (j > 0) {
            j = pattern[j - 1] + 1;
        } else {
            i++;
        }
    }

    return false;
}

function buildPattern(substring: string): number[] {
    const pattern = new Array(substring.length).fill(-1);
    let j = 0;
    let i = 1;

    while (i < substring.length) {
        if (substring[i] === substring[j]) {
            pattern[i] = j;
            i++;
            j++;
        } else if (j > 0) {
            j = pattern[j - 1] + 1;
        } else {
            i++;
        }
    }

    return pattern;
}
