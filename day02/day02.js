const fs = require("fs");
const rows = fs.readFileSync("input.txt", "utf8").split("\n");

let safe = 0;
for (let i = 0; i < rows.length; i++) {
  const vals = rows[i].split(" ").map((x) => parseInt(x));

  if (vals[0] === vals[1]) continue;

  const isIncreasing = vals[0] < vals[1];

  let isSafe = true;
  for (let j = 0; j < vals.length - 1; j++) {
    const difference = vals[j + 1] - vals[j];

    if (isIncreasing) {
      if (difference < 1 || difference > 3) {
        isSafe = false;
      }
    } else {
      if (difference > -1 || difference < -3) {
        isSafe = false;
      }
    }
  }

  if (isSafe) {
    safe++;
  }
}

console.log("Part 1", safe);

safe = 0;
for (let i = 0; i < rows.length; i++) {
  const originalVals = rows[i].split(" ").map((x) => parseInt(x));
  const numbers = originalVals.length;
  for (let k = 0; k < numbers; k++) {
    const vals = originalVals.filter((_, i) => i !== k);

    if (vals[0] === vals[1]) continue;

    const isIncreasing = vals[0] < vals[1];

    let isSafe = true;
    for (let j = 0; j < vals.length - 1; j++) {
      const difference = vals[j + 1] - vals[j];

      if (isIncreasing) {
        if (difference < 1 || difference > 3) {
          isSafe = false;
        }
      } else {
        if (difference > -1 || difference < -3) {
          isSafe = false;
        }
      }
    }

    if (isSafe) {
      safe++;
      break;
    }
  }
}

console.log("Part 2", safe);
