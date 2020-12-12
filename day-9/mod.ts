import { data, testData } from "./data.ts";

const input = data.split("\n").map((s) => Number(s.trim()));

function findFirstNotSummableValue(data: number[], preamble: number): number {
  const matches: { [key: number]: number[][] } = {};

  for (let i = 0; i <= data.length; i++) {
    const slice = [...data].slice(i, i + preamble);

    if (slice.length === 0) break;

    const sum = data[i + preamble];

    if (!sum) break;

    for (let x = 0; x < slice.length; x++) {
      for (let y = 0; y < slice.length; y++) {
        if ((slice[x] + slice[y]) === sum && slice[x] !== slice[y]) {
          if (!matches[sum]) matches[sum] = [];
          matches[sum].push([slice[x], slice[y]]);
        }
      }
    }

    if (!matches[sum]) return sum;
  }

  return 0;
}

findFirstNotSummableValue(input, 25);

console.log(
  `[Part 1] What is the first number that does not have this property?`,
  findFirstNotSummableValue(input, 25),
);
