const { readFileSync } = require("fs");

const data = readFileSync("input.txt");
const textData = readFileSync("testInput.txt");

const input = data
  .toString()
  .split("\n")
  .map((str) => str.split(" ").map((val) => parseInt(val)));

const findNext = (history) => {
  let total = [history];
  let tempDiff = history;
  while (tempDiff.filter((item) => item !== tempDiff[0]).length) {
    const nextDiff = [];
    tempDiff.forEach((val, index) => {
      if (index < tempDiff.length - 1) {
        nextDiff.push(tempDiff[index + 1] - val);
      }
    });
    tempDiff = nextDiff;
    total.push(nextDiff);
  }

  let nextVal = 0;
  while (total.length) {
    const curArr = total.pop();
    const curVal = curArr[curArr.length - 1];
    nextVal += curVal;
  }
  return nextVal;
};

const findPrev = (history) => {
  let total = [history];
  let tempDiff = history;
  while (tempDiff.filter((item) => item !== tempDiff[0]).length) {
    const nextDiff = [];
    tempDiff.forEach((val, index) => {
      if (index < tempDiff.length - 1) {
        nextDiff.push(tempDiff[index + 1] - val);
      }
    });
    tempDiff = nextDiff;
    total.push(nextDiff);
  }

  let prevVal = 0;
  while (total.length) {
    const curArr = total.pop();
    const curVal = curArr[0];
    prevVal = curVal - prevVal;
  }
  return prevVal;
};

// part 1
let sum = 0;

for (const history of input) {
  const next = findNext(history);
  sum += next;
}
console.log(sum);

// part 2
sum = 0;
for (const history of input) {
  const prev = findPrev(history);
  sum += prev;
}
console.log(sum);
