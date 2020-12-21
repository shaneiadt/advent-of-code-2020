import { data, sample } from "./data.ts";
import { getState, loadStartingNumbers } from "./utils.ts";
import { State } from "./interfaces.ts";

const beginGame = (state: State, END_TURN: number): number => {
  let result = 0;

  while (state.turn < END_TURN) {
    const { memory, next } = state;

    state.turn = state.turn + 1;

    if (!memory.has(next)) {
      state.memory.set(next, [state.turn]);
      state.next = 0;
    } else {
      let arr: number[] = memory?.get(next) || [];

      arr = [state.turn, arr[0]];

      memory.set(next, arr);
      state.next = arr[0] - arr[1];
      if (state.turn + 1 === END_TURN) {
        result = state.next;
      }
    }
  }

  return result;
};

loadStartingNumbers(1, data);

const partOne = beginGame(getState(), 2020);

console.log("[Part 1] what will be the 2020th number spoken?", partOne);
