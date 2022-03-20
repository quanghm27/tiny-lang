var form = function (x, y, z) {
    return add(x, y, z)
};
print("The distance is", form(1, 2, 3))
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