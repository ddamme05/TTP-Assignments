function reverseString(str) {
    return str.split('').reverse().join('');
}  

function isPalindrome(str){
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

module.exports = { reverseString, isPalindrome };