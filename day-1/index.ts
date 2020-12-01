import inputs from './input';

export const findSum = (sumToFind: number) => (numbers: number[]): [number, number] | null => {
    for (let x = 0; x <= numbers.length; x++) {
        for (let y = 0; y <= numbers.length; y++) {
            if (numbers[x] + numbers[y] === sumToFind) return [numbers[x], numbers[y]];
        }
    }

    return null;
}

const numbers = findSum(2020)(inputs);

console.log({ numbers, multiplied: numbers[0] * numbers[1] });