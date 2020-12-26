import {
  dataCategories,
  dataNearbyTickets,
  sample2Categories,
  sample2NearbyTickets,
  sampleCategories,
  sampleNearbyTickets,
} from "./data.ts";
import { Field } from "./interfaces.ts";
import {
  getFields,
  getNearbyTickets,
  getValidTickets,
  validateTicketsByFields,
  validator,
} from "./utils.ts";

const rangeFields = getFields(sample2Categories);
const nearbyTicketsObj = getNearbyTickets(sample2NearbyTickets);
const invalidTickets = validateTicketsByFields(nearbyTicketsObj, rangeFields);
const validTickets = getValidTickets(nearbyTicketsObj, invalidTickets);

export const identityFields = (
  columns: number[][],
  fields: Field[],
  fieldsIdentified: Map<string, number> = new Map(),
) => {
  // console.log(fields);
  const keys = fields.reduce((obj, cur) => {
    obj.set(cur.name, []);
    return obj;
  }, new Map<string, number[]>());

  for (let x = 0; x < fields.length; x++) {
    for (let y = 0; y < columns.length; y++) {
      const flags: boolean[] = [];

      for (let z = 0; z < columns.length; z++) {
        const isValid = validator(fields[x].ranges);
        flags.push(isValid(columns[y][z]));
      }

      if (flags.filter((flag) => flag).length === columns[0].length) {
        if (!fieldsIdentified.has(fields[x].name)) {
          const vals = keys.get(fields[x].name) || [];
          keys.set(fields[x].name, [...vals, y]);
        }
      }
    }
  }

  let leastAmount = columns.length;
  let kk: string = "";

  keys.forEach((val, key) => {
    if (val.length === 1) {
      leastAmount = val.length;
      kk = key;
    }
  });

  console.log(kk, " is ", keys.get(kk));
  fieldsIdentified?.set(kk, (keys?.get(kk) || [0])[0]);
  fields = fields.filter((f) => f.name !== kk);

  if (fields.length !== 0) {
    identityFields(columns, fields, fieldsIdentified);
  } else {
    console.log(keys);
  }

  return "";
};

export const pivotRowstoColumns = (array: number[][]): number[][] => {
  const arr: number[][] = [];

  for (let x = 0; x < array.length; x++) {
    for (let y = 0; y < array.length; y++) {
      if (!arr[y]) arr[y] = [];
      arr[y].push(array[x][y]);
    }
  }

  return arr;
};

identityFields(pivotRowstoColumns(validTickets), rangeFields);

console.log(
  "[Part 1] Consider the validity of the nearby tickets you scanned. What is your ticket scanning error rate?",
  invalidTickets.reduce((total, cur) => total + cur, 0),
);
