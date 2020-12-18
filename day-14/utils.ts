import { Input } from "./interfaces.ts";

export const toBinary = (integer: number, padding: number = 36): string =>
  integer.toString(2).padStart(padding, "0");

export const getMask = (mask: string): string => mask.replace("mask = ", "");

export const getInputs = (
  array: string[],
): Input[] => {
  const copy = [...array];
  const result: Input[] = [];

  if (copy) {
    for (let i = 0; i < copy.length; i++) {
      const val = copy[i] || "";
      const split = val.split(" = ");

      const item: Input = {
        address: split[0],
        value: Number(split[1]),
      };

      result.push(item);
    }
  }

  return result;
};

export const getMemoryAddress = (str: string): string => {
  const regExp = str.match(/\d+/g);
  const result = regExp ? regExp[0] : "";
  
  return result;
};

export const applyBitMask = (mask: string, value: string): string => {
  let result = value.split("");

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] !== "X") {
      const digit = Number(mask[i]);

      if (digit === 1) {
        result[i] = "1";
      } else if (digit === 0) {
        result[i] = "0";
      }
    }
  }

  return result.join("");
};
