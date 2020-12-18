import { data, sample } from "./data.ts";
import { getInputs, getMask, toBinary } from "./utils.ts";
import { Input, Program } from "./interfaces.ts";

let programs: Program[] = [];
let pid: number;

sample.split("\n").forEach((line, index) => {
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
  const mask = getMask(program.mask);
  const inputs: Input[] = getInputs(program.input);

  console.log(mask, inputs);
}

for (const program of programs) {
  run(program);
}

// console.log(programs);
