import { data, sample } from "./data.ts";
import { Directions, Operations, Ship } from "./interfaces.ts";

let ship: Ship = {
  angle: 0,
  direction: [Directions.E, Directions.N, Directions.W, Directions.S],
  north: 0,
  east: 0,
};

let wayMatrix = [[1, 10], [0, 0]];

let operations: Operations = {
  N: (distance: number) => ship.north += distance,
  S: (distance: number) => ship.north -= distance,
  E: (distance: number) => ship.east += distance,
  W: (distance: number) => ship.east -= distance,
  L: (angle: number) => ship.angle += angle,
  R: (angle: number) => ship.angle += 360 - angle,
  F: (distance: number) => {
    let dir = ship.direction[(ship.angle / 90 % 4)] as keyof Operations;

    return operations[dir](distance);
  },
};

let operations2: Operations = {
  N: (distance) => wayMatrix[0][0] += distance,
  S: (distance) => wayMatrix[1][1] += distance,
  E: (distance) => wayMatrix[0][1] += distance,
  W: (distance) => wayMatrix[1][0] += distance,
  L: (angle) => rotateMatrix((360 - angle) / 90 % 4),
  R: (angle) => rotateMatrix((angle) / 90 % 4),
  F: (distance) => {
    operations[Directions.N](distance * wayMatrix[0][0]);
    operations[Directions.S](distance * wayMatrix[1][1]);
    operations[Directions.E](distance * wayMatrix[0][1]);
    operations[Directions.W](distance * wayMatrix[1][0]);
  },
};

const partOne = (data: string[]) => {
  for (const el of data) {
    const dir = el[0] as keyof Operations;
    const val = Number(el.substring(1));

    operations[dir](val);
  }

  return Math.abs(ship.north) + Math.abs(ship.east);
};

const rotateMatrix = (amount: number) => {
  for (let i = 0; i < amount; i++) {
    wayMatrix = wayMatrix[0].map((val, index) =>
      wayMatrix.map((row) => row[index]).reverse()
    );
  }
};

const partTwo = (data: string[]) => {
  ship = {
    angle: 0,
    direction: [Directions.E, Directions.N, Directions.W, Directions.S],
    north: 0,
    east: 0,
  };
  data.forEach((el) => {
    const dir = el[0] as keyof Operations;
    const val = Number(el.substring(1));
    operations2[dir](val);
  });
  return Math.abs(ship.north) + Math.abs(ship.east);
};

const input = data.split("\n");

console.log(
  "[Part 1] What is the Manhattan distance between that location and the ship's starting position?",
  partOne(input),
);

console.log(
  "[Part 2] What is the Manhattan distance between that location and the ship's starting position?",
  partTwo(input),
);
