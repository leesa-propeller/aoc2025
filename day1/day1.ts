import fs from 'fs';

const readFile = (path: string) => {
    const input = fs.readFileSync(path, 'utf8');
    return input.split('\n');
}

const dayOneA = (path: string) => {
    const input = readFile(path);
    let numZeroes = 0;

    input.reduce((acc, curr) => {
        const direction = curr[0] === 'L' ? -1 : 1;
        const turns = Number.parseInt(curr.slice(1));

        const res = (((acc + (direction * turns)) % 100) + 100) % 100;
        
        if (res === 0) numZeroes++;
        return res;
    }, 50); 

    return numZeroes;
}

const dayOneB = (path: string) => {
    const input = readFile(path);
    let numZeroes = 0;

    input.reduce((acc, curr) => {
        const direction = curr[0] === 'L' ? -1 : 1;
        const turns = Number.parseInt(curr.slice(1));

        if (curr[0] === 'L') {
            const start = acc === 0 ? 100 : acc;
            if (start - turns <= 0) {
                numZeroes += 1 + Math.floor((turns - start) / 100);
            }
        } else {
            if (acc + turns >= 100) {
                numZeroes += 1 + Math.floor((turns - (100 - acc)) / 100);
            }
        }

        return (((acc + (direction * turns)) % 100) + 100) % 100;
    }, 50); 

    return numZeroes;
};

console.log(dayOneA('day1.txt'));
console.log(dayOneB('day1.txt'));
