import { readFile } from "./day3a";


// e.g. if joltage: 121111111111, prefix: 9, indexToRemove: 1 => we get 911111111111
const generateJoltage = (joltage: string, prefix: string, indexToRemove: number) => 
    [prefix, joltage.slice(0, indexToRemove), joltage.slice(indexToRemove+1)].join("")

const getHighestJoltage = (bank: string) => {
    // start with the last 12 digits
    let joltageMax = bank.slice(-12);
    
    // get the rest of the digits that we haven't evaluated yet to cycle through
    const remaining = bank.slice(0, -12);
    for (let i = remaining.length - 1; i >= 0; i--) {
        let currMax = Number.parseInt(joltageMax);

        // cycle through joltageMax to evaluate all new potential joltages with the current digit (remaining[i])
        for (let j = 0; j < joltageMax.length; j++) {
            let potentialMax = Number.parseInt(generateJoltage(joltageMax, remaining[i], j));
            if (potentialMax > currMax) {
                currMax = potentialMax;
            }
        }

        joltageMax = currMax.toString();
    }

    return Number.parseInt(joltageMax);
}

const dayThreeB = (path: string) => {
    const input = readFile(path);
    let sum = 0;

    input.forEach((bank) => {
        sum += getHighestJoltage(bank);
    })

    return sum;
}

console.log(dayThreeB('day3.txt'))

