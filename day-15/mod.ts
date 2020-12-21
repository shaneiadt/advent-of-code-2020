import { data } from "./data.ts";
import { beginGame, getState, loadStartingNumbers } from "./utils.ts";

loadStartingNumbers(1, data);
const partOne = beginGame(getState(), 2020);

loadStartingNumbers(1, data);
const partTwo = beginGame(getState(), 30000000);

console.log("[Part 1] what will be the 2020th number spoken?", partOne);
console.log("[Part 2] what will be the 30000000th number spoken?", partTwo);
