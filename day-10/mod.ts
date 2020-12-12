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

console.log(
  `[Part 1] What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?`,
  differences["1"] * differences["3"],
);
