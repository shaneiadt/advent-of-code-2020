import { getInputs } from './input';

async function process() {
    const input = await getInputs();
    const locations: string[] = [];
    let pos = 1;

    for (let i = 1; i < input.length; i++) {
        const row = input[i];

        if (pos + 3 > 31) {
            pos = (pos + 3) - 31;
        } else {
            pos += 3;
        }

        locations.push(row[pos - 1]);
    }
    console.log(`[Part 1] No. of trees encountered: ${locations.filter(loc => loc === '#').length}`);
}

process();