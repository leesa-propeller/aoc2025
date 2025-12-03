import fs from 'fs';

export const readFile = (path: string) => {
    const input = fs.readFileSync(path, 'utf8');
    return input.split('\n');
}

const rearrangeBankFromMinToMax = (bank: string) => new Set(bank.split('').map(Number).sort().reverse());

const getHighestJoltageGivenMax = (bank: string, max: number) => {
    const first = bank.indexOf(max.toString());
    const str = bank.slice(first+1);
    const second = Math.max(...str.split('').map(Number));
    const res = Number.parseInt(`${max}${second}`);
    return res;
}

const getHighestJoltage = (bank: string) => {
    const nums = rearrangeBankFromMinToMax(bank); 
    let curr = 0; 

    nums.forEach((num) => {
        const res = getHighestJoltageGivenMax(bank, num);
        if (res > curr) {
            curr = res;
        }
    })

    return curr;
}

const dayThreeA = (path: string) => {
    const input = readFile(path);
    let sum = 0;
    
    input.forEach((bank) => {
        sum += getHighestJoltage(bank);
    })

    return sum;
}


console.log(dayThreeA('day3.txt'))

