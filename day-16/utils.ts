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

export const validator = (ranges: number[][]) =>
  (value: number) => {
    let result = false;

    for (const range of ranges) {
      if (value >= range[0] && value <= range[1] && !result) {
        result = true;
      }
    }

    return result;
  };

export const validateTicketsByFields = (
  tickets: number[][],
  fields: Field[],
) => {
  const invalid = [];
  for (const ticket of tickets) {
    for (const digit of ticket) {
      const isInvalid = fields.reduce((result: boolean[], field, i) => {
        if (!validator(field.ranges)(digit)) result.push(false);

        return result;
      }, []);

      if (isInvalid.length === fields.length) invalid.push(digit);
    }
  }

  return invalid;
};
