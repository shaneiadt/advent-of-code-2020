import input from './input';

interface BoardingPass {
    row: number;
    column: number;
    sid: number;
}

const reducer = (upper: string) => (tuple: [number, number], letter: string): [number, number] => {
    const midpoint = (tuple[0] + tuple[1]) / 2;

    return letter === upper ? [Math.ceil(midpoint), tuple[1]] : [tuple[0], Math.floor(midpoint)];
};

function getBoardingPass(partition: string): BoardingPass {
    const row = partition.substring(0, 7).split('').reduce(reducer('B'), [0, 127])[0];
    const column = partition.substring(7).split('').reduce(reducer('R'), [0, 7])[0];
    const sid = (row * 8) + column;

    return { row, column, sid };
}

const boardingPasses = input.map(getBoardingPass);
const sid = boardingPasses.map(({ sid }) => sid).sort().filter((sid, i, arr) => sid + 2 === arr[i + 1])[0] + 1;

console.log('[Part 1] What is the highest seat ID on a boarding pass?', boardingPasses.reduce((highest, { sid }) => sid > highest ? sid : highest, 0));
console.log('[Part 2] What is the ID of your seat?', sid);