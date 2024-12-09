const fs = require("fs");
const values = fs.readFileSync("input.txt", "utf8").split("").map(Number);

const getDisk = () => {
  let disk = [];
  let idIndex = 0;
  for (let i = 0; i < values.length; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < values[i]; j++) {
        disk.push(idIndex);
      }
      idIndex++;
    } else {
      for (let j = 0; j < values[i]; j++) {
        disk.push(-1);
      }
    }
  }
  return { disk, largestId: idIndex - 1 };
};

let { disk } = getDisk();
let emptySlot = disk.indexOf(-1, 0);
for (let i = disk.length - 1; i >= 0; i--) {
  if (disk[i] !== -1) {
    disk[emptySlot] = disk[i];
    disk[i] = -1;
    emptySlot = disk.indexOf(-1, emptySlot);
  }

  if (emptySlot >= i) {
    break;
  }
}

console.log(
  "Part 1:",
  disk.reduce((sum, id, index) => (id !== -1 ? sum + id * index : sum), 0)
);

let { disk: disk2, largestId } = getDisk();
for (let i = largestId; i >= 0; i--) {
  let fileIndex = disk2.indexOf(i, 0);
  let fileLength = disk2.lastIndexOf(i) - fileIndex + 1;

  let emptySlotStart = disk2.indexOf(-1, 0);
  while (true) {
    let emptySlotEnd = emptySlotStart;
    while (disk2[emptySlotEnd] === -1 && emptySlotEnd < fileIndex) {
      emptySlotEnd++;
    }
    if (emptySlotEnd - emptySlotStart >= fileLength) {
      for (let j = 0; j < fileLength; j++) {
        disk2[emptySlotStart + j] = disk2[fileIndex + j];
        disk2[fileIndex + j] = -1;
      }
      break;
    } else {
      emptySlotStart = disk2.indexOf(-1, emptySlotEnd);
      if (emptySlotStart >= fileIndex) {
        break;
      }
    }
  }
}

console.log(
  "Part 2:",
  disk2.reduce((sum, id, index) => (id !== -1 ? sum + id * index : sum), 0)
);
