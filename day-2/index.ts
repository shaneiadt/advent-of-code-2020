import inputs from './input';

type Password = string[];

interface Entry {
    char: string;
    pwd: string,
    min: number;
    max: number;
}

const firstPolicyValidator = ({ char, pwd, min, max }: Entry): Boolean => {
    const pat = new RegExp(`${char}`, 'g');
    const digits = pwd.match(pat);

    if (digits?.length >= min && digits?.length <= max) return true;
}

const secondPolicyValidator = ({ char, pwd, min, max }: Entry): Boolean => pwd[min - 1] === char && pwd[max - 1] !== char || pwd[min - 1] !== char && pwd[max - 1] === char && true;

export function getValidPasswords(pwds: Password[], isValid: (entry: Entry) => Boolean): Password {
    const validPwds: Password = [];

    for (const entry of pwds) {
        const [policy, pwd] = entry;
        const [minOccurances, maxOccurances] = policy.match(/\d+/g);
        const char = policy.match(/[a-z]/g)[0];

        if (isValid({ char, pwd, min: parseInt(minOccurances), max: parseInt(maxOccurances) })) validPwds.push(pwd);
    }

    return validPwds;
}

const partOne = getValidPasswords(inputs, firstPolicyValidator);
const partTwo = getValidPasswords(inputs, secondPolicyValidator);

console.log(`[Part 1] No. of valid passwords: ${partOne.length}`);
console.log(`[Part 2] No. of valid passwords: ${partTwo.length}`);