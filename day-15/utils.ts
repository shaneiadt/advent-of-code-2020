import { State } from "./interfaces.ts";

const startingState: State = {
  next: 0,
  turn: 0,
  memory: new Map(),
};

let state: State = {
  next: 0,
  turn: 0,
  memory: new Map(),
};

export const getState = (): State => state;

const resetState = () => state = { ...startingState };

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
