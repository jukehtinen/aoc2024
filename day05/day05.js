const fs = require("fs");
const rows = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((x) => x.trim());

let rules = [];

let i = 0;
for (; i < rows.length; i++) {
  if (rows[i].length === 0) {
    break;
  }
  const vals = rows[i].split("|").map(Number);
  rules.push({ a: vals[0], b: vals[1] });
}
const updatesStart = i + 1;

const isValidOrder = (pages) => {
  let isValid = true;
  for (let a = 0; a < pages.length; a++) {
    for (const rule of rules) {
      if (rule.a === pages[a]) {
        for (let b = 0; b < a; b++) {
          if (pages[b] === rule.b) {
            isValid = false;
          }
        }
      }
    }
  }
  return isValid;
};

let result = 0;
for (let i = updatesStart; i < rows.length; i++) {
  const pages = rows[i].split(",").map(Number);
  if (isValidOrder(pages)) {
    result += pages[Math.floor(pages.length / 2)];
  }
}

console.log("Part 1: ", result);

result = 0;
for (let i = updatesStart; i < rows.length; i++) {
  const pages = rows[i].split(",").map(Number);
  if (!isValidOrder(pages)) {
    const sorted = pages.sort((a, b) => {
      for (const rule of rules) {
        if (rule.a === a && rule.b === b) {
          return -1;
        } else if (rule.a === b && rule.b === a) {
          return 1;
        }
      }
      return 0;
    });
    result += pages[Math.floor(pages.length / 2)];
  }
}

console.log("Part 2: ", result);
