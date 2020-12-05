import input from './input';

interface BoardingPass {
    row: number;
    column: number;
    sid: number;
}

const reducer = (upper: string, lower: string) => (tuple: [number, number], letter: string): [number, number] => {
    const midpoint = (tuple[0] + tuple[1]) / 2;

    if (letter === upper) return [Math.ceil(midpoint), tuple[1]];

    return tuple = [tuple[0], Math.floor(midpoint)];
};

function getBoardingPass(partition: string): BoardingPass {
    let rowPartition = partition.substring(0, 7);
    let seatPartition = partition.substring(7);

    const row = rowPartition.split('').reduce(reducer('B', 'F'), [0, 127])[0];
    const column = seatPartition.split('').reduce(reducer('R', 'L'), [0, 7])[0];
    const sid = (row * 8) + column;

    return { row, column, sid };
}

const output = input.map(getBoardingPass);

console.log('[Part 1] What is the highest seat ID on a boarding pass?', output.reduce((highest, { sid }) => sid > highest ? sid : highest, 0));