const fs = require("fs");
const rows = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((x) => x.trimEnd(x));
const len = rows[0].length;

let walls = [];
let start = { x: 0, y: 0 };

for (let y = 0; y < rows.length; y++) {
  for (let x = 0; x < len; x++) {
    if (rows[y][x] === "#") {
      walls.push({ x, y });
    }
    if (rows[y][x] === "^") {
      start = { x, y };
    }
  }
}

let moves = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];

let pos = { ...start };
let direction = 0;
let visited = [pos];

while (pos.x >= 0 && pos.x < len && pos.y >= 0 && pos.y < rows.length) {
  let next = { x: pos.x + moves[direction].x, y: pos.y + moves[direction].y };
  if (walls.find((w) => w.x === next.x && w.y === next.y)) {
    direction = (direction + 1) % 4;
  } else {
    pos = { ...next };
    visited.push(pos);
  }
}

visited = visited.filter((v, i) => visited.findIndex((x) => x.x === v.x && x.y === v.y) === i);
console.log("Part 1: ", visited.length - 1);

function isInfinite(map) {
  let pos = { ...start };
  let direction = 0;
  let visitedTurns = [{ ...pos, direction }];

  while (pos.x >= 0 && pos.x < len && pos.y >= 0 && pos.y < rows.length) {
    let next = { x: pos.x + moves[direction].x, y: pos.y + moves[direction].y };

    if (visitedTurns.find((v) => v.x === next.x && v.y === next.y && v.direction === direction)) {
      return true;
    }

    if (map.find((w) => w.x === next.x && w.y === next.y)) {
      visitedTurns.push({ ...next, direction });
      direction = (direction + 1) % 4;
    } else {
      pos = { ...next };
    }
  }

  return false;
}

let infiniteLoops = 0;
for (let y = 0; y < rows.length; y++) {
  for (let x = 0; x < len; x++) {
    if (rows[y][x] === ".") {
      walls.push({ x, y });
      if (isInfinite(walls)) {
        infiniteLoops++;
      }
      walls.pop();
    }
  }
}

console.log("Part 2: ", infiniteLoops);