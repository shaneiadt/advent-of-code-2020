import { data, largeExample, smallExample } from "./data.ts";

const input = data.split("\n").map((s) => Number(s.trim()));

let nums = [...input, 0].sort((a, b) => a - b);
nums = [...nums, nums[nums.length - 1] + 3];

const differences: { [key: string]: number } = nums.reduce(
  (diffs: { [key: string]: number }, cur, i, arr) => {
    const sub = arr[i + 1] - cur;
    if ([1, 2, 3].includes(sub)) diffs[sub] = diffs[sub] + 1;
    return diffs;
  },
  { 1: 0, 2: 0, 3: 0 },
);

function getNumberOfConfigurations(data: number[]) {
  let repitions = 0;

  return data.reduce((total, cur, i, arr) => {
    if (
      cur - arr[i - 1] === 1 &&
      arr[i + 1] - cur === 1
    ) {
      repitions++;
      return total;
    }

    if (repitions === 1) total *= 2;
    if (repitions === 2) total *= 4;
    if (repitions === 3) total *= 7;

    repitions = 0;

    return total;
  }, 1);
}

console.log(
  `[Part 1] What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?`,
  differences["1"] * differences["3"],
);

console.log(
  "[Part 2] What is the total number of distinct ways you can arrange the adapters to connect the charging outlet to your device?",
  getNumberOfConfigurations(nums),
);
