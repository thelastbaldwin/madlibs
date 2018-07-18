const fs = require("fs");
const readlineSync = require("readline-sync");
const TEMPLATE_DIR = "../templates";
const tagRegex = /{([^}]+)}/g;
let fileName = process.argv.find(arg => arg.indexOf(".madlib") !== -1);

const printHeadline = () => {
    console.log("*".repeat(25));
    console.log(" ".repeat(9) + "MADLIBS" + " ".repeat(9));
    console.log("*".repeat(25));
};

printHeadline();

if (!fileName) {
    console.log("\nAvailable Templates:");
    const files = fs.readdirSync(TEMPLATE_DIR);
    const index = readlineSync.keyInSelect(files, "Which Template");
    fileName = files[index];
}

let template;
try {
    template = fs.readFileSync(`${TEMPLATE_DIR}/${fileName}`);
} catch (e) {
    console.log(`There was a problem opening ${TEMPLATE_DIR}/${fileName}.`);
    console.log("Please check the filename and permissions");
}

const matchDict = {};
let match = tagRegex.exec(template);

while (match){
    const token = match[1];
    const replacementToken = readlineSync.question(`Enter a ${token.toLowerCase()}: `);

    matchDict[token] = matchDict[token] || {replacements: [], replaceIndex: 0};
    matchDict[token].replacements.push(replacementToken);
    match = tagRegex.exec(template);
}

const splitTemplate = template.toString().split(tagRegex).map(token => {
    if (token in matchDict){
        const {
            replacements,
            replaceIndex: index
        } = matchDict[token];

        const newToken = replacements[index];
        matchDict[token].replaceIndex++;
        return newToken;
    }
    return token;
});

console.log(`\nYour madlib:\n\n${splitTemplate.join("")}`);
