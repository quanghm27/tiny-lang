function a () {
    let b = 15 + 1 * (2 * (99 + 5));
    return add(b, 7);
}
print("result = ", a())

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