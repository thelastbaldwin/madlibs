const fs = require("fs");
const readlineSync = require("readline-sync");
const TEMPLATE_DIR = "../templates";
const madLib = [];
const nextOpeningTagIndex = (templateString, from = 0) =>
  templateString.indexOf("{", from);
const nextClosingTagIndex = (templateString, from = 0) =>
  templateString.indexOf("}", from);
const isVowel = (char) => /[aeiou]/i.test(char);
let stringIndex = 0;
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

if (fileName === undefined) {
  process.exit(1);
}

let template;
try {
  template = fs.readFileSync(`${TEMPLATE_DIR}/${fileName}`, "utf-8");
} catch (e) {
  throw "There was a problem opening your file. Please check the filename and permissions";
}

while (stringIndex !== template.length) {
  const openingTagIndex = nextOpeningTagIndex(template, stringIndex);
  let closingTagIndex;

  if (openingTagIndex > -1) {
    closingTagIndex = nextClosingTagIndex(template, openingTagIndex);
    const token = template.substring(openingTagIndex + 1, closingTagIndex);
    const replacementToken = readlineSync.question(
      `Enter a${isVowel(token[0]) ? "n" : ""} ${token.toLowerCase()}: `
    );
    // add everything from the last closing tag up to, but not including, the next opening tag
    madLib.push(template.substring(stringIndex, openingTagIndex));
    madLib.push(replacementToken);
    stringIndex = closingTagIndex + 1;
  } else {
    stringIndex = template.length;
  }
}

console.log(`\nYour madlib:\n\n${madLib.join("")}`);
