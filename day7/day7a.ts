import fs from 'node:fs';

let grid: string[][]; 
let sum = 0;

export const readFile = (path: string) => {
    const input = fs.readFileSync(path, 'utf8');
    return input.split('\n').map((line) => line.split(''))
}

const getChildren = (pos: number[]) => {
    let [r, c] = [pos[0], pos[1]]

    while (true) {
        if (r < 0 || c < 0) return [];
        else if (r >= grid.length || c >= grid[0].length) return [];
    
        else if (grid[r][c] === '.') {
            grid[r][c] = '|'
            r++;
        }
        else if (grid[r][c] === '^') {
            sum++;
            return [[r, c-1], [r, c+1]];
        }
        else if (grid[r][c] === '|') {
            return [];
        }
    }
}

const daySevenA = (path: string) => {
    grid = readFile(path);

    let seen: number[][] = [[-1,-1]]
    const s = [1, grid[0].indexOf('S')]
    let stack = [s];

    while (stack.length > 0) {
        const startPos = stack[0];
        seen.push(startPos)
        const toSearch = getChildren(startPos); 
        const toAdd = toSearch.filter((pos) => {
            return !stack.some(([r, c]) => r === pos[0] && c === pos[1]) 
        })
        stack = [...stack.slice(1), ...toAdd]
    }

    console.log(sum)
}

daySevenA('sample.txt')
