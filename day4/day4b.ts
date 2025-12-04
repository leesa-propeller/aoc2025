import fs from 'node:fs';
import { getAdjacentPositions } from './utils';

let grid: string[][];
let rowLength = 0;
let colLength = 0;
let totalSum = 0;

export const readFile = (path: string) => {
    const input = fs.readFileSync(path, 'utf8').split('\n');
    grid = input.map((line) => line.split(""));
    rowLength = grid.length;
    colLength = grid[0].length; 
}

const runAlgo = () => {
    let removed = 0;
    
    for (let row = 0; row < rowLength; row++) {
        for (let col = 0; col < colLength; col++) {
            if (grid[row][col] === '@') {
                const validCells = getAdjacentPositions(row, col, rowLength, colLength)
                const tpRolls = validCells.reduce((acc, curr) => {
                    if (grid[curr[0]][curr[1]] === '@') return acc + 1;
                    return acc;
                }, 0)

                if (tpRolls < 4) {
                    totalSum++;
                    removed++;

                    // update the grid as well 
                    grid[row][col] = '.';
                }
            }

        }
    }

    return removed;
}

const dayFourB = () => {
    // start with a positive just to kick things off
    let removed = 1;
    while (removed > 0) {
        removed = runAlgo();
    }
}

readFile('day4.txt');
dayFourB();
console.log(totalSum)