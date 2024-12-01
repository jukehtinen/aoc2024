const fs = require('fs');
const rows = fs.readFileSync('input.txt', 'utf8').split('\n');

const list1 = rows.map(row => parseInt(row.match(/\d+/)[0])).sort((a, b) => a - b);
const list2 = rows.map(row => parseInt(row.match(/\d+$/)[0])).sort((a, b) => a - b);

let totalDistance = 0;
for (let i = 0; i < list1.length; i++) {
  totalDistance += Math.abs(list1[i] - list2[i]);
}

console.log("Part 1", totalDistance);

let totalSimilarity = 0;
for (let i = 0; i < list1.length; i++) {
  const count1 = list2.filter(x => x === list1[i]).length;
  totalSimilarity += list1[i] * count1;
}

console.log("Part 2", totalSimilarity);

