const fs = require("fs");
const map = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((x) => x.trimEnd(x));

const height = map.length;
const width = map[0].length;

const findOthers = (x, y) => {
  const others = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (map[i][j] === map[y][x] && (i !== y || j !== x)) {
        others.push({ x: j, y: i });
      }
    }
  }
  return others;
}

let antinodes = [];
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (map[y][x] !== ".") {
      const others = findOthers(x, y);
      others.forEach(({ x: otherX, y: otherY }) => {
        const dx = x < otherX ? Math.abs(x - otherX) * -1 : Math.abs(x - otherX);
        const dy = y < otherY ? Math.abs(y - otherY) * -1 : Math.abs(y - otherY);
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          antinodes.push({ x: nx, y: ny });
        }
      });
    }
  }
}

let uniqueAntinodes = antinodes.filter((v, i, a) => a.findIndex(t => (t.x === v.x && t.y === v.y)) === i);
console.log("Part 1: ", uniqueAntinodes.length);

antinodes = [];
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (map[y][x] !== ".") {
      antinodes.push({ x, y });
      const others = findOthers(x, y);
      others.forEach(({ x: otherX, y: otherY }) => {
        const dx = x < otherX ? Math.abs(x - otherX) * -1 : Math.abs(x - otherX);
        const dy = y < otherY ? Math.abs(y - otherY) * -1 : Math.abs(y - otherY);
        let nx = x + dx;
        let ny = y + dy;

        while (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          antinodes.push({ x: nx, y: ny });
          nx += dx;
          ny += dy;
        }
      });
    }
  }
}

uniqueAntinodes = antinodes.filter((v, i, a) => a.findIndex(t => (t.x === v.x && t.y === v.y)) === i);
console.log("Part 2: ", uniqueAntinodes.length);