import input from './input';

interface Document {
    byr?: string;
    iyr?: string;
    eyr?: string;
    hgt?: string;
    ecl?: string;
    hcl?: string;
    pid?: string;
    cid?: string;
}

const createDocument = (entry: string): Document => Object.fromEntries(entry.replace(/\n/g, " ").split(" ").map(str => str.split(":")));
const validatorPartOne = ({ byr, iyr, eyr, hgt, hcl, ecl, pid }: Document) => byr && iyr && eyr && hgt && hcl && ecl && pid;
const validatorPartTwo = ({ byr, iyr, eyr, hgt, hcl, ecl, pid }: Document) => {
    const checkDate = (value: number) => (dateOne: number, dateTwo: number) => value >= dateOne && value <= dateTwo;
    const isHex = (value: string) => /^#[0-9a-f]{6}$/.test(value);
    const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

    const isByrValid = checkDate(parseInt(byr as string))(1920, 2002);
    const isIyrValid = checkDate(parseInt(iyr as string))(2010, 2020);
    const isEyrValid = checkDate(parseInt(eyr as string))(2020, 2030);
    const [, height, unit] = hgt && hgt.match(/(\d+)(cm|in)/) || [];
    const isHgtValid = unit && unit === "cm" ? parseInt(height) >= 150 && parseInt(height) <= 193 : parseInt(height) >= 59 && parseInt(height) <= 76;
    const isHclValid = isHex(hcl as string);
    const isEclValid = eyeColors.includes(ecl as string);
    const isPidValid = pid && /^\d{9}$/.test(pid);

    return (
        isByrValid &&
        isIyrValid &&
        isEyrValid &&
        isHgtValid &&
        isHclValid &&
        isEclValid &&
        isPidValid
    );
};

const passports = input
    .split("\n\n")
    .map(createDocument)

const numOfValidPassportsPartOne = passports.filter(validatorPartOne);
const numOfValidPassportsPartTwo = passports.filter(validatorPartTwo);

console.log(`[Part 1] - No. of valid passports: ${numOfValidPassportsPartOne.length}`);
console.log(`[Part 2] - No. of valid passports: ${numOfValidPassportsPartTwo.length}`);