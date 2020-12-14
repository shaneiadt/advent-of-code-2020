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

interface Directions {
  north: { symbol: string; pos: { row: number; col: number } };
  south: { symbol: string; pos: { row: number; col: number } };
  east: { symbol: string; pos: { row: number; col: number } };
  west: { symbol: string; pos: { row: number; col: number } };
  northWest: { symbol: string; pos: { row: number; col: number } };
  southWest: { symbol: string; pos: { row: number; col: number } };
  northEast: { symbol: string; pos: { row: number; col: number } };
  southEast: { symbol: string; pos: { row: number; col: number } };
}

function modelSeatLayout(
  model: string[],
  options: {
    occupiedLength: number;
    getSeats: (
      model: string[],
      startingPos: { row: number; column: number },
    ) => Directions;
  },
): string[] {
  let newModel: string[] = [...model];

  for (let x = 0; x < model.length; x++) {
    const grid = model[x];

    for (let y = 0; y < grid.length; y++) {
      const position = grid[y];

      if (position !== ".") {
        const adjacentSeats = options.getSeats(model, { row: x, column: y });
        const {
          north,
          south,
          east,
          west,
          southEast,
          southWest,
          northEast,
          northWest,
        } = adjacentSeats;

        const values = [
          north,
          south,
          east,
          west,
          southEast,
          southWest,
          northEast,
          northWest,
        ];

        if (
          position === Positions.empty &&
          north.symbol !== Positions.occupied &&
          south.symbol !== Positions.occupied &&
          east.symbol !== Positions.occupied &&
          west.symbol !== Positions.occupied &&
          northEast.symbol !== Positions.occupied &&
          southEast.symbol !== Positions.occupied &&
          northWest.symbol !== Positions.occupied &&
          southWest.symbol !== Positions.occupied
        ) {
          newModel[x] = replaceAt(newModel[x], y, Positions.occupied);
        } else if (
          position === Positions.occupied &&
          values.filter((entry) => entry.symbol === Positions.occupied)
              .length >=
            options.occupiedLength
        ) {
          newModel[x] = replaceAt(newModel[x], y, Positions.empty);
        }
      }
    }
  }

  if (areModelsTheSame(model, newModel)) return newModel;

  return modelSeatLayout(newModel, options);
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

  const north = model[row - 1]
    ? { symbol: model[row - 1][column], pos: { row: row - 1, col: column } }
    : { symbol: "", pos: { row: row - 1, col: column } };
  const south = model[row + 1]
    ? { symbol: model[row + 1][column], pos: { row: row + 1, col: column } }
    : { symbol: "", pos: { row: row + 1, col: column } };
  const east = model[row][column + 1]
    ? { symbol: model[row][column + 1], pos: { row: row, col: column + 1 } }
    : { symbol: "", pos: { row: row, col: column + 1 } };
  const west = model[row][column - 1]
    ? { symbol: model[row][column - 1], pos: { row: row, col: column - 1 } }
    : { symbol: "", pos: { row: row, col: column - 1 } };

  const northWest = model[row - 1] && model[row - 1][column - 1]
    ? {
      symbol: model[row - 1][column - 1],
      pos: { row: row - 1, col: column - 1 },
    }
    : {
      symbol: "",
      pos: { row: row - 1, col: column - 1 },
    };
  const southWest = model[row + 1] && model[row + 1][column - 1]
    ? {
      symbol: model[row + 1][column - 1],
      pos: { row: row + 1, col: column - 1 },
    }
    : {
      symbol: "",
      pos: { row: row + 1, col: column - 1 },
    };
  const northEast = model[row - 1] && model[row - 1][column + 1]
    ? {
      symbol: model[row - 1][column + 1],
      pos: { row: row - 1, col: column + 1 },
    }
    : {
      symbol: "",
      pos: { row: row - 1, col: column + 1 },
    };
  const southEast = model[row + 1] && model[row + 1][column + 1]
    ? {
      symbol: model[row + 1][column + 1],
      pos: { row: row + 1, col: column + 1 },
    }
    : {
      symbol: "",
      pos: { row: row + 1, col: column + 1 },
    };

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

const traverse = (
  model: string[],
  startingPos: { row: number; column: number },
) =>
  (
    angle: { row: number; column: number },
  ): { symbol: string; pos: { row: number; col: number } } => {
    let symbol: string =
      model[startingPos.row] && model[startingPos.row][startingPos.column]
        ? model[startingPos.row][startingPos.column]
        : "";
    let row = startingPos.row;
    let col = startingPos.column;

    do {
      row += angle.row;
      col += angle.column;

      symbol = model[row] && model[row][col] ? model[row][col] : "";
    } while (
      symbol !== "" && symbol !== Positions.empty &&
      symbol !== Positions.occupied
    );

    return { symbol, pos: { row, col } };
  };

function getFirstVisbleSeats(
  model: string[],
  position: { row: number; column: number },
) {
  const { row, column } = position;

  const crawl = traverse(model, { row, column });

  const north = crawl({ row: -1, column: 0 });
  const south = crawl({ row: +1, column: 0 });
  const east = crawl({ row: 0, column: +1 });
  const west = crawl({ row: 0, column: -1 });

  const northWest = crawl({ row: -1, column: -1 });
  const southWest = crawl({ row: +1, column: -1 });
  const northEast = crawl({ row: -1, column: +1 });
  const southEast = crawl({ row: +1, column: +1 });

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

const numberOfOccupiedSeats1 = modelSeatLayout(
  input,
  { occupiedLength: 4, getSeats: getAdjacentSeats },
).reduce((total, cur) => {
  for (const pos of cur.split("")) {
    if (pos === Positions.occupied) total++;
  }

  return total;
}, 0);

const numberOfOccupiedSeats2 = modelSeatLayout(
  input,
  { occupiedLength: 5, getSeats: getFirstVisbleSeats },
).reduce((total, cur) => {
  for (const pos of cur.split("")) {
    if (pos === Positions.occupied) total++;
  }

  return total;
}, 0);

console.log("[Part 1] How many seats end up occupied?", numberOfOccupiedSeats1);
console.log("[Part 2] How many seats end up occupied?", numberOfOccupiedSeats2);
