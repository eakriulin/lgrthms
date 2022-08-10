import { knuthMorrisPratt } from './knuthMorrisPratt';

describe('knuthMorrisPratt', () => {
    test('knuthMorrisPratt | substrings can be found in strings => true', () => {
        expect(knuthMorrisPratt('test', 'test')).toBe(true);
        expect(knuthMorrisPratt('testtest', 'test')).toBe(true);
        expect(knuthMorrisPratt('testtesttest', 'test')).toBe(true);

        expect(knuthMorrisPratt('abracadabra', 'abra')).toBe(true);
        expect(knuthMorrisPratt('abracadabra', 'acad')).toBe(true);
        expect(knuthMorrisPratt('abracadabra', 'dabra')).toBe(true);
    });

    test('knuthMorrisPratt | substrings cannot be found in strings => false', () => {
        expect(knuthMorrisPratt('tesset', 'test')).toBe(false);
        expect(knuthMorrisPratt('aefoaefcdaefcdaed', 'aefcaefaeiaefcd')).toBe(false);
        expect(knuthMorrisPratt('bccbefbcdabbbcabfdcfe', 'abc')).toBe(false);

        expect(knuthMorrisPratt('a sensible sentence', 'a sensible text')).toBe(false);
        expect(knuthMorrisPratt('repeat repeat repeat', 'repeatrepeatrepeat')).toBe(false);
        expect(knuthMorrisPratt('na na na na na na na', 'na na no na na')).toBe(false);
    });
});
