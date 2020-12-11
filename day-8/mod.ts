import { data, testData } from "./data.ts";

const bootCode = data.split("\n").map((instruction) => {
  let str = instruction.split(" ");
  return {
    direction: str[0],
    value: Number(str[1]),
  };
});

enum ValidOperations {
  acc = "acc",
  jmp = "jmp",
  nop = "nop",
}

const replace = {
  nop: "jmp",
  jmp: "nop",
};

interface BootCode {
  direction: string;
  value: number;
}

const getAccumulator = (data: BootCode[]) => {
  let operationsCompleted: number[] = [];
  let code = data[0];
  let index = 0;
  let accumulator = 0;

  while (code) {
    if (operationsCompleted.includes(index)) {
      return { accumulator, failed: true };
    }

    operationsCompleted = [...operationsCompleted, index];
    const { direction, value } = code;

    if (direction === ValidOperations.nop) index++;
    if (direction === ValidOperations.jmp) index += value;
    if (direction === ValidOperations.acc) {
      index++;
      accumulator += value;
    }

    code = data[index];
  }
  return { accumulator, failed: false };
};

function fixBootCode(data: BootCode[]) {
  let result = { accumulator: 0, failed: true };

  for (let i = 0; i < data.length; i++) {
    const bootCopy = [...data];

    if (bootCopy[i].direction === ValidOperations.nop) bootCopy[i] = { ...bootCopy[i], direction: replace.nop };
    if (bootCopy[i].direction === ValidOperations.jmp) {
      bootCopy[i] = { ...bootCopy[i], direction: replace.jmp };
    }

    if (!result.failed) break;

    result = getAccumulator(bootCopy);
  }

  return result;
}

console.log(
  `[Part 1] what value is in the accumulator?`,
  getAccumulator(bootCode).accumulator,
);

console.log(
  `[Part 2] What is the value of the accumulator after the program terminates?`,
  fixBootCode(bootCode).accumulator,
);
