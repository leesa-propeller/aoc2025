import fs from 'node:fs';

let grid: string[][]; 
let cache = new Map<string, number>();

export const readFile = (path: string) => {
    const input = fs.readFileSync(path, 'utf8');
    return input.split('\n').map((line) => line.split(''))
}

const getChildren = (pos: number[]) => {
    let [r, c] = [pos[0], pos[1]]

    while (true) {
        if (r < 0 || c < 0 || c >= grid[0].length) return [];
        else if (r >= grid.length) {
            return [];
        }
        else if (grid[r][c] === '.') {
            r++;
        }
        else if (grid[r][c] === '^') {
            return [[r, c-1], [r, c+1]];
        }
    }
}

const nPaths = (pos: number[]) => {
    const key = pos.toString();
    const cachedVal = cache.get(key);
    if (cachedVal !== undefined) return cachedVal;

    const children = getChildren(pos);
    if (children.length === 0) {
        cache.set(key, 1);
        return 1;
    }

    const numPaths = children.reduce((acc, child) => {
        return acc + nPaths(child);
    }, 0)

    cache.set(key, numPaths);
    return numPaths;
}

const daySevenB = (path: string) => {
    grid = readFile(path);

    const s = [1, grid[0].indexOf('S')]
    const sum = nPaths(s);

    console.log(sum)
}

daySevenB('input.txt')
