export const toBinary = (integer: number, padding: number): string =>
  integer.toString(2).padStart(padding, "0");

export const getMask = (mask: string): string => mask.replace("mask = ", "");

interface IInput {
  address: string;
  value: number;
}

export const getInputs = (
  array: string[],
): IInput[] => {
  const copy = [...array];
  const result: IInput[] = [];

  if (copy) {
    for (let i = 0; i < copy.length; i++) {
      const index = Number(i);
      const val = copy[i] || "";
      const split = val.split(" = ");

      const item: IInput = {
        address: split[0],
        value: Number(split[1]),
      };

      result.push(item);
    }
  }

  return result;
};
