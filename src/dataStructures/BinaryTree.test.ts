/* eslint-disable no-magic-numbers */
import { BinaryTree } from './BinaryTree';

describe('BinaryTree', () => {
    test('init | new instance => parent is null, left is null, right is null, size is 1', () => {
        const tree = new BinaryTree(1);
        expect(tree).toBeTruthy();
        expect(tree.parent).toBe(null);
        expect(tree.left).toBe(null);
        expect(tree.right).toBe(null);
        expect(tree.size).toBe(1);
    });

    test('insert | insert a handful of nodes => correct lefts, rights and parents, correct sizes, tree is filled from left to right', () => {
        const tree = new BinaryTree(1);

        const assert = (subtree: BinaryTree<number>, parent: BinaryTree<number>): void => {
            expect(subtree.size).toBe(1);
            expect(subtree.parent).toBe(parent);
            expect(subtree.left).toBe(null);
            expect(subtree.right).toBe(null);
        };

        const subtree2 = tree.insert(2);
        expect(tree.size).toBe(2);
        expect(tree.left).toBe(subtree2);
        assert(subtree2, tree);

        const subtree3 = tree.insert(3);
        expect(tree.size).toBe(3);
        expect(tree.right).toBe(subtree3);
        assert(subtree3, tree);

        const subtree4 = tree.insert(4);
        expect(tree.size).toBe(4);
        expect(subtree2.size).toBe(2);
        expect(subtree2.left).toBe(subtree4);
        assert(subtree4, subtree2);

        const subtree5 = tree.insert(5);
        expect(tree.size).toBe(5);
        expect(subtree2.size).toBe(3);
        expect(subtree2.right).toBe(subtree5);
        assert(subtree5, subtree2);

        const subtree6 = tree.insert(6);
        expect(tree.size).toBe(6);
        expect(subtree3.size).toBe(2);
        expect(subtree3.left).toBe(subtree6);
        assert(subtree6, subtree3);

        const subtree7 = tree.insert(7);
        expect(tree.size).toBe(7);
        expect(subtree3.size).toBe(3);
        expect(subtree3.right).toBe(subtree7);
        assert(subtree7, subtree3);

        const subtree8 = tree.insert(8);
        expect(tree.size).toBe(8);
        expect(subtree2.size).toBe(4);
        expect(subtree4.size).toBe(2);
        expect(subtree4.left).toBe(subtree8);
        assert(subtree8, subtree4);

        const subtree9 = tree.insert(9);
        expect(tree.size).toBe(9);
        expect(subtree2.size).toBe(5);
        expect(subtree4.size).toBe(3);
        expect(subtree4.right).toBe(subtree9);
        assert(subtree9, subtree4);

        const subtree10 = tree.insert(10);
        expect(tree.size).toBe(10);
        expect(subtree2.size).toBe(6);
        expect(subtree5.size).toBe(2);
        expect(subtree5.left).toBe(subtree10);
        assert(subtree10, subtree5);

        const subtree11 = tree.insert(11);
        expect(tree.size).toBe(11);
        expect(subtree2.size).toBe(7);
        expect(subtree5.size).toBe(3);
        expect(subtree5.right).toBe(subtree11);
        assert(subtree11, subtree5);

        const subtree12 = tree.insert(12);
        expect(tree.size).toBe(12);
        expect(subtree3.size).toBe(4);
        expect(subtree6.size).toBe(2);
        expect(subtree6.left).toBe(subtree12);
        assert(subtree12, subtree6);

        const subtree13 = tree.insert(13);
        expect(tree.size).toBe(13);
        expect(subtree3.size).toBe(5);
        expect(subtree6.size).toBe(3);
        expect(subtree6.right).toBe(subtree13);
        assert(subtree13, subtree6);
    });

    test('remove | remove an existing node => node\'s value replaced with the deepest right node\'s value, sizes are updated, the deepest node is removed', () => {
        const tree = new BinaryTree('1');

        const subtree2 = tree.insert('2');
        const subtree3 = tree.insert('3');
        const subtree4 = tree.insert('4');
        const subtree5 = tree.insert('5');
        const subtree6 = tree.insert('6');
        tree.insert('7');
        tree.insert('8');
        tree.insert('9');
        tree.insert('10');
        tree.insert('11');
        const subtree12 = tree.insert('12');

        tree.remove(subtree2);

        expect(tree.size).toBe(11);
        expect(tree.left).toBe(subtree2);

        expect(subtree2.size).toBe(7);
        expect(subtree2.value).toBe(subtree12.value);
        expect(subtree2.left).toBe(subtree4);
        expect(subtree2.right).toBe(subtree5);

        expect(subtree3.size).toBe(3);
        expect(subtree6.size).toBe(1);

        expect(subtree12.parent).toBe(null);
        expect(subtree12.left).toBe(null);
        expect(subtree12.right).toBe(null);
    });

    test('remove | remove a non-existing node => nothing changes', () => {
        const tree = new BinaryTree('1');
        tree.insert('2');
        const subtree3 = tree.insert('3');
        tree.insert('4');
        tree.insert('5');
        const subtree6 = tree.insert('6');

        const nonExistingSubtree = new BinaryTree('100');
        tree.remove(nonExistingSubtree);

        expect(tree.size).toBe(6);

        expect(subtree3.size).toBe(2);
        expect(subtree3.left).toBe(subtree6);

        expect(subtree6.parent).toBe(subtree3);
        expect(subtree6.left).toBe(null);
        expect(subtree6.right).toBe(null);
    });

    test('removeWithValue | remove an existing value => node\'s value replaced with the deepest right node\'s value, sizes are updated, the deepest node is removed', () => {
        const tree = new BinaryTree({ count: 10 });

        const subtree1 = tree.insert({ count: 20 });
        const subtree2 = tree.insert({ count: 30 });
        const subtree3 = tree.insert({ count: 2 });
        const subtree4 = tree.insert({ count: 2 });
        const subtree5 = tree.insert({ count: 2 });
        const subtree6 = tree.insert({ count: 2 });
        const subtree7 = tree.insert({ count: 40 });

        tree.removeWithValue(value => value.count === 2);

        expect(tree.size).toBe(4);
        expect(tree.left).toBe(subtree1);
        expect(tree.right).toBe(subtree2);

        expect(subtree1.size).toBe(2);
        expect(subtree1.left).toBe(subtree3);
        expect(subtree1.right).toBe(null);

        expect(subtree2.size).toBe(1);
        expect(subtree2.left).toBe(null);
        expect(subtree2.right).toBe(null);

        expect(subtree3.size).toBe(1);
        expect(subtree3.value).toBe(subtree7.value);
        expect(subtree3.parent).toBe(subtree1);
        expect(subtree3.left).toBe(null);
        expect(subtree3.right).toBe(null);

        const assert = (subtree: BinaryTree<{ count: number }>): void => {
            expect(subtree.parent).toBe(null);
            expect(subtree.left).toBe(null);
            expect(subtree.right).toBe(null);
        };

        assert(subtree4);
        assert(subtree5);
        assert(subtree6);
        assert(subtree7);
    });

    test('removeWithValue | remove a non-existing node => nothing changes', () => {
        const tree = new BinaryTree({ count: 1 });
        tree.insert({ count: 2 });
        tree.insert({ count: 3 });
        const subtree4 = tree.insert({ count: 4 });
        tree.insert({ count: 5 });
        tree.insert({ count: 6 });
        tree.insert({ count: 7 });
        const subtree8 = tree.insert({ count: 8 });

        tree.removeWithValue(value => value.count === 100);

        expect(tree.size).toBe(8);

        expect(subtree4.size).toBe(2);
        expect(subtree4.left).toBe(subtree8);

        expect(subtree8.size).toBe(1);
        expect(subtree8.parent).toBe(subtree4);
        expect(subtree8.left).toBe(null);
        expect(subtree8.right).toBe(null);
    });

    test('deepFirstSearch | find an existing value => node is returned', () => {
        const tree = new BinaryTree(1);

        const subtree2 = tree.insert(2);
        const subtree3 = tree.insert(3);
        const subtree4 = tree.insert(4);
        const subtree5 = tree.insert(5);
        const subtree6 = tree.insert(6);

        const subtree7 = new BinaryTree(7);
        subtree6.right = subtree7;

        expect(tree.deepFirstSearch(value => value === 1)).toBe(tree);
        expect(tree.deepFirstSearch(value => value === 2)).toBe(subtree2);
        expect(tree.deepFirstSearch(value => value === 3)).toBe(subtree3);
        expect(tree.deepFirstSearch(value => value === 4)).toBe(subtree4);
        expect(tree.deepFirstSearch(value => value === 5)).toBe(subtree5);
        expect(tree.deepFirstSearch(value => value === 6)).toBe(subtree6);
        expect(tree.deepFirstSearch(value => value === 7)).toBe(subtree7);
    });

    test('deepFirstSearch | find a non-existing value => null is returned', () => {
        const tree = new BinaryTree(1);
        tree.insert(2);
        tree.insert(3);
        tree.insert(4);
        tree.insert(5);

        expect(tree.deepFirstSearch(value => value === 100)).toBe(null);
    });

    test('breadthFirstSearch | find an existing value => node is returned', () => {
        const tree = new BinaryTree(1);

        const subtree2 = tree.insert(2);
        const subtree3 = tree.insert(3);
        const subtree4 = tree.insert(4);
        const subtree5 = tree.insert(5);
        const subtree6 = tree.insert(6);

        const subtree7 = new BinaryTree(7);
        subtree6.right = subtree7;

        expect(tree.breadthFirstSearch(value => value === 1)).toBe(tree);
        expect(tree.breadthFirstSearch(value => value === 2)).toBe(subtree2);
        expect(tree.breadthFirstSearch(value => value === 3)).toBe(subtree3);
        expect(tree.breadthFirstSearch(value => value === 4)).toBe(subtree4);
        expect(tree.breadthFirstSearch(value => value === 5)).toBe(subtree5);
        expect(tree.breadthFirstSearch(value => value === 6)).toBe(subtree6);
        expect(tree.breadthFirstSearch(value => value === 7)).toBe(subtree7);
    });

    test('breadthFirstSearch | find a non-existing value => null is returned', () => {
        const tree = new BinaryTree(1);
        tree.insert(2);
        tree.insert(3);
        tree.insert(4);
        tree.insert(5);

        expect(tree.breadthFirstSearch(value => value === 100)).toBe(null);
    });

    test('traverseInOrder | traverse and push values to the array => values are "in order"', () => {
        const tree = new BinaryTree(1);
        tree.insert(2);
        tree.insert(3);
        tree.insert(4);
        tree.insert(5);
        tree.insert(6);
        tree.insert(7);

        const array: number[] = [];
        tree.traverseInOrder(value => array.push(value));

        expect(array).toStrictEqual([4, 2, 5, 1, 6, 3, 7]);
    });

    test('traversePreOrder | traverse and push values to the array => values are "pre order"', () => {
        const tree = new BinaryTree(1);
        tree.insert(2);
        tree.insert(3);
        tree.insert(4);
        tree.insert(5);
        tree.insert(6);
        tree.insert(7);

        const array: number[] = [];
        tree.traversePreOrder(value => array.push(value));

        expect(array).toStrictEqual([1, 2, 4, 5, 3, 6, 7]);
    });

    test('traversePostOrder | traverse and push values to the array => values are "post order"', () => {
        const tree = new BinaryTree(1);
        tree.insert(2);
        tree.insert(3);
        tree.insert(4);
        tree.insert(5);
        tree.insert(6);
        tree.insert(7);

        const array: number[] = [];
        tree.traversePostOrder(value => array.push(value));

        expect(array).toStrictEqual([4, 5, 2, 6, 7, 3, 1]);
    });

    test('left, right | set left and right nodes manually => sizes and parents are updated', () => {
        const tree = new BinaryTree(1);

        const subtree2 = new BinaryTree(2);
        const subtree3 = new BinaryTree(3);
        const subtree4 = new BinaryTree(4);
        const subtree5 = new BinaryTree(5);
        const subtree6 = new BinaryTree(6);
        const subtree7 = new BinaryTree(7);
        const subtree8 = new BinaryTree(8);
        const subtree9 = new BinaryTree(9);

        tree.left = subtree2;
        expect(tree.size).toBe(2);
        expect(subtree2.size).toBe(1);
        expect(subtree2.parent).toBe(tree);

        tree.right = subtree3;
        expect(tree.size).toBe(3);
        expect(subtree3.size).toBe(1);
        expect(subtree3.parent).toBe(tree);

        subtree4.left = subtree5;
        subtree5.right = subtree6;
        subtree6.left = subtree7;
        expect(subtree4.size).toBe(4);
        expect(subtree5.size).toBe(3);
        expect(subtree6.size).toBe(2);
        expect(subtree7.size).toBe(1);
        expect(subtree4.parent).toBe(null);
        expect(subtree5.parent).toBe(subtree4);
        expect(subtree6.parent).toBe(subtree5);
        expect(subtree7.parent).toBe(subtree6);

        tree.left = subtree4;
        expect(tree.size).toBe(6);
        expect(subtree4.parent).toBe(tree);

        subtree3.left = subtree8;
        subtree8.right = subtree9;
        expect(tree.size).toBe(8);
        expect(subtree3.size).toBe(3);
        expect(subtree8.size).toBe(2);
        expect(subtree9.size).toBe(1);
        expect(subtree8.parent).toBe(subtree3);
        expect(subtree9.parent).toBe(subtree8);
    });
});
