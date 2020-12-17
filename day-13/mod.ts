import { data, sample } from "./data.ts";
import { Entry } from "./interfaces.ts";

const input = data.split("\n");

const timestamp = Number(input[0]);
const busIds = input[1].split(",").filter((s) => s !== "x").map((n) =>
  Number(n)
);

function buildTimeTable(timestamp: number, busIds: number[]) {
  const chart: Entry = {
    ...busIds.reduce((all, cur) => {
      return {
        ...all,
        [cur]: [],
      };
    }, {}),
  };
  let index = 0, bid = 0;
  let lowest = timestamp * timestamp;

  while (index < timestamp) {
    for (const id of busIds) {
      const product = id * index;

      if (
        product >= timestamp && chart[id].length === 0 && product % id === 0
      ) {
        if (product - timestamp >= 0 && product - timestamp < lowest) {
          lowest = product - timestamp;
          bid = id;
        }
        chart[id].push(product);
      }
    }
    index++;
  }

  return {
    bid,
    lowest,
    chart,
  };
}

function getEarliestTimestamp(busIds: string[]) {
  let finalTime = BigInt(1);
  let multiplier = BigInt(1);

  const busIdOffsets = busIds
    .map((id, offsetIndex) => ({
      id: id === "x" ? BigInt(0) : BigInt(id),
      offsetIndex: BigInt(offsetIndex),
    }))
    .filter((bt) => bt.id !== BigInt(0));

  for (const bus of busIdOffsets) {
    while ((bus.offsetIndex + finalTime) % bus.id !== BigInt(0)) {
      finalTime += multiplier;
    }
    multiplier *= BigInt(bus.id);
  }

  return finalTime;
}

const table = buildTimeTable(timestamp, busIds);
const earilestTimestamp = getEarliestTimestamp(input[1].split(","));

console.log(
  "[Part 1] What is the ID of the earliest bus you can take to the airport multiplied by the number of minutes you'll need to wait for that bus?",
  table.bid * table.lowest,
);

console.log(
  "[Part 2] What is the Manhattan distance between that location and the ship's starting position?",
  Number((earilestTimestamp).toString().replace("n", "")),
);
