const fs = require("fs");
let values = fs.readFileSync("input.txt", "utf8").split(" ").map(Number);

for (let i = 0; i < 25; i++) {
  console.log(`Iteration ${i + 1}`);
  for (let j = values.length - 1; j >= 0; j--) {
    if (values[j] === 0) {
      values[j] = 1;
    } else if (`${values[j]}`.length % 2 === 0) {
      const value = `${values[j]}`;
      // split value into two same length parts
      const half = value.length / 2;
      const left = Number(value.substring(0, half));
      const right = Number(value.substring(half));

      values.splice(j, 1);
      values.splice(j, 0, left, right);
    } else {
      values[j] = values[j] * 2024;
    }
  }
}

console.log("Part 1: ", values.length);

values = fs.readFileSync("input.txt", "utf8").split(" ").map(Number);
let differentNumbers = new Map();
values.forEach((value) => differentNumbers.set(value, 1));

for (let i = 0; i < 75; i++) {
  console.log(`Iteration ${i + 1}`);
  const newDifferentNumbers = new Map(differentNumbers);
  for (let [k, v] of differentNumbers) {
    if (k === 0) {
      newDifferentNumbers.set(1, (newDifferentNumbers.get(1) || 0) + v);
      newDifferentNumbers.set(0, (newDifferentNumbers.get(0) || 0) - v);
    } else if (`${k}`.length % 2 === 0) {
      const value = `${k}`;
      const half = value.length / 2;
      const left = Number(value.substring(0, half));
      const right = Number(value.substring(half));

      newDifferentNumbers.set(k, (newDifferentNumbers.get(k) || 0) - v);
      newDifferentNumbers.set(left, (newDifferentNumbers.get(left) || 0) + v);
      newDifferentNumbers.set(right, (newDifferentNumbers.get(right) || 0) + v);
    } else {
      newDifferentNumbers.set(k, (newDifferentNumbers.get(k) || 0) - v);
      newDifferentNumbers.set(
        k * 2024,
        (newDifferentNumbers.get(k * 2024) || 0) + v
      );
    }
  }
  differentNumbers = newDifferentNumbers;
  for (let [k, v] of differentNumbers) {
    if (v === 0) {
      differentNumbers.delete(k);
    }
  }
}

let total = 0;
for (let [k, v] of differentNumbers) {
  total += v;
}
console.log("Part 2: ", total);
