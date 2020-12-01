import inputs from './input';

export const findSum = (sumToFind: number) => (numbers: number[]): [number, number, number] | null => {
    for (let x = 0; x <= numbers.length; x++) {
        for (let y = 0; y <= numbers.length; y++) {
            for (let z = 0; z <= numbers.length; z++) {
                if (numbers[x] + numbers[y] + numbers[z] === sumToFind) return [numbers[x], numbers[y], numbers[z]];
            }
        }
    }

    return null;
}

const numbers = findSum(2020)(inputs);

console.log({ numbers, multiplied: numbers[0] * numbers[1] * numbers[2] });