import { data, sample } from "./data.ts";

type State = Map<number | string, number[]>;

let state: State = new Map();
const MAX_TURNS = 2020;

const preprocess = (state: State, index: number, list: number[]): State => {
  for (const n of list) {
    state.set(n, [index]);
    state.set("nextNumberToSpeak", [n]);
    index++;
  }

  state.set("turn", [index]);

  return state;
};

const getNumber = (state: State, prop: string): number => {
  return (state?.get(prop) || [1])[0];
};

const beginGame = (state: State): State => {
  let index = getNumber(state, "index");

  while (index < MAX_TURNS) {
    const lastSpokenNumber = getNumber(state, "lastSpokenNumber");
    let turn = getNumber(state, "turn");

    if (state.has(lastSpokenNumber)) {
      const turnsNumberSpokenOn = state?.get(lastSpokenNumber) || [0];

      if (turnsNumberSpokenOn?.length === 1) {
        state.set(lastSpokenNumber, [turn, turnsNumberSpokenOn[0]]);
        state.set("lastSpokenNumber", [0]);
        const zero = (state?.get("0") || [1]);
        state.set(0, [turn, zero[0]]);
      } else {
        const difference = turnsNumberSpokenOn[0] - turnsNumberSpokenOn[1];
        // state.set(lastSpokenNumber, [turn, turnsNumberSpokenOn[0]]);
        state.set("lastSpokenNumber", [difference]);
        if (state.get(difference)) {
          const temp = state?.get(difference) || [0];
          state.set(difference, [turn, temp[0]]);
        } else {
          state.set(difference, [turn]);
        }

        console.log({ lastSpokenNumber, difference });
      }
    }

    index++;
    turn++;

    state.set("turn", [turn]);
    console.log({ lastSpokenNumber: state.get("lastSpokenNumber"), turn });
  }

  return state;
};

state = beginGame(preprocess(state, 1, sample));

console.log(state);
