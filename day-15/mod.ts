import { data, sample } from "./data.ts";
import { getState, loadStartingNumbers } from "./utils.ts";
import { State } from "./interfaces.ts";

const MAX_TURNS = 2020;

loadStartingNumbers(1, sample);

const beginGame = (state: State) => {
  while (state.turn < MAX_TURNS) {
    const { memory, next } = state;

    state.turn++;

    if (!memory.has(next)) {
      state.memory.set(next, [state.turn]);
      state.next = 0;
    } else {
      const arr: number[] = memory?.get(next) || [];

      if(arr.length === 1){

      }
      // const diff = arr[0] - arr[1];

      // state.next = diff;
    }
  }
};

beginGame(getState());

console.log(getState());
