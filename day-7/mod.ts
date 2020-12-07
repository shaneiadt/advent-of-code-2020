import { data, testData } from "./data.ts";

const rules: string[] = testData.split("\n");

interface Dictionary {
  key: string;
  bags: string[];
}

const dict: Dictionary[] = rules.map((rule) => {
  let bags = rule.match(/\w+ \w+ bag(s|)/g) || [""];
  bags = bags.map((bag) => bag.replace("bags", "bag"));

  const mainBag = bags[0];
  bags.shift();

  return {
    key: mainBag,
    bags,
  };
});

console.log(dict);

const findEntriesByBag = (dict: (Dictionary | undefined)[]) =>
  (bag: string) => {
    return dict.filter((d) => {
      if (!d) return;

      if (d.bags.includes(bag)) return d;
    });
  };

const canContainShinyGoldBag = findEntriesByBag(dict)("shiny gold bag").map((
  f,
) => f?.key);
console.log(dict);
// console.log(canContainShinyGoldBag);

const num = dict.reduce((total, cur) => {
  for (const bag of canContainShinyGoldBag) {
    if (bag) {
      if (cur?.bags.includes(bag)) {
        // console.log(cur.key, bag);
        return total += 1;
      }
    }
  }

  return total;
}, 0);

console.log(num);

console.log(
  `[Part 1] How many bag colors can eventually contain at least one shiny gold bag?`,
);
