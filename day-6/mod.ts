import { data } from "./data.ts";

const input: string[][] = data.split("\n\n").map((entry) =>
  entry.replace(/\n/g, " ").split(" ")
);

const total: number = input.reduce((total, group) => {
  const checker: string[] = [];

  for (const str of group) {
    str.split("").forEach((l) => {
      if (!checker.includes(l)) checker.push(l);
    });
  }

  return total + checker.length;
}, 0);

const partTwo = input.map((group) => {
  let checker: { [key: string]: number } = {};
  let total = 0;

  group.forEach((person) => {
    person.split("").forEach((selection) => {
      if (!checker.hasOwnProperty(selection)) {
        checker = {
          ...checker,
          [selection]: 1,
        };
      } else {
        checker[selection] += 1;
      }
    });
  });

  for (const key in checker) {
    if (checker[key] === group.length) total += 1;
  }

  return total;
});

console.log(`[Part 1] What is the sum of those counts?`, total);
console.log(
  `[Part 2] What is the sum of those counts?`,
  partTwo.reduce((sum, cur) => sum + cur),
);
