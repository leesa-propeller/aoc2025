import fs from 'node:fs';
import { getAdjacentPositions } from './utils';

export const readFile = (path: string) => {
    const input = fs.readFileSync(path, 'utf8').split('\n');
    const grid = input.map((line) => line.split(""));
    return grid;
}

const dayFourA = (path: string) => {
    const grid = readFile(path);
    const rowLength = grid.length;
    const colLength = grid[0].length;
    let sum = 0;
    
    for (let row = 0; row < grid[0].length; row++) {
        for (let col = 0; col < grid.length; col++) {
            if (grid[row][col] === '@') {
                const validCells = getAdjacentPositions(row, col, rowLength, colLength)
                const tpRolls = validCells.reduce((acc, [i, j]) => {
                    if (grid[i][j] === '@') return acc + 1;
                    return acc;
                }, 0)
                if (tpRolls < 4) sum++;
            }

        }
    }

    return sum;
}

console.log(dayFourA('day4.txt'))
