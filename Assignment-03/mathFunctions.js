function add(a, b){
    //Throws an error if either a or b is not a number
    if(typeof a !== 'number' || typeof b !== 'number'){
        throw new Error('Invalid input!');
    }
    return a + b;
}

function subtract(a,b){
    if(typeof a !== 'number' || typeof b !== 'number'){
        throw new Error('Invalid input!');
    }
    return a - b;
}

function multiply(a, b){
    if(typeof a !== 'number' || typeof b !== 'number'){
        throw new Error('Invalid input!');
    }
    return a * b;
}

function divide(a, b){
    if(typeof a !== 'number' || typeof b !== 'number'){
        throw new Error('Invalid input!');
    }
    if(b == 0) { throw new Error("Division by 0 is not allowed."); }
    return a / b;
}

module.exports = { add, subtract, multiply, divide};