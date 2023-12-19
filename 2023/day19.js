const { readFileSync } = require("fs");

const data = readFileSync("input.txt");
const textData = readFileSync("testInput.txt");

//part 1
let workflows = {};
let ratings = [];
let saveRating = false;

// handle input data
data
  .toString()
  .split("\n")
  .forEach((str) => {
    if (str === "") {
      saveRating = true;
    } else if (saveRating) {
      let ratingLib = {};
      str
        .replace("{", "")
        .replace("}", "")
        .split(",")
        .forEach((rate) => {
          const [key, val] = rate.split("=");
          ratingLib[key] = parseInt(val);
        });
      ratings.push(ratingLib);
    } else {
      let [key, conditions] = str.split("{");
      conditions = conditions.replace("}", "");
      workflows[key] = conditions;
    }
  });
// console.log(workflows);
// console.log(ratings);

let sum = 0;

ratings.forEach((rate) => {
  let curResult = "in";
  let conditionStep = 0;
  while (curResult !== "A" && curResult !== "R") {
    const curConditions = workflows[curResult].split(",")[conditionStep];
    if (curConditions.indexOf(":") === -1) {
      curResult = curConditions;
      conditionStep = 0;
    } else if (curConditions.indexOf(">") !== -1) {
      const [tempCond, tempResult] = curConditions.split(":");
      const [curVal, curTarget] = tempCond.split(">");
      if (rate[curVal] > parseInt(curTarget)) {
        curResult = tempResult;
        conditionStep = 0;
      } else conditionStep++;
    } else if (curConditions.indexOf("<") !== -1) {
      const [tempCond, tempResult] = curConditions.split(":");
      const [curVal, curTarget] = tempCond.split("<");
      if (rate[curVal] < parseInt(curTarget)) {
        curResult = tempResult;
        conditionStep = 0;
      } else conditionStep++;
    }
  }

  if (curResult === "A") {
    let tempSum = Object.values(rate).reduce((acc, cur) => acc + cur, 0);
    sum += tempSum;
  }
});

console.log(sum);

//part 2
let workflows = {};
let saveRating = false;
let MAX_RANGE = 4000;

data
  .toString()
  .split("\n")
  .forEach((str) => {
    if (str === "") {
      saveRating = true;
    } else if (!saveRating) {
      let [key, conditions] = str.split("{");
      conditions = conditions.replace("}", "");
      workflows[key] = conditions;
    }
  });
// console.log(workflows);

const results = [];
const initFlows = {
  a: [1, MAX_RANGE],
  x: [1, MAX_RANGE],
  m: [1, MAX_RANGE],
  s: [1, MAX_RANGE],
};

const dfs = (curResult, conditionStep, prevFlows) => {
  if (curResult === "A") {
    results.push(prevFlows);
    return;
  }
  if (curResult === "R") return;
  const curWorkflows = workflows[curResult].split(",");
  if (curWorkflows.length <= conditionStep) return;

  const curConditions = curWorkflows[conditionStep];

  if (curConditions.indexOf(":") === -1) {
    dfs(curConditions, 0, prevFlows);
  } else if (curConditions.indexOf(">") !== -1) {
    const [tempCond, tempResult] = curConditions.split(":");
    let [curVal, curTarget] = tempCond.split(">");
    curTarget = parseInt(curTarget);
    if (prevFlows[curVal][1] > curTarget) {
      const tempFlows = JSON.parse(JSON.stringify(prevFlows));
      tempFlows[curVal][0] = Math.max(curTarget + 1, prevFlows[curVal][0]);
      dfs(tempResult, 0, tempFlows);
    }

    const tempFlows = JSON.parse(JSON.stringify(prevFlows));
    tempFlows[curVal][1] = Math.min(curTarget, prevFlows[curVal][1]);
    dfs(curResult, conditionStep + 1, tempFlows);
  } else if (curConditions.indexOf("<") !== -1) {
    const [tempCond, tempResult] = curConditions.split(":");
    let [curVal, curTarget] = tempCond.split("<");
    curTarget = parseInt(curTarget);
    if (prevFlows[curVal][0] < curTarget) {
      const tempFlows = JSON.parse(JSON.stringify(prevFlows));
      tempFlows[curVal][1] = Math.min(curTarget - 1, prevFlows[curVal][1]);
      dfs(tempResult, 0, tempFlows);
    }

    const tempFlows = JSON.parse(JSON.stringify(prevFlows));
    tempFlows[curVal][0] = Math.max(curTarget, prevFlows[curVal][0]);
    dfs(curResult, conditionStep + 1, tempFlows);
  }
};

dfs("in", 0, initFlows);
// console.log(results);
let total = 0;
results.forEach((result) => {
  let tempResult = 1;
  tempResult *= Math.max(0, result.a[1] + 1 - result.a[0]);
  tempResult *= Math.max(0, result.m[1] + 1 - result.m[0]);
  tempResult *= Math.max(0, result.s[1] + 1 - result.s[0]);
  tempResult *= Math.max(0, result.x[1] + 1 - result.x[0]);
  total += tempResult;
});
console.log(total);
