/* eslint-disable no-magic-numbers */
import { Trie } from './Trie';

describe('Trie', () => {
    test('init | new instance => size is 0', () => {
        const trie = new Trie();
        expect(trie).toBeTruthy();
        expect(trie.size).toBe(0);
    });

    test('insert | words with common prefixes and standalone words => size is updated', () => {
        const trie = new Trie();

        trie.insert('this');
        expect(trie.size).toBe(1);

        trie.insert('thanks');
        expect(trie.size).toBe(2);

        trie.insert('is');
        expect(trie.size).toBe(3);

        trie.insert('data structure');
        expect(trie.size).toBe(4);

        trie.insert('test');
        expect(trie.size).toBe(5);

        trie.insert('testify');
        expect(trie.size).toBe(6);

        expect(trie.contains('this')).toBe(true);
        expect(trie.contains('thanks')).toBe(true);
        expect(trie.contains('is')).toBe(true);
        expect(trie.contains('data structure')).toBe(true);
        expect(trie.contains('test')).toBe(true);
        expect(trie.contains('testify')).toBe(true);

        expect(trie.contains('non-existing')).toBe(false);
        expect(trie.contains('thi')).toBe(false);
        expect(trie.contains('anks')).toBe(false);
        expect(trie.contains('i')).toBe(false);
        expect(trie.contains('data')).toBe(false);
        expect(trie.contains(' ')).toBe(false);
        expect(trie.contains('structure')).toBe(false);
        expect(trie.contains('Test')).toBe(false);
        expect(trie.contains('testifyyy')).toBe(false);
    });

    test('contains | words with common prefixes and standalone words => inserted words can be found; truncated, elongated and non-existing words cannot be found', () => {
        const trie = new Trie();

        trie.insert('this');
        trie.insert('thanks');
        trie.insert('is');
        trie.insert('data structure');
        trie.insert('test');
        trie.insert('testify');

        expect(trie.contains('this')).toBe(true);
        expect(trie.contains('thanks')).toBe(true);
        expect(trie.contains('is')).toBe(true);
        expect(trie.contains('data structure')).toBe(true);
        expect(trie.contains('test')).toBe(true);
        expect(trie.contains('testify')).toBe(true);

        expect(trie.contains('non-existing')).toBe(false);
        expect(trie.contains('thi')).toBe(false);
        expect(trie.contains('anks')).toBe(false);
        expect(trie.contains('i')).toBe(false);
        expect(trie.contains('data')).toBe(false);
        expect(trie.contains(' ')).toBe(false);
        expect(trie.contains('structure')).toBe(false);
        expect(trie.contains('Test')).toBe(false);
        expect(trie.contains('testifyyy')).toBe(false);
    });

    test('remove | words with common prefixes and standalone words => size is updated, standalone words are completely removed; words with common prefixes are removed, but «dependent» words are kept', () => {
        const trie = new Trie();

        trie.insert('this');
        trie.insert('thanks');
        trie.insert('is');
        trie.insert('data structure');
        trie.insert('test');
        trie.insert('testify');

        expect(trie.size).toBe(6);
        trie.remove('non-existing');
        expect(trie.size).toBe(6);

        trie.remove('this');
        expect(trie.size).toBe(5);
        expect(trie.contains('this')).toBe(false);
        expect(trie.contains('thanks')).toBe(true);

        trie.remove('is');
        expect(trie.size).toBe(4);
        expect(trie.contains('is')).toBe(false);

        trie.remove('data');
        expect(trie.size).toBe(4);
        expect(trie.contains('data structure')).toBe(true);
        trie.remove('structure');
        expect(trie.size).toBe(4);
        expect(trie.contains('data structure')).toBe(true);
        trie.remove('data structure');
        expect(trie.size).toBe(3);
        expect(trie.contains('data structure')).toBe(false);

        trie.remove('tests');
        expect(trie.size).toBe(3);
        expect(trie.contains('test')).toBe(true);
        expect(trie.contains('testify')).toBe(true);

        trie.remove('testify');
        expect(trie.size).toBe(2);
        expect(trie.contains('testify')).toBe(false);
        expect(trie.contains('test')).toBe(true);

        trie.remove('thanks');
        expect(trie.size).toBe(1);
        expect(trie.contains('thanks')).toBe(false);
        expect(trie.contains('test')).toBe(true);

        trie.remove('test');
        expect(trie.size).toBe(0);
        expect(trie.contains('test')).toBe(false);
    });

    test('getWords | get inserted words as array => array with all existing words is returned', () => {
        const trie = new Trie();

        trie.insert('this');
        trie.insert('thanks');
        trie.insert('is');
        trie.insert('data structure');
        trie.insert('test');
        trie.insert('testify');

        expect(trie.getWords()).toStrictEqual(['this', 'thanks', 'test', 'testify', 'is', 'data structure']);
    });

    test('autocomplete | autocomplete existing words, no limit => all possible completions are returned', () => {
        const trie = new Trie();

        trie.insert('this');
        trie.insert('thanks');
        trie.insert('is');
        trie.insert('data structure');
        trie.insert('test');
        trie.insert('testify');

        expect(trie.autocomplete('t')).toStrictEqual(['this', 'thanks', 'test', 'testify']);
        expect(trie.autocomplete('th')).toStrictEqual(['this', 'thanks']);
        expect(trie.autocomplete('dat')).toStrictEqual(['data structure']);
        expect(trie.autocomplete('is')).toStrictEqual(['is']);

        expect(trie.autocomplete('t', 1)).toStrictEqual(['this']);
        expect(trie.autocomplete('t', 2)).toStrictEqual(['this', 'thanks']);
        expect(trie.autocomplete('t', 3)).toStrictEqual(['this', 'thanks', 'test']);
    });

    test('autocomplete | autocomplete existing words, with limit => limited set of completions is returned', () => {
        const trie = new Trie();

        trie.insert('this');
        trie.insert('thanks');
        trie.insert('is');
        trie.insert('data structure');
        trie.insert('test');
        trie.insert('testify');

        expect(trie.autocomplete('t', 1)).toStrictEqual(['this']);
        expect(trie.autocomplete('t', 2)).toStrictEqual(['this', 'thanks']);
        expect(trie.autocomplete('t', 3)).toStrictEqual(['this', 'thanks', 'test']);
        expect(trie.autocomplete('t', 4)).toStrictEqual(['this', 'thanks', 'test', 'testify']);

        expect(trie.autocomplete('data', 0)).toStrictEqual([]);
        expect(trie.autocomplete('data', 10)).toStrictEqual(['data structure']);
    });

    test('autocomplete | autocomplete non-existing words => empty array is returned', () => {
        const trie = new Trie();

        trie.insert('this');
        trie.insert('thanks');
        trie.insert('is');
        trie.insert('data structure');
        trie.insert('test');
        trie.insert('testify');

        expect(trie.autocomplete('non-existing')).toStrictEqual([]);
        expect(trie.autocomplete('THANKS')).toStrictEqual([]);
        expect(trie.autocomplete('dddata')).toStrictEqual([]);
        expect(trie.autocomplete('testifyyy')).toStrictEqual([]);
    });
});
