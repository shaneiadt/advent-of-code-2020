import * as fs from 'fs';
import * as readline from 'readline';

export function getInputs(stream: string = './input.txt'): Promise<string[][]> {
    const input: string[][] = [];

    return new Promise((resolve, reject) => {
        try {
            const file = readline.createInterface({
                input: fs.createReadStream(stream),
                output: process.stdout,
                terminal: false
            });

            file.on('line', line => input.push(line.split('')));
            file.on('close', () => resolve(input));
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}