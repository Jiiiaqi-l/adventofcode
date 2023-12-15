const { readFileSync } = require("fs");

const data = readFileSync("input.txt");
const textData = readFileSync("testInput.txt");

const input = data.toString().split("\n");

let curMetrix = [];
let sum = 0;

const checkVertical = (metrix) => {
  const len = metrix[0].length;
  for (let j = 0; j < metrix[0].length - 1; j++) {
    const midLine = j + 0.5;
    let smudgeCt = 0;
    for (let i = 0; i < metrix.length; i++) {
      let curLine = 0;
      while (midLine - curLine > 0 && midLine + curLine + 0.5 < len) {
        if (
          metrix[i][midLine - curLine - 0.5] !==
          metrix[i][midLine + curLine + 0.5]
        ) {
          smudgeCt++;
        }
        curLine++;
      }
      if (smudgeCt > 1) break;
    }

    if (smudgeCt === 1) return midLine + 0.5;
  }

  return 0;
};

const checkHorizontal = (metrix) => {
  const len = metrix.length;
  for (let j = 0; j < metrix.length - 1; j++) {
    const midLine = j + 0.5;
    let smudgeCt = 0;
    for (let i = 0; i < metrix[0].length; i++) {
      let curLine = 0;
      while (midLine - curLine > 0 && midLine + curLine + 0.5 < len) {
        if (
          metrix[midLine - curLine - 0.5][i] !==
          metrix[midLine + curLine + 0.5][i]
        ) {
          smudgeCt++;
        }
        curLine++;
      }
      if (smudgeCt > 1) break;
    }

    if (smudgeCt === 1) return midLine + 0.5;
  }

  return 0;
};

for (let line of input) {
  if (!line) {
    // action on the curMetrix
    sum += checkVertical(curMetrix);
    sum += 100 * checkHorizontal(curMetrix);
    curMetrix = [];
  } else {
    curMetrix.push(line.split(""));
  }
}
if (curMetrix.length) {
  //   console.log(curMetrix);
  //   console.log("horizontal", checkHorizontal(curMetrix));
  //   console.log("checkVertical", checkVertical(curMetrix));
  sum += checkVertical(curMetrix);
  sum += 100 * checkHorizontal(curMetrix);
}
console.log(sum);
// calculate again
