import { Input } from "./interfaces.ts";

export const toBinary = (integer: number, padding: number = 36): string =>
  integer.toString(2).padStart(padding, "0");

export const decode = (mask: string, address: string): number[] => {
  let binAddress = toBinary(Number(address));
  let maskedAddress = applyBitMaskToAddress(mask, binAddress);
  let addressSet = getAddressSet(maskedAddress);
  let addressArray: number[] = [];

  addressSet?.forEach((address) => {
    let decimal = parseInt(address, 2);
    addressArray.push(decimal);
  });

  return addressArray;
};

export const getAddressSet = (maskedAddress: string) => {
  const addressSet = new Set<string>();
  return getAddressUtility(maskedAddress, addressSet);
};

export const getAddressUtility = (
  maskedAddress: string,
  addressSet: Set<string>,
) => {
  if (!maskedAddress.includes("X")) {
    addressSet.add(maskedAddress);
  } else {
    for (let i = 0; i < maskedAddress.length; i++) {
      if (maskedAddress[i] === "X") {
        let add = maskedAddress.substring(0, i) + "0" +
          maskedAddress.substring(i + 1);
        getAddressUtility(add, addressSet);
        add = maskedAddress.substring(0, i) + "1" +
          maskedAddress.substring(i + 1);
        getAddressUtility(add, addressSet);
        return addressSet;
      }
    }
  }
};

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

export const applyBitMaskToAddress = (
  mask: string,
  address: string,
): string => {
  const lMask = getMask(mask);
  let result = "";

  for (let i = 0; i < lMask.length; i++) {
    if (lMask[i] === "0") {
      result += address[i];
    } else {
      result += lMask[i];
    }
  }

  return result;
};
