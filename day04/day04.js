const fs = require("fs");
const rows = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((x) => x.trimEnd(x));
const len = rows[0].length;
const data = rows.join("");

const dirs = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 1, y: 1 },
  { x: -1, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 1 },
];

let found = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i] === "X") {
    for (let d = 0; d < dirs.length; d++) {
      let check = { x: i % len, y: Math.floor(i / len) };
      let word = "X";
      for (let j = 0; j < 3; j++) {
        check = { x: check.x + dirs[d].x, y: check.y + dirs[d].y };
        if (
          check.x < 0 ||
          check.x >= len ||
          check.y < 0 ||
          check.y >= rows.length
        ) {
          break;
        }
        word += data[check.y * len + check.x];
      }

      if (word === "XMAS") {
        found++;
      }
    }
  }
}

console.log("Part 1: ", found);

const getLetter = (x, y) => {
  if (x < 0 || x >= len || y < 0 || y >= rows.length) {
    return "";
  }
  return data[y * len + x];
};

found = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i] === "A") {
    const diags = [
      getLetter((i % len) + 1, Math.floor(i / len) + 1),
      getLetter((i % len) - 1, Math.floor(i / len) + 1),
      getLetter((i % len) + 1, Math.floor(i / len) - 1),
      getLetter((i % len) - 1, Math.floor(i / len) - 1),
    ];
    if (
      diags.filter((x) => x === "M").length === 2 &&
      diags.filter((x) => x === "S").length === 2 &&
      diags[0] !== diags[3]
    ) {
      found++;
    }
  }
}

console.log("Part 2: ", found);
