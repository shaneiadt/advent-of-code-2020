export interface Operations {
  N: (n: number) => number;
  S: (n: number) => number;
  E: (n: number) => number;
  W: (n: number) => number;
  L: (n: number) => number | void;
  R: (n: number) => number | void;
  F: (n: number) => number | void;
}

export interface Ship {
  angle: number;
  direction: Directions[];
  north: number;
  east: number;
}

export enum Directions {
  N = "N",
  S = "S",
  E = "E",
  W = "W",
}
