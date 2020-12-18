import { data, sample } from "./data.ts";
import {
  applyBitMask,
  getInputs,
  getMask,
  getMemoryAddress,
  toBinary,
} from "./utils.ts";
import { Input, Program } from "./interfaces.ts";

let programs: Program[] = [];
let pid: number;

data.split("\n").forEach((line, index) => {
  if (line.includes("mask")) {
    pid = index;

    programs.push({
      id: index,
      mask: line,
      input: [],
    });
  } else {
    const program = programs.find((p) => p.id === pid);
    program?.input.push(line);
  }
});

programs = programs.sort((a, b) => a.id - b.id);

let memory: { [key: string]: number } = {};

function run(program: Program) {
  const inputs: Input[] = getInputs(program.input);

  for (const input of inputs) {
    const address = getMemoryAddress(input.address);
    const value = toBinary(input.value);
    const mask = getMask(program.mask);
    const result = applyBitMask(mask, value);

    memory = {
      ...memory,
      [address]: parseInt(result, 2),
    };
  }
}

for (const program of programs) {
  run(program);
}

const sum = Object.values(memory).reduce((total, val) => total + val);

console.log(
  "[Part 1] What is the sum of all values left in memory after it completes?",
  sum,
);
