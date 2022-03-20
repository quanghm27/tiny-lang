function print(...args) {
    console.log(...args);
}

function add(...args) {
    return args.reduce((total, current) => total += current, 0);
}

function multiply(x, y) {
    return x * y;
}

function subtract(x, y) {
    return x - y;
}

function divide(x, y) {
    return x / y;
}

function sqrt(x) {
    return Math.sqrt(x);
}

function pow(x, y) {
    return Math.pow(x, y);
}