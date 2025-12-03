import fs from 'fs';
import { range } from 'lodash';

const readFile = (path: string) => {
    const input = fs.readFileSync(path, 'utf8');
    return input.split(',');
}

const getRange = (str: string) => {
    const [start, end] = str.split('-').map(Number);
    return range(start, end + 1);
}

const isInvalidIdA = (num: number) => {
    const strForm = num.toString();
    if (strForm.length % 2 !== 0) return false;

    const strA = strForm.slice(0, strForm.length / 2);
    const strB = strForm.slice(strForm.length / 2);

    return strA === strB;
}

const hasRepeatingRange = (sequence: string, str: string) => {
    const seqLen = sequence.length;
    // as a first check, see if the str length is divisible by the sequence 
    if (str.length % seqLen !== 0) return false;

    // then cycle through the string in groups to check
    for (let i = 0; i < str.length; i += seqLen) {
        if (str.slice(i, i + seqLen) !== sequence) return false;
    }

    return true;
}

const isInvalidIdB = (num: number) => {
    const str = num.toString(); 
    if (str.length < 1) return false;
    
    for (let i = 1; i < str.length; i++) {
        const sequence = str.slice(0, i);
        if (hasRepeatingRange(sequence, str)) {
            return true;
        }
    }

    return false;
}

const dayTwo = (path: string) => {
    let invalidIdsSumA = 0;
    let invalidIdsSumB = 0;

    const ranges = readFile(path).flatMap((str) => getRange(str));
    ranges.forEach((num) => {
        if (isInvalidIdA(num)) {
            invalidIdsSumA += num;
        }
        if (isInvalidIdB(num)) {
            invalidIdsSumB += num;
        }
    })

    return { invalidIdsSumA, invalidIdsSumB }
}

console.log(dayTwo('day2.txt'));