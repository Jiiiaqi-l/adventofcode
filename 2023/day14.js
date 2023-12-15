const { readFileSync } = require("fs");

const data = readFileSync("input.txt");
const textData = readFileSync("testInput.txt");

const input = data
  .toString()
  .split("\n")
  .map((str) => str.split(""));

//part 1
let sum = 0;
let curPos = new Array(input[0].length).fill(0);
const len = input.length;
input.forEach((row, i) => {
  row.forEach((item, j) => {
    if (item === "O") {
      sum += len - curPos[j];
      curPos[j]++;
    } else if (item === "#") {
      curPos[j] = i + 1;
    }
  });
});

console.log(sum);

const updateNewPos = (array, dir) => {
  let curPos;
  switch (dir) {
    case "N":
      curPos = new Array(input[0].length).fill(0);
      array.forEach((row, i) => {
        row.forEach((item, j) => {
          if (item === "O") {
            array[i][j] = ".";
            array[curPos[j]][j] = "O";
            curPos[j]++;
          } else if (item === "#") {
            curPos[j] = i + 1;
          }
        });
      });
      break;
    case "S":
      curPos = new Array(input[0].length).fill(0);
      const newArray = array.slice().reverse();
      newArray.forEach((row, i) => {
        row.forEach((item, j) => {
          if (item === "O") {
            newArray[i][j] = ".";
            newArray[curPos[j]][j] = "O";
            curPos[j]++;
          } else if (item === "#") {
            curPos[j] = i + 1;
          }
        });
      });
      array = newArray.reverse();
      break;
    case "W":
      curPos = new Array(input.length).fill(0);
      array.forEach((row, i) => {
        let curPos = 0;
        row.forEach((item, j) => {
          if (item === "O") {
            array[i][j] = ".";
            array[i][curPos] = "O";
            curPos++;
          } else if (item === "#") {
            curPos = j + 1;
          }
        });
      });
      break;
    case "E":
      curPos = new Array(input.length).fill(0);
      array.forEach((row, i) => {
        let curPos = 0;
        row.reverse().forEach((item, j) => {
          if (item === "O") {
            array[i][j] = ".";
            array[i][curPos] = "O";
            curPos++;
          } else if (item === "#") {
            curPos = j + 1;
          }
        });
        row.reverse();
      });
      break;
    default:
      break;
  }
  return array;
};

const seenSet = new Set();
const seenMap = new Map();
let updatedArray = input;
let max = 1;
const ROUNDS = 1000000000;
const updatePerCircle = (array) => {
  updatedArray = updateNewPos(array, "N");
  updatedArray = updateNewPos(updatedArray, "W");
  updatedArray = updateNewPos(updatedArray, "S");
  updatedArray = updateNewPos(updatedArray, "E");
  return updatedArray;
};

while (max <= ROUNDS) {
  updatedArray = updatePerCircle(updatedArray);

  if (seenSet.has(updatedArray.join())) {
    const loopOrigin = seenMap.get(updatedArray.join());
    const loopLength = max - loopOrigin;
    // console.log(loopOrigin, loopLength);

    const remaining = ROUNDS - max;
    const remainingMod = remaining % loopLength;

    for (let j = 0; j < remainingMod; j++) {
      updatePerCircle(updatedArray);
    }

    let sum = 0;
    const len = updatedArray.length;
    updatedArray.forEach((row, i) => {
      row.forEach((item) => {
        if (item === "O") {
          sum += len - i;
        }
      });
    });

    console.log("sum", sum);

    break;
  }
  seenSet.add(updatedArray.join());
  seenMap.set(updatedArray.join(), max);

  max++;
}
