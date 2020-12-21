import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.81.0/testing/asserts.ts";
import { beginGame, getState, loadStartingNumbers } from "./utils.ts";
import {
  sample1,
  sample2,
  sample3,
  sample4,
  sample5,
  sample6,
  sample7,
} from "./data.ts";

Deno.test("state is empty by default initially", () => {
  const state = getState();

  assertEquals(state, {
    next: 0,
    turn: 0,
    memory: new Map(),
  });
});

Deno.test("loadStartingNumbers", () => {
  loadStartingNumbers(1, sample1);

  const { next, turn, memory } = getState();

  assertEquals(next, 6);
  assertEquals(turn, 2);
  assert(memory.has(0));
  assert(memory.has(3));
});

Deno.test("loading & running sample data for part one", () => {
  loadStartingNumbers(1, sample1);
  assertEquals(beginGame(getState(), 2020), 436);

  loadStartingNumbers(1, sample2);
  assertEquals(beginGame(getState(), 2020), 1);

  loadStartingNumbers(1, sample3);
  assertEquals(beginGame(getState(), 2020), 10);

  loadStartingNumbers(1, sample4);
  assertEquals(beginGame(getState(), 2020), 27);

  loadStartingNumbers(1, sample5);
  assertEquals(beginGame(getState(), 2020), 78);

  loadStartingNumbers(1, sample6);
  assertEquals(beginGame(getState(), 2020), 438);

  loadStartingNumbers(1, sample7);
  assertEquals(beginGame(getState(), 2020), 1836);
});
