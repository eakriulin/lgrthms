/* eslint-disable camelcase */
/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
import { BinarySearchTree } from './BinarySearchTree';

describe('BinarySearchTree', () => {
    test('init | new instance => root is null, size is 0', () => {
        const bst = new BinarySearchTree<number>();
        expect(bst.root).toBe(null);
        expect(bst.size).toBe(0);
    });

    test('insert | insert a handful of nodes, default comparator => nodes are inserted, bst property is preserved', () => {
        const bst = new BinarySearchTree<number>();

        const node10 = bst.insert(10);
        const node5 = bst.insert(5);
        const node15 = bst.insert(15);
        const node2 = bst.insert(2);
        const node5_2 = bst.insert(5);
        const node13 = bst.insert(13);
        const node22 = bst.insert(22);
        const node1 = bst.insert(1);
        const node14 = bst.insert(14);
        const node12 = bst.insert(12);

        expect(bst.root).toBe(node10);
        expect(bst.size).toBe(10);

        const assert = (node: any, value: any, parent: any, left: any, right: any): void => {
            expect(node.value).toBe(value);
            expect(node.parent).toBe(parent);
            expect(node.left).toBe(left);
            expect(node.right).toBe(right);
        };

        assert(node10, 10, null, node5, node15);
        assert(node5, 5, node10, node2, node5_2);
        assert(node15, 15, node10, node13, node22);
        assert(node2, 2, node5, node1, null);
        assert(node5_2, 5, node5, null, null);
        assert(node13, 13, node15, node12, node14);
        assert(node22, 22, node15, null, null);
        assert(node12, 12, node13, null, null);
        assert(node14, 14, node13, null, null);
    });

    test('insert | insert a handful of nodes, custom comparator => nodes are inserted, bst property is preserved', () => {
        interface IValue { value: string }

        const compare = (a: IValue, b: IValue): number => Number(a.value) - Number(b.value);
        const bst = new BinarySearchTree<IValue>(compare);

        const node10 = bst.insert({ value: '10' });
        const node5 = bst.insert({ value: '5' });
        const node15 = bst.insert({ value: '15' });
        const node2 = bst.insert({ value: '2' });
        const node5_2 = bst.insert({ value: '5' });
        const node13 = bst.insert({ value: '13' });
        const node22 = bst.insert({ value: '22' });
        const node1 = bst.insert({ value: '1' });
        const node14 = bst.insert({ value: '14' });
        const node12 = bst.insert({ value: '12' });

        expect(bst.root).toBe(node10);
        expect(bst.size).toBe(10);

        const assert = (node: any, value: any, parent: any, left: any, right: any): void => {
            expect(node.value).toStrictEqual(value);
            expect(node.parent).toBe(parent);
            expect(node.left).toBe(left);
            expect(node.right).toBe(right);
        };

        assert(node10, { value: '10' }, null, node5, node15);
        assert(node5, { value: '5' }, node10, node2, node5_2);
        assert(node15, { value: '15' }, node10, node13, node22);
        assert(node2, { value: '2' }, node5, node1, null);
        assert(node5_2, { value: '5' }, node5, null, null);
        assert(node13, { value: '13' }, node15, node12, node14);
        assert(node22, { value: '22' }, node15, null, null);
        assert(node12, { value: '12' }, node13, null, null);
        assert(node14, { value: '14' }, node13, null, null);
    });

    test('findNode | find an existing value, default comparator => node', () => {
        const bst = new BinarySearchTree<number>();

        const node10 = bst.insert(10);
        const node5 = bst.insert(5);
        const node15 = bst.insert(15);
        const node2 = bst.insert(2);
        const node13 = bst.insert(13);
        const node22 = bst.insert(22);
        const node1 = bst.insert(1);
        const node14 = bst.insert(14);
        const node12 = bst.insert(12);

        expect(bst.findNode(10)).toBe(node10);
        expect(bst.findNode(5)).toBe(node5);
        expect(bst.findNode(15)).toBe(node15);
        expect(bst.findNode(2)).toBe(node2);
        expect(bst.findNode(13)).toBe(node13);
        expect(bst.findNode(22)).toBe(node22);
        expect(bst.findNode(1)).toBe(node1);
        expect(bst.findNode(14)).toBe(node14);
        expect(bst.findNode(12)).toBe(node12);
    });

    test('findNode | find an existing value, custom comparator => node', () => {
        interface IValue { value: string; modified?: boolean }

        const compare = (a: IValue, b: IValue): number => Number(a.value) - Number(b.value);
        const bst = new BinarySearchTree<IValue>(compare);

        const node10 = bst.insert({ value: '10' });
        const node5 = bst.insert({ value: '5' });
        const node15 = bst.insert({ value: '15' });
        const node2 = bst.insert({ value: '2' });
        const node13 = bst.insert({ value: '13' });
        const node22 = bst.insert({ value: '22' });
        const node1 = bst.insert({ value: '1' });
        const node14 = bst.insert({ value: '14' });
        const node12 = bst.insert({ value: '12' });

        expect(bst.findNode({ value: '10', modified: true }, (value) => value.value === '10')).toBe(node10);
        expect(bst.findNode({ value: '5' }, (value) => value.value === '5')).toBe(node5);
        expect(bst.findNode({ value: '15', modified: true }, (value) => value.value === '15')).toBe(node15);
        expect(bst.findNode({ value: '2' }, (value) => value.value === '2')).toBe(node2);
        expect(bst.findNode({ value: '13', modified: true }, (value) => value.value === '13')).toBe(node13);
        expect(bst.findNode({ value: '22' }, (value) => value.value === '22')).toBe(node22);
        expect(bst.findNode({ value: '1', modified: true }, (value) => value.value === '1')).toBe(node1);
        expect(bst.findNode({ value: '14' }, (value) => value.value === '14')).toBe(node14);
        expect(bst.findNode({ value: '12', modified: true }, (value) => value.value === '12')).toBe(node12);

        const obj = { value: '100' };
        const duplicateObj = { ...obj, modified: true };
        const nodeObj = bst.insert(obj);

        expect(bst.findNode(duplicateObj)).toBe(undefined);
        expect(bst.findNode(duplicateObj, (value) => value.value === '100')).toBe(nodeObj);
    });

    test('findNode | find a non-existing value, default comparator => undefined', () => {
        const bst = new BinarySearchTree<number>();

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);

        expect(bst.findNode(1)).toBe(undefined);
        expect(bst.findNode(100)).toBe(undefined);
        expect(bst.findNode(200)).toBe(undefined);
    });

    test('findNode | find a non-existing value, custom comparator => undefined', () => {
        interface IValue { value: string; modified?: boolean }

        const compare = (a: IValue, b: IValue): number => Number(a.value) - Number(b.value);
        const bst = new BinarySearchTree<IValue>(compare);

        bst.insert({ value: '10' });
        bst.insert({ value: '5' });
        bst.insert({ value: '15' });

        expect(bst.findNode({ value: '1' })).toBe(undefined);
        expect(bst.findNode({ value: '100' }, (value) => value.value === '100')).toBe(undefined);
        expect(bst.findNode({ value: '200' })).toBe(undefined);
    });

    test('find | find an existing value, default comparator => value', () => {
        const bst = new BinarySearchTree<number>();

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(2);
        bst.insert(13);
        bst.insert(22);
        bst.insert(1);
        bst.insert(14);
        bst.insert(12);

        expect(bst.find(10)).toStrictEqual(10);
        expect(bst.find(5)).toStrictEqual(5);
        expect(bst.find(15)).toStrictEqual(15);
        expect(bst.find(2)).toStrictEqual(2);
        expect(bst.find(13)).toStrictEqual(13);
        expect(bst.find(22)).toStrictEqual(22);
        expect(bst.find(1)).toStrictEqual(1);
        expect(bst.find(14)).toStrictEqual(14);
        expect(bst.find(12)).toStrictEqual(12);
    });

    test('find | find an existing value, custom comparator => value', () => {
        interface IValue { value: string; modified?: boolean }

        const compare = (a: IValue, b: IValue): number => Number(a.value) - Number(b.value);
        const bst = new BinarySearchTree<IValue>(compare);

        bst.insert({ value: '10' });
        bst.insert({ value: '5' });
        bst.insert({ value: '15' });
        bst.insert({ value: '2' });
        bst.insert({ value: '13' });
        bst.insert({ value: '22' });
        bst.insert({ value: '1' });
        bst.insert({ value: '14' });
        bst.insert({ value: '12' });

        expect(bst.find({ value: '10', modified: true }, (value) => value.value === '10')).toStrictEqual({ value: '10' });
        expect(bst.find({ value: '5' }, (value) => value.value === '5')).toStrictEqual({ value: '5' });
        expect(bst.find({ value: '15', modified: true }, (value) => value.value === '15')).toStrictEqual({ value: '15' });
        expect(bst.find({ value: '2' }, (value) => value.value === '2')).toStrictEqual({ value: '2' });
        expect(bst.find({ value: '13', modified: true }, (value) => value.value === '13')).toStrictEqual({ value: '13' });
        expect(bst.find({ value: '22' }, (value) => value.value === '22')).toStrictEqual({ value: '22' });
        expect(bst.find({ value: '1', modified: true }, (value) => value.value === '1')).toStrictEqual({ value: '1' });
        expect(bst.find({ value: '14' }, (value) => value.value === '14')).toStrictEqual({ value: '14' });
        expect(bst.find({ value: '12', modified: true }, (value) => value.value === '12')).toStrictEqual({ value: '12' });

        const obj = { value: '100' };
        const duplicateObj = { ...obj, modified: true };
        bst.insert(obj);

        expect(bst.find(duplicateObj)).toStrictEqual(undefined);
        expect(bst.find(duplicateObj, (value) => value.value === '100')).toStrictEqual(obj);
    });

    test('find | find a non-existing value, default comparator => undefined', () => {
        const bst = new BinarySearchTree<number>();

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);

        expect(bst.find(1)).toStrictEqual(undefined);
        expect(bst.find(100)).toStrictEqual(undefined);
        expect(bst.find(200)).toStrictEqual(undefined);
    });

    test('find | find a non-existing value, custom comparator => undefined', () => {
        interface IValue { value: string; modified?: boolean }

        const compare = (a: IValue, b: IValue): number => Number(a.value) - Number(b.value);
        const bst = new BinarySearchTree<IValue>(compare);

        bst.insert({ value: '10' });
        bst.insert({ value: '5' });
        bst.insert({ value: '15' });

        expect(bst.find({ value: '1' })).toStrictEqual(undefined);
        expect(bst.find({ value: '100' }, (value) => value.value === '100')).toStrictEqual(undefined);
        expect(bst.find({ value: '200' })).toStrictEqual(undefined);
    });

    test('findMinNode | find min node in a non-empty bst, default comparator => node', () => {
        const bst = new BinarySearchTree<number>();

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(2);
        bst.insert(13);
        bst.insert(22);
        const node1 = bst.insert(1);
        bst.insert(14);
        bst.insert(12);

        expect(bst.findMinNode()).toBe(node1);
    });

    test('findMin | find min value in a non-empty bst, default comparator => value', () => {
        const bst = new BinarySearchTree<number>();

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(2);
        bst.insert(13);
        bst.insert(22);
        bst.insert(1);
        bst.insert(14);
        bst.insert(12);

        expect(bst.findMin()).toBe(1);
    });

    test('findMinNode | find min node in a non-empty bst, custom comparator => node', () => {
        interface IValue { value: string }

        const compare = (a: IValue, b: IValue): number => Number(a.value) - Number(b.value);
        const bst = new BinarySearchTree<IValue>(compare);

        bst.insert({ value: '10' });
        bst.insert({ value: '5' });
        bst.insert({ value: '15' });
        bst.insert({ value: '2' });
        bst.insert({ value: '13' });
        bst.insert({ value: '22' });
        const node1 = bst.insert({ value: '1' });
        bst.insert({ value: '14' });
        bst.insert({ value: '12' });

        expect(bst.findMinNode()).toBe(node1);
    });

    test('findMin | find min value in a non-empty bst, custom comparator => value', () => {
        interface IValue { value: string }

        const compare = (a: IValue, b: IValue): number => Number(a.value) - Number(b.value);
        const bst = new BinarySearchTree<IValue>(compare);

        bst.insert({ value: '10' });
        bst.insert({ value: '5' });
        bst.insert({ value: '15' });
        bst.insert({ value: '2' });
        bst.insert({ value: '13' });
        bst.insert({ value: '22' });
        bst.insert({ value: '1' });
        bst.insert({ value: '14' });
        bst.insert({ value: '12' });

        expect(bst.findMin()).toStrictEqual({ value: '1' });
    });

    test('findMinNode | find min node in an empty bst => undefined', () => {
        const bst = new BinarySearchTree<number>();
        expect(bst.findMinNode()).toBe(undefined);
    });

    test('findMin | find min value in an empty bst => undefined', () => {
        const bst = new BinarySearchTree<number>();
        expect(bst.findMin()).toBe(undefined);
    });

    test('findMaxNode | find max node in a non-empty bst, default comparator => node', () => {
        const bst = new BinarySearchTree<number>();

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(2);
        bst.insert(13);
        bst.insert(22);
        bst.insert(1);
        const node100 = bst.insert(100);
        bst.insert(14);
        bst.insert(12);

        expect(bst.findMaxNode()).toBe(node100);
    });

    test('findMax | find max value in a non-empty bst, default comparator => value', () => {
        const bst = new BinarySearchTree<number>();

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(2);
        bst.insert(13);
        bst.insert(22);
        bst.insert(1);
        bst.insert(100);
        bst.insert(14);
        bst.insert(12);

        expect(bst.findMax()).toBe(100);
    });

    test('findMaxNode | find max node in a non-empty bst, custom comparator => node', () => {
        interface IValue { value: string }

        const compare = (a: IValue, b: IValue): number => Number(a.value) - Number(b.value);
        const bst = new BinarySearchTree<IValue>(compare);

        bst.insert({ value: '10' });
        bst.insert({ value: '5' });
        bst.insert({ value: '15' });
        const node100 = bst.insert({ value: '100' });
        bst.insert({ value: '2' });
        bst.insert({ value: '13' });
        bst.insert({ value: '22' });
        bst.insert({ value: '1' });
        bst.insert({ value: '14' });
        bst.insert({ value: '12' });

        expect(bst.findMaxNode()).toBe(node100);
    });

    test('findMax | find max value in a non-empty bst, custom comparator => value', () => {
        interface IValue { value: string }

        const compare = (a: IValue, b: IValue): number => Number(a.value) - Number(b.value);
        const bst = new BinarySearchTree<IValue>(compare);

        bst.insert({ value: '10' });
        bst.insert({ value: '5' });
        bst.insert({ value: '15' });
        bst.insert({ value: '2' });
        bst.insert({ value: '13' });
        bst.insert({ value: '100' });
        bst.insert({ value: '22' });
        bst.insert({ value: '1' });
        bst.insert({ value: '14' });
        bst.insert({ value: '12' });

        expect(bst.findMax()).toStrictEqual({ value: '100' });
    });

    test('findMaxNode | find max node in an empty bst => undefined', () => {
        const bst = new BinarySearchTree<number>();
        expect(bst.findMaxNode()).toBe(undefined);
    });

    test('findMax | find max value in an empty bst => undefined', () => {
        const bst = new BinarySearchTree<number>();
        expect(bst.findMax()).toBe(undefined);
    });

    test('traverseInOrder | traverse and push values to the array => values are "in order"', () => {
        const bst = new BinarySearchTree<number>();

        bst.insert(7);
        bst.insert(4);
        bst.insert(8);
        bst.insert(3);
        bst.insert(6);
        bst.insert(7);
        bst.insert(9);
        bst.insert(1);
        bst.insert(100);

        const array: number[] = [];
        bst.traverseInOrder(value => array.push(value));

        expect(array).toStrictEqual([1, 3, 4, 6, 7, 7, 8, 9, 100]);
    });

    test('traversePreOrder | traverse and push values to the array => values are "pre order"', () => {
        const bst = new BinarySearchTree<number>();

        bst.insert(7);
        bst.insert(4);
        bst.insert(8);
        bst.insert(3);
        bst.insert(6);
        bst.insert(7);
        bst.insert(9);
        bst.insert(1);
        bst.insert(100);

        const array: number[] = [];
        bst.traversePreOrder(value => array.push(value));

        expect(array).toStrictEqual([7, 4, 3, 1, 6, 8, 7, 9, 100]);
    });

    test('traversePostOrder | traverse and push values to the array => values are "post order"', () => {
        const bst = new BinarySearchTree<number>();

        bst.insert(7);
        bst.insert(4);
        bst.insert(8);
        bst.insert(3);
        bst.insert(6);
        bst.insert(7);
        bst.insert(9);
        bst.insert(1);
        bst.insert(100);

        const array: number[] = [];
        bst.traversePostOrder(value => array.push(value));

        expect(array).toStrictEqual([1, 3, 6, 4, 7, 100, 9, 8, 7]);
    });

    test('remove | remove a leaf node => node is removed, size is updated', () => {
        const bst = new BinarySearchTree<number>();

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        const node2 = bst.insert(2);
        bst.insert(5);
        bst.insert(13);
        bst.insert(22);
        const node1 = bst.insert(1);
        bst.insert(14);
        bst.insert(12);

        expect(bst.size).toBe(10);
        expect(bst.contains(node1)).toBe(true);
        expect(node2.left).toBe(node1);

        bst.remove(node1);

        expect(bst.size).toBe(9);
        expect(bst.contains(node1)).toBe(false);
        expect(node2.left).toBe(null);
    });

    test('remove | remove a node with one child => node is removed, size is updated', () => {
        const bst = new BinarySearchTree<number>();

        bst.insert(10);
        bst.insert(5);
        const node15 = bst.insert(15);
        bst.insert(2);
        bst.insert(5);
        bst.insert(13);
        const node22 = bst.insert(22);
        bst.insert(1);
        bst.insert(14);
        bst.insert(12);
        const node23 = bst.insert(23);

        expect(bst.size).toBe(11);
        expect(bst.contains(node22)).toBe(true);
        expect(node15.right).toBe(node22);
        expect(node22.parent).toBe(node15);

        bst.remove(node22);

        expect(bst.size).toBe(10);
        expect(bst.contains(node22)).toBe(false);
        expect(node15.right).toBe(node23);
        expect(node23.parent).toBe(node15);
    });

    test('remove | remove the root node, node has only left child => node is updated, successor is removed, root is reset, size is updated', () => {
        const bst = new BinarySearchTree<number>();

        const node10 = bst.insert(10);
        const node5 = bst.insert(5);
        bst.insert(2);
        bst.insert(5);
        bst.insert(1);

        expect(bst.size).toBe(5);
        expect(bst.root).toBeTruthy();
        expect(bst.root!.value).toBe(10);
        expect(bst.contains(node5)).toBe(true);

        bst.remove(node10);

        expect(bst.size).toBe(4);
        expect(bst.root).toBeTruthy();
        expect(bst.root!.value).toBe(5);
        expect(bst.contains(node5)).toBe(false);
    });

    test('remove | remove the root node, node has only right child => node is updated, successor is removed, root is reset, size is updated', () => {
        const bst = new BinarySearchTree<number>();

        const node10 = bst.insert(10);
        const node15 = bst.insert(15);
        bst.insert(13);
        bst.insert(22);
        bst.insert(14);
        bst.insert(12);

        expect(bst.size).toBe(6);
        expect(bst.root).toBeTruthy();
        expect(bst.root!.value).toBe(10);
        expect(bst.contains(node15)).toBe(true);

        bst.remove(node10);

        expect(bst.size).toBe(5);
        expect(bst.root).toBeTruthy();
        expect(bst.root!.value).toBe(15);
        expect(bst.contains(node15)).toBe(false);
    });

    test('remove | remove a node with two children => node is updated, successor is removed, size is updated', () => {
        const bst = new BinarySearchTree<number>();

        bst.insert(10);
        bst.insert(5);
        const node15 = bst.insert(15);
        bst.insert(2);
        bst.insert(5);
        bst.insert(12);
        const node22 = bst.insert(22);
        bst.insert(1);
        const node19 = bst.insert(19);
        bst.insert(13);
        bst.insert(23);
        const node20 = bst.insert(20);

        expect(bst.size).toBe(12);
        expect(node15.value).toBe(15);
        expect(node22.left).toBe(node19);
        expect(node19.right).toBe(node20);
        expect(node20.parent).toBe(node19);
        expect(bst.contains(node19)).toBe(true);
        
        bst.remove(node15);

        expect(bst.size).toBe(11);
        expect(node15.value).toBe(19);
        expect(node22.left).toBe(node20);
        expect(node20.parent).toBe(node22);
        expect(bst.contains(node19)).toBe(false);
    });

    test('remove | remove the node with two children => node is updated, root is reset, successor is removed, size is updated', () => {
        const bst = new BinarySearchTree<number>();

        const node10 = bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(2);
        bst.insert(5);
        const node13 = bst.insert(13);
        bst.insert(22);
        bst.insert(1);
        bst.insert(14);
        const node12 = bst.insert(12);

        expect(bst.size).toBe(10);
        expect(bst.root).toBeTruthy();
        expect(bst.root!.value).toBe(10);
        expect(node13.left).toBe(node12);
        expect(bst.contains(node12)).toBe(true);
        
        bst.remove(node10);

        expect(bst.size).toBe(9);
        expect(bst.root).toBeTruthy();
        expect(bst.root!.value).toBe(12);
        expect(node13.left).toBe(null);
        expect(bst.contains(node12)).toBe(false);
    });

    test('remove | remove a non-existing node => nothing is changed', () => {
        const bst = new BinarySearchTree<number>();

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(2);
        bst.insert(5);
        bst.insert(13);
        bst.insert(22);
        bst.insert(1);
        bst.insert(14);
        const node12 = bst.insert(12);

        expect(bst.size).toBe(10);
        expect(bst.contains(node12)).toBe(true);

        bst.remove(node12);

        expect(bst.size).toBe(9);
        expect(bst.contains(node12)).toBe(false);

        bst.remove(node12);

        expect(bst.size).toBe(9);
        expect(bst.contains(node12)).toBe(false);
    });

    test('removeWithValue | remove multiple nodes with a given value => connections between nodes are updated, size is updated', () => {
        const bst = new BinarySearchTree();

        const node10 = bst.insert(10);
        const node5_1 = bst.insert(5);
        bst.insert(15);
        bst.insert(2);
        const node7 = bst.insert(7);
        const node5_2 = bst.insert(5);
        bst.insert(1);
        bst.insert(8);
        const node6 = bst.insert(6);
        const node5_3 = bst.insert(5);

        expect(bst.size).toBe(10);
        expect(node6.left).toBe(node5_3);
        expect(node7.left).toBe(node5_2);
        expect(node10.left).toBe(node5_1);
        expect(node5_1.parent).toBe(node10);
        expect(node5_1.value).toBe(5);
        expect(bst.contains(node6)).toBe(true);
        expect(bst.contains(node5_3)).toBe(true);
        expect(bst.contains(node5_2)).toBe(true);

        bst.removeWithValue(5);

        expect(bst.size).toBe(7);
        expect(node6.left).toBe(null);
        expect(node7.left).toBe(null);
        expect(node10.left).toBe(node5_1);
        expect(node5_1.parent).toBe(node10);
        expect(node5_1.value).toBe(6);
        expect(bst.contains(node6)).toBe(false);
        expect(bst.contains(node5_3)).toBe(false);
        expect(bst.contains(node5_2)).toBe(false);
    });

    test('removeWithValue | remove a non-existing value => nothing is changed', () => {
        const bst = new BinarySearchTree();

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(2);
        bst.insert(7);
        bst.insert(5);
        bst.insert(1);
        bst.insert(8);
        bst.insert(6);
        bst.insert(5);

        expect(bst.size).toBe(10);
        bst.removeWithValue(100);
        expect(bst.size).toBe(10);
    });
});
