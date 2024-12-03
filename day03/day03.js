const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

let matches = input.match(/mul\(\d{1,3},\d{1,3}\)/g);

let total = 0;
matches.forEach((match) => {
  const [a, b] = match.match(/\d{1,3}/g).map(Number);
  total += a * b;
});

console.log("Part 1:", total);

matches = input.match(/mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g);

total = 0;
let mulActive = true;
matches.forEach((match) => {
  if (match === "do()") {
    mulActive = true;
  } else if (match === "don't()") {
    mulActive = false;
  } else if (mulActive) {
    const [a, b] = match.match(/\d{1,3}/g).map(Number);
    total += a * b;
  }
});

console.log("Part 2:", total);
