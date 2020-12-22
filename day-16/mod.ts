import {
  dataCategories,
  dataNearbyTickets,
  sampleCategories,
  sampleNearbyTickets,
} from "./data.ts";
import {
  getFields,
  getNearbyTickets,
  getValidTickets,
  validateTicketsByFields,
} from "./utils.ts";

const rangeFields = getFields(sampleCategories);
const nearbyTicketsObj = getNearbyTickets(sampleNearbyTickets);
const invalidTickets = validateTicketsByFields(nearbyTicketsObj, rangeFields);
const validTickets = getValidTickets(nearbyTicketsObj, invalidTickets);

console.log(validTickets);

console.log(
  "[Part 1] Consider the validity of the nearby tickets you scanned. What is your ticket scanning error rate?",
  invalidTickets.reduce((total, cur) => total + cur, 0),
);
