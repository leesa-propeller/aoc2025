import fs from 'node:fs';

const pad = (numToPad: number, str: string) => str + Array(numToPad).fill(' ')

export const readFile = (path: string) => {
    const input = fs.readFileSync(path, 'utf8').split('\n')
    const maxLen = Math.max(...input.map((line) => line.length))

    // make sure all lines have the same length to make accessing easier
    // pad out any line as necessary
    return input.map((line) => {
        if (line.length < maxLen) return pad(maxLen - line.length, line)
        return line
    })
}

const getOperatorIndexes = (line: string) => {
    let indexes: number[] = [];
    for (let i = 0; i < line.length; i++) {
        if (line[i] !== ' ') indexes.push(i);
    }

    // add an extra one at the end just so we have a stopping point for the last operator
    return [...indexes, line.length];
}

const getVertNumber = (input: string[], i: number) => {
    const num = input.slice(0, input.length-1)
                        .map((_, j) => input[j][i])
                        .filter((char) => char !== ' ')
                        .join('')
    return Number(num);
}

const isEmpty = (input: string[], i: number) => {
    const chars = input.map((_, j) => input[j][i]).filter((char) => char !== ' ')
    return chars.length === 0
}

const daySixB = (path: string) => {
    const input = readFile(path);
    const indexes = getOperatorIndexes(input[4]);
    let sum = 0;

    indexes.slice(0, indexes.length-1).forEach((index, j) => {
        let nums: number[] = [];

        for (let i = index; i < indexes[j+1]; i++) {
            if (isEmpty(input, i)) {
                break;
            } else {
                nums.push(getVertNumber(input, i));
            }
        }

        if (input[input.length-1][index] === '+') sum += nums.reduce((acc, curr) => acc + curr, 0);
        else sum += nums.reduce((acc, curr) => acc * curr, 1);
    })

    console.log(sum)
   
}

daySixB('input.txt')