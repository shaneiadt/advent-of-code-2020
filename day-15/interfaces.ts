export type Memory = Map<number, number[]>;

export interface State {
  next: number;
  turn: number;
  memory: Memory;
}
