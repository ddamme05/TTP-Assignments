function myEach(array, callback){
    for(let i = 0; i < array.length; i++){
        callback(array[i], i, array);
    }
}

function myMap(array, callback){
    let mappedArray = [];
    for(let i = 0; i < array.length; i++){
        let appliedElements = callback(array[i], i, array);
        mappedArray.push(appliedElements);
    }
    return mappedArray;
}

function myFilter(array, callback){
    let filteredArray = [];
    for(let i = 0; i < array.length; i++){
        filter = callback(array[i], i, array);
        if(filter){ filteredArray.push(filter); }
    }
    return filteredArray;
}

function mySome(array, callback){
    for(let i = 0; i < array.length; i++){
        let filter = callback(array[i], i, array);
        if(filter) { return true; }
    }
    return false;
}

function myEvery(array, callback){
    for(let i = 0; i < array.length; i++){
        if(callback(array[i], i, array)){ return true; }
    }
    return false;
}

function myReduce(array, callback) {
    if(array.length == 0) { throw new Error ("Empty array."); }
    let accumulator = array[0];

    for(let i = 1; i < array.length; i++){
        accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
}

function myIncludes(arr, searchFor){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == searchFor){ return true; }
    }
    return false;
}

function myIndexOf(array, searchFor){
    for(let i = 0; i < array.length; i++){
        if(array[i] == searchFor){ return array[i]; }
    }
    return -1;
}

function myPush(array, elementToAdd){
    array[array.length] = elementToAdd;
    return array.length;
}

function myUnshift(array, searchFor){
    for(let i = array.length - 1; i >= 0; i--){
        if(array[i] == searchFor){ return i; }
    }
    return -1;
}

Object.grabKeys = function (object){
    let arr = [];
    for(let key in object){
        if(object.hasOwnProperty(key)){
            arr.myPush(key);
        }
    }
    return arr;
}

Object.grabValues = function (object) {
    let arr = [];
    for(let key in object){
        if(object.hasOwnProperty(key)){
            arr.push(object[key]);
        }
    }
    return arr;
}
