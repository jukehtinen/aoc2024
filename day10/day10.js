const fs = require("fs");
const map = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((x) => x.trimEnd(x));

const height = map.length;
const width = map[0].length;
const dirs = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

let found = [];
const findTrail = (x, y, d) => {
  if (d === 9) {
    found.push({ x, y });
    return;
  }

  for (const dir of dirs) {
    let nx = x + dir.x;
    let ny = y + dir.y;
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      if (map[ny][nx] === `${d + 1}`) {
        findTrail(nx, ny, d + 1);
      }
    }
  }
};

let total = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (map[y][x] === "0") {
      findTrail(x, y, 0);
      found = found.filter(
        (v, i, a) => a.findIndex((t) => t.x === v.x && t.y === v.y) === i
      );
      total += found.length;
      found = [];
    }
  }
}

console.log("Part 1: ", total);

found = [];
const findTrail2 = (x, y, d) => {
  if (d === 0) {
    found.push({ x, y });
    return;
  }

  for (const dir of dirs) {
    let nx = x + dir.x;
    let ny = y + dir.y;
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      if (map[ny][nx] === `${d - 1}`) {
        findTrail2(nx, ny, d - 1);
      }
    }
  }
};

total = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (map[y][x] === "9") {
      findTrail2(x, y, 9);
      total += found.length;
      found = [];
    }
  }
}

console.log("Part 2: ", total);
