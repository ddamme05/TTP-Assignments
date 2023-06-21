const { add, subtract, multiply, divide } = require('./mathFunctions');

describe('Math functions', () => {
  describe('add', () => {
    it('should add two numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(-5, 8)).toBe(3);
      expect(add(0, 0)).toBe(0);
    });

    it('should throw an error for invalid input', () => {
      expect(() => add('2', 3)).toThrow('Invalid input!');
      expect(() => add(2, '3')).toThrow('Invalid input!');
      expect(() => add('2', '3')).toThrow('Invalid input!');
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers correctly', () => {
      expect(subtract(5, 2)).toBe(3);
      expect(subtract(8, -5)).toBe(13);
      expect(subtract(0, 0)).toBe(0);
    });

    it('should throw an error for invalid input', () => {
      expect(() => subtract('5', 2)).toThrow('Invalid input!');
      expect(() => subtract(5, '2')).toThrow('Invalid input!');
      expect(() => subtract('5', '2')).toThrow('Invalid input!');
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers correctly', () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(-5, 8)).toBe(-40);
      expect(multiply(0, 10)).toBe(0);
    });

    it('should throw an error for invalid input', () => {
      expect(() => multiply('2', 3)).toThrow('Invalid input!');
      expect(() => multiply(2, '3')).toThrow('Invalid input!');
      expect(() => multiply('2', '3')).toThrow('Invalid input!');
    });
  });

  describe('divide', () => {
    it('should divide two numbers correctly', () => {
      expect(divide(6, 2)).toBe(3);
      expect(divide(-40, 8)).toBe(-5);
      expect(divide(0, 10)).toBe(0);
    });

    it('should throw an error for invalid input', () => {
      expect(() => divide('6', 2)).toThrow('Invalid input!');
      expect(() => divide(6, '2')).toThrow('Invalid input!');
      expect(() => divide('6', '2')).toThrow('Invalid input!');
    });

    it('should throw an error for division by 0', () => {
      expect(() => divide(5, 0)).toThrow('Division by 0 is not allowed.');
      expect(() => divide(-10, 0)).toThrow('Division by 0 is not allowed.');
    });
  });
});
