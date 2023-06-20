const { add, subtract, multiply, divide } = require('./mathFunctions');

describe('Math operations', () => {
  test('add', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });

  test('subtract', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(1, 1)).toBe(0);
    expect(subtract(0, 0)).toBe(0);
  });

  test('multiply', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-1, 1)).toBe(-1);
    expect(multiply(0, 0)).toBe(0);
  });

  test('divide', () => {
    expect(divide(6, 3)).toBe(2);
    expect(divide(-1, 1)).toBe(-1);
    expect(divide(0, 5)).toBe(0);
  });

  test('divide by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by 0 is not allowed.');
  });
});
