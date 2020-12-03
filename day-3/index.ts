import { getInputs } from './input';

async function getNumberOfEncounters(moveRight: number, moveDown: number): Promise<number> {
    const input = await getInputs();
    let position = 0;

    return input.reduce((total, cur, i) => {
        if (i === 0) return total + 0;
        if (i % moveDown !== 0) return total + 0;

        position++;

        if (cur[(moveRight * position) % input[0].length] === '#') return total + 1;

        return total + 0;
    }, 0);
}

(async () => {
    const slopes: { [key: string]: number } = {
        "1-1": await getNumberOfEncounters(1, 1),
        "3-1": await getNumberOfEncounters(3, 1),
        "5-1": await getNumberOfEncounters(5, 1),
        "7-1": await getNumberOfEncounters(7, 1),
        "1-2": await getNumberOfEncounters(1, 2),
    };
    const total = slopes["1-1"] * slopes["3-1"] * slopes["5-1"] * slopes["7-1"] * slopes["1-2"];

    console.log(`[Part 1] Trees Encountered: ${slopes["3-1"]}`);
    console.log(`[Part 2] All slopes multiplied: ${total}`);
})();