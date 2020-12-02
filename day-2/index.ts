import inputs from './input';

type Password = string[];

export function getValidPasswords(pwds: Password[]): string[] {
    const validPwds: string[] = [];

    for (const entry of pwds) {
        const [policy, pwd] = entry;
        const [minOccurances, maxOccurances] = policy.match(/\d+/g);
        const char = policy.match(/[a-z]/g)[0];

        const pat = new RegExp(`${char}`, 'g');
        const digits = pwd.match(pat);

        if (digits?.length >= parseInt(minOccurances) && digits?.length <= parseInt(maxOccurances)) validPwds.push(pwd);
    }

    return validPwds;
}

const passwords = getValidPasswords(inputs);

console.log(`No. of valid passwords: ${passwords.length}`);