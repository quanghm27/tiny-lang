const fs = require("mz/fs");

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("Please provide a .ast file.");
        return;
    }

    const astJson = (await fs.readFile(filename)).toString();
    const statements = JSON.parse(astJson);
    const runtimeJs = (await fs.readFile("./builtin/index.js")).toString();
    const jsCode = generateJsForStatements(statements) + "\n\n" + runtimeJs;
    const outputFilename = filename.replace(".ast", ".js");
    await fs.writeFile(outputFilename, jsCode);
    console.log(`Wrote ${outputFilename}.`);
}

function generateJsForStatements(statements) {
    const lines = [];
    for (let statement of statements) {
        const line = generateJsForStatementOrExpr(statement);
        lines.push(line);
    }
    return lines.join("\n");
}

function generateJsForStatementOrExpr(node) {
    if (node.type === "var_assign") {
        const varName = node.var_name.value;
        const expression = generateJsForStatementOrExpr(node.value)
        return `let ${varName} = ${expression};`
    } else if (node.type === "formula_definition") {
        const formulaName = node.name.value
        const formulaParameters = node.parameters
                                    .map(item => item.value)
                                    .join(", ")
        const formulaBody = node.body.statements
                                    .filter(s => s.type !== "comment")
                                    .map(s => generateJsForStatementOrExpr(s))
                                    .join("\n")
        return `function ${formulaName} (${formulaParameters}) {\n${indent(formulaBody)}\n}`

    } else if (node.type === "formula_evaluation") {
        const formulaName = node.name.value;
        const argList = node.arguments.map((arg) => {
            return generateJsForStatementOrExpr(arg);
        }).join(", ");

        return `${formulaName}(${argList})`

    } else if (node.type === "binary_expression") {
        const operator = node.operator.value
        const left = generateJsForStatementOrExpr(node.left)
        const right = generateJsForStatementOrExpr(node.right)
        return `${left} ${operator} ${right}`

    } else if (node.type === "paren_expression") {
        const expression = generateJsForStatementOrExpr(node.value)
        return `(${expression})`

    } else if (node.type === "return_statement") {
        const expression = node.value
        return `return ${generateJsForStatementOrExpr(expression)};`

    } else if (node.type === "string") {
        return node.value;
    } else if (node.type === "number") {
        return node.value;
    } else if (node.type === "identifier") {
        return node.value;
    } else if (node.type === "comment") {
        return "";
    } else {
        throw new Error(`Unhandled AST node type ${node.type}`);
    }
}

function indent(string) {
    return string.split("\n").map(line => "    " + line).join("\n");
}

main().catch(err => console.log(err.stack));