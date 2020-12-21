import { State } from "./interfaces.ts";

let state: State = {
  next: 0,
  turn: 0,
  memory: new Map(),
};

export const getState = (): State => state;

const resetState = () => state = { next: 0, turn: 0, memory: new Map() };

export const loadStartingNumbers = (turn: number, list: number[]) => {
  resetState();

  const arr: number[] = [...list];
  arr.pop();

  for (const num of arr) {
    state.memory.set(num, [turn]);
    turn++;
  }

  state["turn"] = arr.length;
  state["next"] = list[list.length - 1];
};

export const beginGame = (state: State, END_TURN: number): number => {
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
