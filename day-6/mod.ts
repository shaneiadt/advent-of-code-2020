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

console.log(`[Part 1] What is the sum of those counts?`, total);
