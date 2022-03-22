# tiny-lang

small demo for using [NearleyJS](https://nearley.js.org/) to create a programming language

## Write a program
`.tiny` file:

```
form greet(name) {
  greet = "hello"
  return greet  + " " + name
}

print(greet("world")) // -> "hello world"
```

```
form myFormula() {
    b = 15 + 1 * (2 * (99 + 5))
    c = sqrt(4)
    return add(b, 7, 6, multiply(2,3,4,5))
}
print("result = ", myFormula()) // -> result =  356
```
```
print(add(5,6,7, multiply(4,5,6))) // -> 138
```
## run program
1. write a `.tiny` file, put it to `./example/program/` folder
2. run script:
`npm run run-program --file={your-file-name}.tiny`

## Built-in functions
Helper functions in tiny-lang.

Using JS to create these functions.
Refer [file](https://github.com/quanghm27/tiny-lang/blob/main/builtin/index.js)
