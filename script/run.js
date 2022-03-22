const fs = require("mz/fs");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("Please provide a .tiny file.");
        return;
    }
    const programDir = "./example/program/"
    const astDir = "./example/ast/"
    const targetCodeDir = "./example/target-code/"

    const astFilename = filename.replace(".tiny", ".ast");
    const jsFilename = filename.replace(".tiny", ".js");
    await myExec(`node ./script/parse.js ${programDir + filename}`);
    await myExec(`node ./script/generate.js ${astDir + astFilename}`);
    await myExec(`node ${targetCodeDir + jsFilename}`);
}

async function myExec(command) {
    const output = await exec(command);
    if (output.stdout) {
        process.stdout.write(output.stdout);
    }
    if (output.stderr) {
        process.stdout.write(output.stderr);
    }
}

main().catch(err => console.log(err.stack));