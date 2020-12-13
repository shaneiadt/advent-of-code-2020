import { data, sample } from "./data.ts";

const input = data.split("\n");

enum Positions {
  occupied = "#",
  floor = ".",
  empty = "L",
}

function replaceAt(model: string, index: number, replacement: string): string {
  return model.substr(0, index) + replacement +
    model.substr(index + replacement.length);
}

function modelSeatLayout(model: string[]): string[] {
  let newModel: string[] = [...model];

  for (let x = 0; x < model.length; x++) {
    const grid = model[x];

    for (let y = 0; y < grid.length; y++) {
      const position = grid[y];

      if (position !== ".") {
        const adjacentSeats = getAdjacentSeats(model, { row: x, column: y });
        const values = Object.values(adjacentSeats);

        if (
          position === Positions.empty &&
          values.every((seat) => seat !== Positions.occupied)
        ) {
          newModel[x] = replaceAt(newModel[x], y, Positions.occupied);
        } else if (
          position === Positions.occupied &&
          values.filter((seat) => seat === Positions.occupied).length >=
            4
        ) {
          newModel[x] = replaceAt(newModel[x], y, Positions.empty);
        }
      }
    }
  }

  if (areModelsTheSame(model, newModel)) return newModel;

  return modelSeatLayout(newModel);
}

function areModelsTheSame(m1: string[], m2: string[]): boolean {
  for (let x = 0; x < m1.length; x++) {
    if (m1[x] !== m2[x]) return false;
  }

  return true;
}

function getAdjacentSeats(
  model: string[],
  position: { row: number; column: number },
) {
  const { row, column } = position;

  const north = model[row - 1] ? model[row - 1][column] : "";
  const south = model[row + 1] ? model[row + 1][column] : "";
  const east = model[row][column + 1] ? model[row][column + 1] : "";
  const west = model[row][column - 1] ? model[row][column - 1] : "";

  const northWest = model[row - 1] && model[row - 1][column - 1]
    ? model[row - 1][column - 1]
    : "";
  const southWest = model[row + 1] && model[row + 1][column - 1]
    ? model[row + 1][column - 1]
    : "";
  const northEast = model[row - 1] && model[row - 1][column + 1]
    ? model[row - 1][column + 1]
    : "";
  const southEast = model[row + 1] && model[row + 1][column + 1]
    ? model[row + 1][column + 1]
    : "";

  return {
    north,
    south,
    east,
    west,
    northWest,
    southWest,
    northEast,
    southEast,
  };
}

const numberOfOccupiedSeats = modelSeatLayout(input).reduce((total, cur) => {
  for (const pos of cur.split("")) {
    if (pos === Positions.occupied) total++;
  }

  return total;
}, 0);

console.log('[Part 1] How many seats end up occupied?', numberOfOccupiedSeats);
