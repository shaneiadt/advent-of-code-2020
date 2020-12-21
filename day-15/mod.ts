import { data, sample1, sample2 } from "./data.ts";
import { getState, loadStartingNumbers, beginGame } from "./utils.ts";
import { State } from "./interfaces.ts";

loadStartingNumbers(1, sample2);

const partOne = beginGame(getState(), 2020);

console.log("[Part 1] what will be the 2020th number spoken?", partOne);
