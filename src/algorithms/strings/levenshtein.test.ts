/* eslint-disable no-magic-numbers */
import { levenshteinDistance } from './levenshtein';

describe('levenshteinDistance', () => {
    test('levenshteinDistance | different strings are passed => correct distance is returned', () => {
        expect(levenshteinDistance('yabc', 'abc')).toBe(1);
        expect(levenshteinDistance('abc', 'abcy')).toBe(1);
        expect(levenshteinDistance('Levenshtein Distance', 'levenshtein distance')).toBe(2);
        expect(levenshteinDistance('123456789', '123356788')).toBe(2);
        expect(levenshteinDistance('hello world', 'hll wrld')).toBe(3);
        expect(levenshteinDistance('algorithms', 'lgrthms')).toBe(3);
        expect(levenshteinDistance('this is a sentence', 'this is an extra sentence')).toBe(7);
        expect(levenshteinDistance('aABCDEFJh', 'aabcdefgh')).toBe(7);
    });

    test('levenshteinDistance | same strings are passed => distance is 0', () => {
        expect(levenshteinDistance('test', 'test')).toBe(0);
        expect(levenshteinDistance('abc', 'abc')).toBe(0);
        expect(levenshteinDistance('word', 'word')).toBe(0);
        expect(levenshteinDistance('some random sentence', 'some random sentence')).toBe(0);
    });
});
