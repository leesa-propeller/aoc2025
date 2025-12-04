export const getAdjacentPositions = (row: number, col: number) => 
    [
        [row-1, col-1], // top left
        [row-1, col], // top
        [row-1, col+1], // top right
        [row, col-1], // left
        [row, col+1], // right
        [row+1, col-1], // bottom left
        [row+1, col], // bottom 
        [row+1, col+1] // bottom right
    ]

export const removeInvalidCells = (positions: number[][], rowLength: number, colLength: number) => {
    return positions.map(([x, y]) => {
        if (x < 0 || x === rowLength) return null;
        if (y < 0 || y === colLength) return null;
        return [x,y]
    }).filter((pos) => pos !== null)
}
