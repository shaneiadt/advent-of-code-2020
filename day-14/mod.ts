import { data, sample, sample2 } from "./data.ts";
import {
  applyBitMask,
  decode,
  getInputs,
  getMask,
  getMemoryAddress,
  toBinary,
} from "./utils.ts";
import { Input, Program } from "./interfaces.ts";

let programs: Program[] = [];
let pid: number;
let memory: Map<number, number> = new Map();

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

function run(program: Program) {
  const inputs: Input[] = getInputs(program.input);

  for (const input of inputs) {
    const address = getMemoryAddress(input.address);
    const value = toBinary(input.value);
    const mask = getMask(program.mask);
    const result = applyBitMask(mask, value);

    memory.set(Number(address), parseInt(result, 2));
  }
}

function run2(program: Program) {
  const inputs: Input[] = getInputs(program.input);

  for (const input of inputs) {
    const address = getMemoryAddress(input.address);
    let decimal = input.value;
    let addressArray = decode(program.mask, address);

    for (let add of addressArray) {
      memory.set(add, decimal);
    }
  }
}

for (const program of programs) {
  run(program);
}

const sum = [...memory.values()].reduce((total, val) => total + val);

console.log(
  "[Part 1] What is the sum of all values left in memory after it completes?",
  sum,
);

memory.clear();

for (const program of programs) {
  run2(program);
}

const sum2 = [...memory.values()].reduce((total, val) => total + val);

console.log(
  "[Part 2] What is the sum of all values left in memory after it completes?",
  sum2,
);
