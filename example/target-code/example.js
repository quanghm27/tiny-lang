function myFormula () {
    let b = 15 + 1 * (2 * (99 + 5));
    let c = sqrt(4);
    return add(b, 7, 6, multiply(2, 3, 4, 5));
}
print("result = ", myFormula())

/*
* Generated built-in functions
*/

function print(...args) {
    console.log(...args);
}

function add(...args) {
    return args.reduce((total, current) => total += current, 0);
}

function multiply(...args) {
    return args.reduce((total, current) => total *= current, 1);
}

function subtract(...args) {
    return args.reduce((total, current) => total -= current, 0);
}

function divide(...args) {
    return args.reduce((total, current) => total /= current, 1);
}

function sqrt(x) {
    return Math.sqrt(x);
}

function pow(x, y) {
    return Math.pow(x, y);
}