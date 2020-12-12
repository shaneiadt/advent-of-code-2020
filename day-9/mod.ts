import { data, testData } from "./data.ts";

const input = data.split("\n").map((s) => Number(s.trim()));

function findFirstNotSummableValue(data: number[], preamble: number): number {
  const matches: number[] = [];

  for (let i = 0; i <= data.length; i++) {
    const slice = [...data].slice(i, i + preamble);
    const sum = data[i + preamble];

    for (let x = 0; x < slice.length; x++) {
      for (let y = 0; y < slice.length; y++) {
        if ((slice[x] + slice[y]) === sum && slice[x] !== slice[y]) {
          matches.push(sum);
        }
      }
    }

    if (!matches.includes(sum)) return sum;
  }

  return 0;
}

function findEncryptionRange(data: number[], value: number) {
  let range: number[] = [];

  for (let x = 0; x <= data.length; x++) {
    for (let y = 0; y <= data.length; y++) {
      const slice = [...data].slice(x, y);
      const calculate = slice.reduce((total, num) => total + num, 0);

      if (calculate === value) {
        range = slice;
        break;
      }

      if (calculate > value) break;
    }

    if (range.length > 0) break;
  }

  return range;
}

const corruptValue = findFirstNotSummableValue(input, 25);
const range = findEncryptionRange(input, corruptValue) || [];

const largest = range.reduce((num, cur) => cur > num ? cur : num, 0);
const smallest = range.reduce((num, cur) => cur < num ? cur : num, range[0]);

console.log(
  `[Part 1] What is the first number that does not have this property?`,
  findFirstNotSummableValue(input, 25),
);

console.log(
  `[Part 2] What is the encryption weakness in your XMAS-encrypted list of numbers?`,
  smallest + largest,
);
