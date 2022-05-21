/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
import { DoublyLinkedList } from './DoublyLinkedList';

describe('DoublyLinkedList', () => {
    test('init | new instance => head is null, tail is null, length is 0', () => {
        const linkedList = new DoublyLinkedList<number>();
        expect(linkedList.head).toBe(null);
        expect(linkedList.tail).toBe(null);
        expect(linkedList.length).toBe(0);
    });

    test('insert | insert any value => inserted node is returned', () => {
        const linkedList = new DoublyLinkedList<string>();
        const expectedValue = 'any';

        const node = linkedList.insert('any');

        expect(node).toBeTruthy();
        expect(node.value).toBe(expectedValue);
    });

    test('insert | empty linked list => head is set, tail is set, length is 1', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedValue = 0;
        const expectedLength = 1;

        linkedList.insert(0);

        expect(linkedList.head).toBeTruthy();
        expect(linkedList.tail).toBeTruthy();
        expect(linkedList.head.value).toBe(expectedValue);
        expect(linkedList.tail.value).toBe(expectedValue);
        expect(linkedList.length).toBe(expectedLength);
    });

    test('insert | single node linked list, insert at the end => tail is updated, length is updated', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedHeadValue = 0;
        const expectedTailValue = 1;
        const expectedLength = 2;

        linkedList.insert(0);
        linkedList.insert(1);

        expect(linkedList.head).toBeTruthy();
        expect(linkedList.tail).toBeTruthy();
        expect(linkedList.head.value).toBe(expectedHeadValue);
        expect(linkedList.tail.value).toBe(expectedTailValue);
        expect(linkedList.length).toBe(expectedLength);
    });

    test('insert | insert at the start => head is updated, tail is not updated, length is updated', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedHeadValue = 0;
        const expectedTailValue = 4;
        const expectedLength = 5;

        linkedList.insert(1);
        linkedList.insert(2);
        linkedList.insert(3);
        linkedList.insert(4);

        const node = linkedList.insert(0, 0);
        const nodeAtIndex = linkedList.getNode(0);

        expect(node).toBe(nodeAtIndex);
        expect(node).toBe(linkedList.head);
        expect(linkedList.head.value).toBe(expectedHeadValue);
        expect(linkedList.tail.value).toBe(expectedTailValue);
        expect(linkedList.length).toBe(expectedLength);
    });

    test('insert | insert at the middle => head is not updated, tail is not updated, length is updated', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedHeadValue = 0;
        const expectedTailValue = 4;
        const expectedLength = 5;

        linkedList.insert(0);
        linkedList.insert(1);
        linkedList.insert(3);
        linkedList.insert(4);

        const node = linkedList.insert(2, 2);
        const nodeAtIndex = linkedList.getNode(2);

        expect(node).toBe(nodeAtIndex);
        expect(linkedList.head.value).toBe(expectedHeadValue);
        expect(linkedList.tail.value).toBe(expectedTailValue);
        expect(linkedList.length).toBe(expectedLength);
    });

    test('insert | insert at the middle => head is not updated, tail is not updated, length is updated', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedHeadValue = 0;
        const expectedTailValue = 4;
        const expectedLength = 5;

        linkedList.insert(0);
        linkedList.insert(1);
        linkedList.insert(3);
        linkedList.insert(4);

        const node = linkedList.insert(2, 2);
        const nodeAtIndex = linkedList.getNode(2);

        expect(node).toBe(nodeAtIndex);
        expect(linkedList.head.value).toBe(expectedHeadValue);
        expect(linkedList.tail.value).toBe(expectedTailValue);
        expect(linkedList.length).toBe(expectedLength);
    });

    test('insert | insert at the end => head is not updated, tail is updated, length is updated', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedHeadValue = 0;
        const expectedTailValue = 4;
        const expectedLength = 5;

        linkedList.insert(0);
        linkedList.insert(1);
        linkedList.insert(2);
        linkedList.insert(3);

        const node = linkedList.insert(4, 4);
        const nodeAtIndex = linkedList.getNode(4);

        expect(node).toBe(nodeAtIndex);
        expect(node).toBe(linkedList.tail);
        expect(linkedList.head.value).toBe(expectedHeadValue);
        expect(linkedList.tail.value).toBe(expectedTailValue);
        expect(linkedList.length).toBe(expectedLength);
    });

    test('insert | insert at a negative index => throw error', () => {
        const linkedList = new DoublyLinkedList<number>();

        linkedList.insert(0);
        linkedList.insert(1);
        linkedList.insert(2);

        let error: Error;
        try {
            linkedList.insert(-1, -1);
        } catch (e) {
            error = e;
        }

        expect(error).toBeTruthy();
    });

    test('insert | insert at an index greater than length => throw error', () => {
        const linkedList = new DoublyLinkedList<number>();

        linkedList.insert(0);
        linkedList.insert(1);
        linkedList.insert(2);

        let error: Error;
        try {
            linkedList.insert(10, 10);
        } catch (e) {
            error = e;
        }

        expect(error).toBeTruthy();
    });

    test('insertAfter | insert after the first node => value is inserted, head is not updated, tail is not updated, length is updated', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedIndex = 1;
        const expectedLength = 4;

        const firstNode = linkedList.insert(0);
        linkedList.insert(2);
        const lastNode = linkedList.insert(3);

        const node = linkedList.insertAfter(1, firstNode);
        const nodeAtIndex = linkedList.getNode(expectedIndex);

        expect(nodeAtIndex).toBe(node);
        expect(linkedList.head).toBe(firstNode);
        expect(linkedList.tail).toBe(lastNode);
        expect(linkedList.length).toBe(expectedLength);
    });

    test('insertAfter | insert after the last node => value is inserted, head is not updated, tail is updated, length is updated', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedIndex = 3;
        const expectedLength = 4;

        const firstNode = linkedList.insert(0);
        linkedList.insert(1);
        const lastNode = linkedList.insert(2);

        const node = linkedList.insertAfter(3, lastNode);
        const nodeAtIndex = linkedList.getNode(expectedIndex);

        expect(nodeAtIndex).toBe(node);
        expect(linkedList.head).toBe(firstNode);
        expect(linkedList.tail).toBe(node);
        expect(linkedList.length).toBe(expectedLength);
    });

    test('insertBefore | insert before the first node => value is inserted, head is updated, tail is not updated, length is updated', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedIndex = 0;
        const expectedLength = 4;

        const firstNode = linkedList.insert(1);
        linkedList.insert(2);
        const lastNode = linkedList.insert(3);

        const node = linkedList.insertBefore(0, firstNode);
        const nodeAtIndex = linkedList.getNode(expectedIndex);

        expect(nodeAtIndex).toBe(node);
        expect(linkedList.head).toBe(node);
        expect(linkedList.tail).toBe(lastNode);
        expect(linkedList.length).toBe(expectedLength);
    });

    test('insertBefore | insert before the last node => value is inserted, head is not updated, tail is not updated, length is updated', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedIndex = 2;
        const expectedLength = 4;

        const firstNode = linkedList.insert(0);
        linkedList.insert(1);
        const lastNode = linkedList.insert(3);

        const node = linkedList.insertBefore(3, lastNode);
        const nodeAtIndex = linkedList.getNode(expectedIndex);

        expect(nodeAtIndex).toBe(node);
        expect(linkedList.head).toBe(firstNode);
        expect(linkedList.tail).toBe(lastNode);
        expect(linkedList.length).toBe(expectedLength);
    });

    test('forEach | iterate through each node and sum their values => correct sum', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedSum = 42;

        linkedList.insert(1);
        linkedList.insert(2);
        linkedList.insert(3);
        linkedList.insert(42);
        linkedList.insert(-6);

        let sum = 0;
        linkedList.forEach(n => sum += n);

        expect(sum).toBe(expectedSum);
    });

    test('get | empty linked list, get at a random index => undefined', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedValue = undefined;

        const maxIndex = 100;
        const randomIndex = Math.floor(Math.random() * maxIndex);
        const value = linkedList.get(randomIndex);

        expect(value).toBe(expectedValue);
    });

    test('get | get at the first index => value at the head', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedValue = 0;

        linkedList.insert(0);
        linkedList.insert(1);
        linkedList.insert(2);
        linkedList.insert(3);
        linkedList.insert(4);

        const firstIndex = 0;
        const value = linkedList.get(firstIndex);

        expect(value).toBe(expectedValue);
    });

    test('get | get at the last index => value at the end', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedValue = 4;

        linkedList.insert(0);
        linkedList.insert(1);
        linkedList.insert(2);
        linkedList.insert(3);
        linkedList.insert(4);

        const lastIndex = linkedList.length - 1;
        const value = linkedList.get(lastIndex);

        expect(value).toBe(expectedValue);
    });

    test('get | get at the middle index => value at the middle', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedValue = 2;

        linkedList.insert(0);
        linkedList.insert(1);
        linkedList.insert(2);
        linkedList.insert(3);
        linkedList.insert(4);

        const middleIndex = Math.floor((linkedList.length - 1) / 2);
        const value = linkedList.get(middleIndex);

        expect(value).toBe(expectedValue);
    });

    test('get | get at a negative index => undefined', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedValue = undefined;

        linkedList.insert(0);
        linkedList.insert(1);
        linkedList.insert(2);

        const negativeIndex = -1;
        const value = linkedList.get(negativeIndex);

        expect(value).toBe(expectedValue);
    });

    test('get | get at an index greater than the length => undefined', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedValue = undefined;

        linkedList.insert(0);
        linkedList.insert(1);
        linkedList.insert(2);

        const bigIndex = 1000;
        const value = linkedList.get(bigIndex);

        expect(value).toBe(expectedValue);
    });

    test('getNode | empty linked list, get at a random index => undefined', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedNode = undefined;

        const maxIndex = 100;
        const randomIndex = Math.floor(Math.random() * maxIndex);
        const value = linkedList.get(randomIndex);

        expect(value).toBe(expectedNode);
    });

    test('getNode | get node at the first index => the head node', () => {
        const linkedList = new DoublyLinkedList<number>();

        const expectedNode = linkedList.insert(0);
        linkedList.insert(1);
        linkedList.insert(2);
        linkedList.insert(3);
        linkedList.insert(4);

        const firstIndex = 0;
        const node = linkedList.getNode(firstIndex);

        expect(node).toBe(expectedNode);
    });

    test('getNode | get node at the last index => the last node', () => {
        const linkedList = new DoublyLinkedList<number>();

        linkedList.insert(0);
        linkedList.insert(1);
        linkedList.insert(2);
        linkedList.insert(3);
        const expectedNode = linkedList.insert(4);

        const lastIndex = linkedList.length - 1;
        const node = linkedList.getNode(lastIndex);

        expect(node).toBe(expectedNode);
    });

    test('getNode | get node at the middle index => the middle node', () => {
        const linkedList = new DoublyLinkedList<number>();

        linkedList.insert(0);
        linkedList.insert(1);
        const expectedNode = linkedList.insert(2);
        linkedList.insert(3);
        linkedList.insert(4);

        const middleIndex = Math.floor((linkedList.length - 1) / 2);
        const node = linkedList.getNode(middleIndex);

        expect(node).toBe(expectedNode);
    });

    test('getNode | get node at a negative index => undefined', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedNode = undefined;

        linkedList.insert(0);
        linkedList.insert(1);
        linkedList.insert(2);

        const negativeIndex = -1;
        const node = linkedList.getNode(negativeIndex);

        expect(node).toBe(expectedNode);
    });

    test('getNode | get node at an index greater than the length => undefined', () => {
        const linkedList = new DoublyLinkedList<number>();
        const expectedNode = undefined;

        linkedList.insert(0);
        linkedList.insert(1);
        linkedList.insert(2);

        const bigIndex = 1000;
        const node = linkedList.getNode(bigIndex);

        expect(node).toBe(expectedNode);
    });

    test('find | find a non-existing value, predicate returns a boolean => undefined', () => {
        const linkedList = new DoublyLinkedList<{ nested: { value: string } }>();
        const expectedValue = undefined;

        linkedList.insert({ nested: { value: '0' } });
        linkedList.insert({ nested: { value: '1' } });
        linkedList.insert({ nested: { value: '2' } });

        const value = linkedList.find(v => v.nested.value === '3');

        expect(value).toBe(expectedValue);
    });

    test('find | find a non-existing value, predicate returns not a boolean => undefined', () => {
        const linkedList = new DoublyLinkedList<{ nested: { value: string; optional?: string } }>();
        const expectedValue = undefined;

        linkedList.insert({ nested: { value: '0' } });
        linkedList.insert({ nested: { value: '1' } });
        linkedList.insert({ nested: { value: '2', optional: null } });

        const value = linkedList.find(v => v.nested.optional);

        expect(value).toStrictEqual(expectedValue);
    });

    test('find | find an existing value, predicate returns a boolean => value', () => {
        const linkedList = new DoublyLinkedList<{ nested: { value: string } }>();
        const expectedValue = { nested: { value: '1' } };

        linkedList.insert({ nested: { value: '0' } });
        linkedList.insert({ nested: { value: '1' } });
        linkedList.insert({ nested: { value: '2' } });

        const value = linkedList.find(v => v.nested.value === '1');

        expect(value).toStrictEqual(expectedValue);
    });

    test('find | find an existing value, predicate returns not a boolean => value', () => {
        const linkedList = new DoublyLinkedList<{ nested: { value: string; optional?: string } }>();
        const expectedValue = { nested: { value: '2', optional: 'ok' } };

        linkedList.insert({ nested: { value: '0' } });
        linkedList.insert({ nested: { value: '1' } });
        linkedList.insert({ nested: { value: '2', optional: 'ok' } });

        const value = linkedList.find(v => v.nested.optional);

        expect(value).toStrictEqual(expectedValue);
    });

    test('findNode | find a non-existing node, predicate returns a boolean => undefined', () => {
        const linkedList = new DoublyLinkedList<{ nested: { value: string } }>();
        const expectedNode = undefined;

        linkedList.insert({ nested: { value: '0' } });
        linkedList.insert({ nested: { value: '1' } });
        linkedList.insert({ nested: { value: '2' } });

        const node = linkedList.findNode(v => v.nested.value === '3');

        expect(node).toBe(expectedNode);
    });

    test('findNode | find a non-existing node, predicate returns not a boolean => undefined', () => {
        const linkedList = new DoublyLinkedList<{ nested: { value: string; optional?: string } }>();
        const expectedNode = undefined;

        linkedList.insert({ nested: { value: '0' } });
        linkedList.insert({ nested: { value: '1' } });
        linkedList.insert({ nested: { value: '2' } });

        const node = linkedList.findNode(v => v.nested.optional);

        expect(node).toBe(expectedNode);
    });

    test('findNode | find an existing node, predicate returns a boolean => node', () => {
        const linkedList = new DoublyLinkedList<{ nested: { value: string } }>();

        linkedList.insert({ nested: { value: '0' } });
        const expectedNode = linkedList.insert({ nested: { value: '1' } });
        linkedList.insert({ nested: { value: '2' } });

        const node = linkedList.findNode(v => v.nested.value === '1');

        expect(node).toBe(expectedNode);
    });

    test('findNode | find an existing node, predicate returns not a boolean => node', () => {
        const linkedList = new DoublyLinkedList<{ nested: { value: string; optional?: string } }>();

        linkedList.insert({ nested: { value: '0' } });
        linkedList.insert({ nested: { value: '1' } });
        const expectedNode = linkedList.insert({ nested: { value: '2', optional: 'ok' } });

        const node = linkedList.findNode(v => v.nested.optional);

        expect(node).toBe(expectedNode);
    });

    test('removeWithValue | remove a non-existing value => no deletions are made', () => {
        const linkedList = new DoublyLinkedList<string>();
        const expectedInitialLength = 4;
        const expectedResultantLength = 4;
        const expectedResultantString = 'this is a string';

        linkedList.insert('this');
        linkedList.insert('is');
        linkedList.insert('a');
        linkedList.insert('string');

        expect(linkedList.length).toBe(expectedInitialLength);
        linkedList.removeWithValue(v => v === 'test');

        const resultantStringParts: string[] = [];
        linkedList.forEach(s => resultantStringParts.push(s));
        const resultantString = resultantStringParts.join(' ');

        expect(linkedList.length).toBe(expectedResultantLength);
        expect(resultantString).toBe(expectedResultantString);
    });

    test('removeWithValue | remove an existing value => pointers are updated, length is decreased', () => {
        const linkedList = new DoublyLinkedList<string>();
        const expectedInitialLength = 8;
        const expectedResultantLength = 5;
        const expectedResultantString = 'this is a string to test';

        linkedList.insert('test');
        linkedList.insert('this');
        linkedList.insert('is');
        linkedList.insert('a');
        linkedList.insert('test');
        linkedList.insert('string');
        linkedList.insert('test');
        linkedList.insert('to test');

        expect(linkedList.length).toBe(expectedInitialLength);
        linkedList.removeWithValue(v => v === 'test');

        const resultantStringParts: string[] = [];
        linkedList.forEach(s => resultantStringParts.push(s));
        const resultantString = resultantStringParts.join(' ');

        expect(linkedList.length).toBe(expectedResultantLength);
        expect(resultantString).toBe(expectedResultantString);
    });

    test('removeAtIndex | remove at the start => head is updated, length is updated', () => {
        const linkedList = new DoublyLinkedList<string>();
        const expectedLength = 4;

        linkedList.insert('0');
        const nodeAfter = linkedList.insert('1');
        const nodeNext = linkedList.insert('2');
        linkedList.insert('3');
        linkedList.insert('4');

        linkedList.removeAtIndex(0);

        expect(linkedList.head).toBe(nodeAfter);
        expect(linkedList.head.prev).toBe(null);
        expect(linkedList.head.next).toBe(nodeNext);
        expect(linkedList.length).toBe(expectedLength);
    });    

    test('removeAtIndex | remove at the middle => value is removed, length is updated', () => {
        const linkedList = new DoublyLinkedList<string>();
        const expectedLength = 4;

        linkedList.insert('0');
        const nodeBefore = linkedList.insert('1');
        linkedList.insert('2');
        const nodeAfter = linkedList.insert('3');
        const nodeNext = linkedList.insert('4');

        linkedList.removeAtIndex(2);
        const node = linkedList.getNode(2);

        expect(node).toBe(nodeAfter);
        expect(node.next).toBe(nodeNext);
        expect(node.prev).toBe(nodeBefore);
        expect(linkedList.length).toBe(expectedLength);
    });
    
    test('removeAtIndex | remove at the end => tail is updated, length is updated', () => {
        const linkedList = new DoublyLinkedList<string>();
        const expectedLength = 4;

        linkedList.insert('0');
        linkedList.insert('1');
        const nodePrev = linkedList.insert('2');
        const nodeBefore = linkedList.insert('3');
        linkedList.insert('4');

        linkedList.removeAtIndex(4);

        expect(linkedList.tail).toBe(nodeBefore);
        expect(linkedList.tail.prev).toBe(nodePrev);
        expect(linkedList.tail.next).toBe(null);
        expect(linkedList.length).toBe(expectedLength);
    });

    test('removeAtIndex | remove at a negative index => no deletions are made', () => {
        const linkedList = new DoublyLinkedList<string>();
        const expectedLength = 3;

        linkedList.insert('0');
        linkedList.insert('1');
        linkedList.insert('2');

        linkedList.removeAtIndex(-1);

        expect(linkedList.length).toBe(expectedLength);
    });

    test('removeAtIndex | remove at an index greater than the length => no deletions are made', () => {
        const linkedList = new DoublyLinkedList<string>();
        const expectedLength = 3;

        linkedList.insert('0');
        linkedList.insert('1');
        linkedList.insert('2');

        const bigIndex = 1000;
        linkedList.removeAtIndex(bigIndex);

        expect(linkedList.length).toBe(expectedLength);
    });

    //

    test('removeNode | remove at the start => head is updated, length is updated', () => {
        const linkedList = new DoublyLinkedList<string>();
        const expectedLength = 4;

        const nodeToRemove = linkedList.insert('0');
        const nodeAfter = linkedList.insert('1');
        const nodeNext = linkedList.insert('2');
        linkedList.insert('3');
        linkedList.insert('4');

        linkedList.removeNode(nodeToRemove);

        expect(linkedList.head).toBe(nodeAfter);
        expect(linkedList.head.prev).toBe(null);
        expect(linkedList.head.next).toBe(nodeNext);
        expect(linkedList.length).toBe(expectedLength);
    });    

    test('removeNode | remove at the middle => node is removed, length is updated', () => {
        const linkedList = new DoublyLinkedList<string>();
        const expectedLength = 4;

        linkedList.insert('0');
        const nodeBefore = linkedList.insert('1');
        const nodeToRemove = linkedList.insert('2');
        const nodeAfter = linkedList.insert('3');
        const nodeNext = linkedList.insert('4');

        linkedList.removeNode(nodeToRemove);
        const node = linkedList.getNode(2);

        expect(node).toBe(nodeAfter);
        expect(node.next).toBe(nodeNext);
        expect(node.prev).toBe(nodeBefore);
        expect(linkedList.length).toBe(expectedLength);
    });
    
    test('removeNode | remove at the end => tail is updated, length is updated', () => {
        const linkedList = new DoublyLinkedList<string>();
        const expectedLength = 4;

        linkedList.insert('0');
        linkedList.insert('1');
        const nodePrev = linkedList.insert('2');
        const nodeBefore = linkedList.insert('3');
        const nodeToRemove = linkedList.insert('4');

        linkedList.removeNode(nodeToRemove);

        expect(linkedList.tail).toBe(nodeBefore);
        expect(linkedList.tail.prev).toBe(nodePrev);
        expect(linkedList.tail.next).toBe(null);
        expect(linkedList.length).toBe(expectedLength);
    });

    test('removeNode | remove a non-existing node => no deletions are made', () => {
        const linkedList = new DoublyLinkedList<string>();
        const expectedLength = 3;

        linkedList.insert('0');
        linkedList.insert('1');
        linkedList.insert('2');

        const nonExistingNode = linkedList.getNode(3);
        linkedList.removeNode(nonExistingNode);

        expect(linkedList.length).toBe(expectedLength);
    });
});
