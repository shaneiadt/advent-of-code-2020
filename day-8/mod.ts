import { data, testData } from "./data.ts";

const bootCode: string[] = data.split("\n").map((v) => v.trim());

enum ValidOperations {
  acc = "acc",
  jmp = "jmp",
  nop = "nop",
}

let accumulator: number = 0;
let loop = true;
let i = 0;

let operationsCompleted: { [key: number]: string } = {};

do {
  const [operation, num] = bootCode[i].split(" ");

  operationsCompleted = {
    ...operationsCompleted,
    [i]: bootCode[i],
  };

  switch (operation) {
    case ValidOperations.acc:
      accumulator = eval(`${accumulator}${num}`);
      i++;
      break;
    case ValidOperations.jmp:
      i = eval(`${i}${num}`);
      break;
    case ValidOperations.nop:
      i++;
      break;
  }

  if (operationsCompleted[i]) loop = false;
} while (loop);

console.log(
  `[Part 1] what value is in the accumulator?`,
  accumulator,
);
