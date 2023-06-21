const { twoSum, reverseString, lengthOfLongestSubstring, maxArea } = require('./algorithmFunctions');

describe('Two Sum', () => {
  it('returns indices of two numbers that add up to the target', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
    expect(twoSum([-1, -2, -3, -4, -5], -8)).toEqual([2, 4]);
  });
});

describe('Reverse String', () => {
  it('returns the reverse of the given string', () => {
    expect(reverseString('hello')).toBe('olleh');
    expect(reverseString('OpenAI')).toBe('IAnepO');
    expect(reverseString('racecar')).toBe('racecar');
  });
});

describe('Longest Substring Without Repeating Characters', () => {
  it('returns the length of the longest substring without repeating characters', () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
  });
});

describe('Container With Most Water', () => {
  it('returns the maximum area formed by two vertical lines', () => {
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
    expect(maxArea([4, 3, 2, 1, 4])).toBe(16);
    expect(maxArea([1, 2, 1])).toBe(2);
  });
});
