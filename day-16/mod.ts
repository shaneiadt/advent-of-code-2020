import { data, sample, sampleCategories, sampleNearbyTickets } from "./data.ts";
import { getFields, getNearbyTickets } from "./utils.ts";

let invalid = [];

const { fields } = sample;

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

for (const ticket of sample.nearbyTickets) {
  for (const digit of ticket.digits) {
    const isValidOne = validator(fields[0].ranges);
    const isValidTwo = validator(fields[1].ranges);
    const isValidThree = validator(fields[2].ranges);

    if (!isValidOne(digit) && !isValidTwo(digit) && !isValidThree(digit)) {
      // console.log("INVALID", digit);
      invalid.push(digit);
    }
  }
}

// console.log(invalid.reduce((total, cur) => total + cur, 0));

const rangeFields = getFields(sampleCategories);
const nearbyTicketsObj = getNearbyTickets(sampleNearbyTickets);

console.log(rangeFields, nearbyTicketsObj);
