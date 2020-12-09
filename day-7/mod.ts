import { data, testData } from "./data.ts";

const rules: string[] = data.split("\n");

interface Bags {
  [key: string]: {
    "types": {
      [key: string]: number;
    };
  };
}

const bags = rules.reduce((allBags: Bags, rule) => {
  const mainBagPattern = /(\w*\s\w*)(\sbags)?\s(?:contain)\s/gm;
  const regExp = mainBagPattern.exec(rule) || [];
  const [, mainBag] = regExp;

  rule
    .replace(mainBagPattern, "")
    .replace(".", "")
    .split(",")
    .forEach((bag) => {
      const [, amount, bagType] =
        /(\d\s)?(\w+ \w+) bag(?:s)?(?:,)?/.exec(bag) ||
        [];

      if (bag !== "no other bags") {
        if (!allBags[mainBag]) {
          allBags[mainBag] = {
            types: {},
          };
        }
        allBags[mainBag].types[bagType] = amount ? parseInt(amount.trim()) : 0;
      }
    });

  return allBags;
}, {});

let validBags = new Set();

function find(child: string, parent: string) {
  const children = Object.keys(bags[child]?.types || []);

  if (children.length === 0) return;
  if (children.includes("shiny gold")) return validBags.add(parent);

  children.forEach((_, i, arr) => find(arr[i], parent));
}

Object.keys(bags).forEach((_, i, arr) => find(arr[i], arr[i]));

let requiredBags = 0;

const findRequiredBags = (
  child: string = "shiny gold",
  count: number = 1,
): number => {
  const children = Object.keys(bags[child]?.types || []);

  if (children.length === 0) return requiredBags;

  children.forEach((_, i, arr) => {
    const currentBagTotal = bags[child].types[arr[i]];
    const childrenToAdd = count * currentBagTotal;

    requiredBags += childrenToAdd;
    findRequiredBags(arr[i], childrenToAdd);
  });

  return requiredBags;
};

requiredBags = findRequiredBags();

console.log(
  `[Part 1] How many bag colors can eventually contain at least one shiny gold bag?`,
  validBags.size,
);
console.log(
  `[Part 2] How many individual bags are required inside your single shiny gold bag?`,
  requiredBags,
);
