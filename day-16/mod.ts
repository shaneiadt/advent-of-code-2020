import {
  dataCategories,
  dataNearbyTickets,
  sampleCategories,
  sampleNearbyTickets,
} from "./data.ts";
import {
  getFields,
  getNearbyTickets,
  validateTicketsByFields,
} from "./utils.ts";

const rangeFields = getFields(dataCategories);
const nearbyTicketsObj = getNearbyTickets(dataNearbyTickets);

const invalidTickets = validateTicketsByFields(nearbyTicketsObj, rangeFields);

console.log(invalidTickets);

// TODO: Filter out all invalid tickets

console.log(
  "[Part 1] Consider the validity of the nearby tickets you scanned. What is your ticket scanning error rate?",
  invalidTickets.reduce((total, cur) => total + cur, 0),
);
