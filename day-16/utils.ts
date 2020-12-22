import { Field } from "./interfaces.ts";

export const getFields = (
  string: string,
): Field[] => {
  return string.split("\n").map((str) => {
    const split = str.split(": ");
    const splitForRanges = split[1].split(" or ");
    return {
      name: split[0],
      ranges: [
        splitForRanges[0].split("-").map((n) => Number(n)),
        splitForRanges[1].split("-").map((n) => Number(n)),
      ],
    };
  });
};

export const getNearbyTickets = (string: string): number[][] => {
  return string.split("\n").map((str) => str.split(",").map((n) => Number(n)));
};
