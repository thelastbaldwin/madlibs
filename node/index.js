const fs = require("fs");
const readlineSync = require("readline-sync");
const TEMPLATE_DIR = "../templates";
const tagRegex = /{([^}]+)}/g;
let fileName = process.argv.find((arg) => arg.indexOf(".madlib") !== -1);

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
  throw "There was a problem opening your file. Please check the filename and permissions";
}

const matchDict = {};
let match = tagRegex.exec(template);

while (match) {
  const token = match[1];
  const replacementToken = readlineSync.question(
    `Enter a ${token.toLowerCase()}: `
  );

  matchDict[token] ??= [];
  matchDict[token].push(replacementToken);
  match = tagRegex.exec(template);
}

const splitTemplate = template
  .toString()
  .split(tagRegex)
  .map((token) => {
    if (token in matchDict) {
      return matchDict[token].pop();
    }
    return token;
  });

console.log(`\nYour madlib:\n\n${splitTemplate.join("")}`);
