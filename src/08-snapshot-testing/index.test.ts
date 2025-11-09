import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = ['a', 'b', 'c'];
    const list = {
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: 'c',
          next: { value: null, next: null },
        },
      },
    };

    const result = generateLinkedList(elements);
    expect(result).toStrictEqual(list);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = ['a', 'b', 'c'];
    const result = generateLinkedList(elements);

    expect(result).toMatchSnapshot();
  });
});
