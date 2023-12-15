const { readFileSync } = require("fs");

const data = readFileSync("input.txt");
const textData = readFileSync("testInput.txt");

const input = data.toString().split(",");

// part 1
let results = 0;
for (const val of input) {
  let curVal = 0;
  for (let str of val) {
    curVal = ((curVal + str.charCodeAt(0)) * 17) % 256;
  }
  results += curVal;
}
console.log(results);

// part 2
const findBox = (val) => {
  let curVal = 0;
  for (let str of val) {
    curVal += str.charCodeAt(0);
    curVal = (curVal * 17) % 256;
  }
  return curVal;
};

const boxMap = {};
for (const val of input) {
  const dashIndex = val.indexOf("-");
  const equalIndex = val.indexOf("=");
  if (dashIndex > -1) {
    const boxNum = findBox(val.slice(0, dashIndex));
    if (boxMap[boxNum]?.[val.slice(0, dashIndex)]) {
      delete boxMap[boxNum][val.slice(0, dashIndex)];
    }
  } else if (equalIndex > -1) {
    const focal = parseInt(val.slice(equalIndex + 1));
    const boxNum = findBox(val.slice(0, equalIndex));
    if (!boxMap[boxNum]) {
      boxMap[boxNum] = {};
      boxMap[boxNum][val.slice(0, equalIndex)] = focal;
    } else {
      boxMap[boxNum][val.slice(0, equalIndex)] = focal;
    }
  }
}
// console.log(boxMap);
let sum = 0;
Object.keys(boxMap).forEach((boxNum) => {
  const box = boxMap[boxNum];
  const values = Object.values(box);
  values.forEach((itemVal, i) => {
    sum += (parseInt(boxNum) + 1) * (i + 1) * itemVal;
  });
});
console.log(sum);
