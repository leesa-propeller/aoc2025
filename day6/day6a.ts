import fs from 'node:fs';

export const readFile = (path: string) => {
    const input = fs.readFileSync(path, 'utf8');
    return input.split('\n').map((line) => line.split(' ').filter(Boolean)) 
}

const doMath = (nums: number[], symbol: string) => {
    if (symbol === '+') return nums.reduce((acc, curr) => acc + curr, 0);
    return nums.reduce((acc, curr) => acc * curr, 1);
}

const daySixA = (path: string) => {
    const input = readFile(path);
    let sum = 0;

    for (let i = 0; i < input[0].length; i++) {
        const nums = input.map((_, j) => Number(input[j][i])).filter(Boolean)
        sum += doMath(nums, input[input.length-1][i])
    }

    console.log(sum)
}

daySixA('input.txt')
