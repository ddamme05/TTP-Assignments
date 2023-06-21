function twoSum(nums, target){
    //Initialize an empty hash map.
    let complementMap = {};
    for(let i = 0; i < nums.length; i++){
        //Subtract an element from the target and see if there is an element in the nums array that fits that.
        let complementPair = target - nums[i];
        //If there is a pair for this case, the if statement runs.
        if(complementMap[complementPair] !== undefined){
            //Returns the incides of both elements when a complement pair is found.
            return [complementMap[complementPair], i];
        } else{
            //Otherwise, record the index in the hash map.
            complementMap[nums[i]] = i;
        }
    }
    //If all fails, return an empty array.
    return [];
}


function reverseString(str) {
    //Splits the string into an array, reverses that array and joins it back into a string. Reconstructs it.
    return str.split('').reverse().join('');
}

function lengthOfLongestSubstring(str) {
    if (str.length === 0) {
        return 0;
    }
    let maxLength = 0;
    let left = 0;
    let right = 0;
    const charSet = new Set();

    while (right < str.length) {
        //Get character at right pointer
        const currentChar = str.charAt(right);
        //If the character is not currently in the set..
        if (!charSet.has(currentChar)) {
            //Add character to Set
            charSet.add(currentChar);
            //Update the maxLength if it needs updating
            maxLength = Math.max(maxLength, right - left + 1);
            //Increment right so we take next character into consideration for longest substring
            right++;
        } else {
            //If already in the set, remove the character at left pointer since it is repeating
            charSet.delete(str.charAt(left));
            /* We want to ensure that this repeating character isn't being 
            considered anymore, so we increment left */
            left++;
        }
    }

    return maxLength;
}
function maxArea(heights) {
    let maxArea = 0;
    let left = 0;
    let right = heights.length - 1;

    while (left < right) {
        //Calculate the width by using the x-axis
        const width = right - left;
        //Finds minimum height of two lines
        const minHeight = Math.min(heights[left], heights[right]);
        //Calculate area with minHeight because if we use maxHeight the water would spill.
        const area = width * minHeight;
        //Area is initially set to 0, sets area accordingly.
        maxArea = Math.max(maxArea, area);

        //If height on the left is lower than the right
        if (heights[left] < heights[right]) {
            //Move the left more towards the right to get rid of limitation by height of a smaller line.
            left++; 
        } else {
            //Otherwise, move the right closer to the left.
            right--;
        }
    }

    return maxArea;
}
    


module.exports = { twoSum, reverseString, lengthOfLongestSubstring, maxArea };