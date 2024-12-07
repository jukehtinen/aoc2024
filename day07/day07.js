const fs = require("fs");
const rows = fs
  .readFileSync("input.txt", "utf8")
  .split("\n");

const testOperators = (values, index, opindex, current, result) => {
  if (opindex === 0) {
    current += values[index + 1];
  } else if (opindex === 1) {
    current *= values[index + 1];
  }

  if (index + 1 === values.length - 1) {
    return current === result;
  }

  for (let k = 0; k < 2; k++) {
    if (testOperators(values, index + 1, k, current, result)) {
      return true;
    }
  }
}

let sum = 0;
for (let i = 0; i < rows.length; i++) {
  const tokens = rows[i].split(":");
  const result = Number(tokens[0].trim());
  const values = tokens[1].trim().split(" ").map(Number);

  for (let k = 0; k < 2; k++) {
    if (testOperators(values, 0, k, values[0], result)) {
      sum += result
      break;
    }
  }
}

console.log("Part 1:", sum);

const testOperators2 = (values, index, opindex, current, result) => {
  if (opindex === 0) {
    current += values[index + 1];
  } else if (opindex === 1) {
    current *= values[index + 1];
  } else if (opindex === 2) {
    current = Number(`${current}${values[index + 1]}`);
  }

  if (index + 1 === values.length - 1) {
    return current === result;
  }

  for (let k = 0; k < 3; k++) {
    if (testOperators2(values, index + 1, k, current, result)) {
      return true;
    }
  }
}

sum = 0;
for (let i = 0; i < rows.length; i++) {
  const tokens = rows[i].split(":");
  const result = Number(tokens[0].trim());
  const values = tokens[1].trim().split(" ").map(Number);

  for (let k = 0; k < 3; k++) {
    if (testOperators2(values, 0, k, values[0], result)) {
      sum += result
      break;
    }
  }
}

console.log("Part 2:", sum);