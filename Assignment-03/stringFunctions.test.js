const { reverseString, isPalindrome } = require('./stringFunctions');

describe('reverseString', () => {
  test('should reverse a string', () => {
    const input = 'hello';
    const expectedOutput = 'olleh';
    const result = reverseString(input);
    expect(result).toEqual(expectedOutput);
  });

  test('should reverse a string with special characters', () => {
    const input = 'Hello! How are you?';
    const expectedOutput = '?uoy era woH !olleH';
    const result = reverseString(input);
    expect(result).toEqual(expectedOutput);
  });

  test('should return an empty string if the input is empty', () => {
    const input = '';
    const expectedOutput = '';
    const result = reverseString(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe('isPalindrome', () => {
  test('should return true for a palindrome string', () => {
    const input = 'madam';
    const result = isPalindrome(input);
    expect(result).toBe(true);
  });

  test('should return false for a non-palindrome string', () => {
    const input = 'hello';
    const result = isPalindrome(input);
    expect(result).toBe(false);
  });

  test('should return true for a palindrome string with special characters', () => {
    const input = 'A man, a plan, a canal, Panama!';
    const result = isPalindrome(input);
    expect(result).toBe(true);
  });

  test('should return true for an empty string', () => {
    const input = '';
    const result = isPalindrome(input);
    expect(result).toBe(true);
  });
});
