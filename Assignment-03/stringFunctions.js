function reverseString(str) {
    //Splits the string into an array, reverses that array and joins it back into a string. Reconstructs it.
    return str.split('').reverse().join('');
}  

function isPalindrome(str){
    /*Regex to get rid of non-alphanumeric characters and whitespace and replaces it with ''. 
    In brackets, ^ means to match any character that is not defined within the brackets, 
    a-z, A-Z for both capital and lowercase letters and 0-9 to match digits */
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

module.exports = { reverseString, isPalindrome };