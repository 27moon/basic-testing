import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 6, b: 2, action: '%', expected: null },
  { a: 1, b: '2', action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should return expected result', (testCase) => {
    expect(
      simpleCalculator({
        a: testCase.a,
        b: testCase.b,
        action: testCase.action,
      }),
    ).toBe(testCase.expected);
  });
});
