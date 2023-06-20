function add(a, b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b == 0) { throw new Error("Division by 0 is not allowed."); }
    return a / b;
}

module.exports = { add, subtract, multiply, divide};