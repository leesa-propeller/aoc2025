import fs from 'node:fs'

export const readFile = (path: string) => {
    const input = fs.readFileSync(path, 'utf8').split("\n")
    const empty = input.indexOf('')
    const ranges = input.slice(0, empty)
                    .map((str) => str.split('-'))
                    .map((range) => range.map((num) => Number.parseFloat(num)))
    const ids = input.slice(empty+1).map(Number)

    return {
        ranges,
        ids
    }
}

const dayFiveA = (path: string) => {
    const { ranges, ids } = readFile(path);

    return ids.reduce((acc, curr) => {
        for (const range of ranges) {
            if (curr >= range[0] && curr <= range[1]) return acc + 1;
        }
        return acc;

    }, 0)
}

const shouldCombineRanges = (r1: number[], r2: number[]) => {
    const [l1, h1] = r1;
    const [l2, h2] = r2;

    if (h2 <= h1 && l2 >= l1) return 'same';
    if ((l2 - h1) <= 1) return 'combine';
    return 'separate' 
}

const dayFiveB = (path: string) => {
    const { ranges, ids } = readFile(path);
    const sortedRanges = ranges.sort((rangeA, rangeB) => {
        return rangeA[0] - rangeB[0]
    })

    let allRanges = [sortedRanges[0]]

    for (let i = 1; i < sortedRanges.length; i++) {
        const lastEl = allRanges[allRanges.length-1]
        const curr = sortedRanges[i];
        const res = shouldCombineRanges(lastEl, curr);

        if (res === 'same') continue;
        else if (res === 'combine') allRanges[allRanges.length-1] = [lastEl[0], curr[1]];
        else allRanges.push(curr)
    }
    
    return allRanges.reduce((acc, curr) => {
        return acc + (curr[1] - curr[0] + 1)
    }, 0)
}

console.log(dayFiveA('input.txt'))
console.log(dayFiveB('input.txt'))


