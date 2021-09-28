import { Coord, CoordCounter } from "./helpers.js";
import { containsCoord } from "./math.js";

export function iterate(activeCells) {
    let newActiveCells = Object.assign({}, activeCells);

    // Death Rule
    const dyingCells = activeCells.filter(cell => {
        const neighbors = getNeighbors(cell.x, cell.y);
        const aliveNeighborsCount = neighbors.filter(neighbor => containsCoord(activeCells, neighbor)).length;
        return aliveNeighborsCount < 2 || aliveNeighborsCount > 3;
    });
    // From existing active cellls, all dead cells are filtered out
    newActiveCells = activeCells.filter(activeCell => dyingCells.findIndex(c => c.x == activeCell.x && c.y == activeCell.y) == -1);

    // _______________________

    // Birth Rule
    const coordCounter = new CoordCounter();
    activeCells.forEach(cell => {
        getNeighbors(cell.x, cell.y)
            .filter(neighbor => !containsCoord(activeCells, neighbor))
            .forEach(deadNeighbor => coordCounter.add(deadNeighbor));
    });
    // Filter dead cells with exact 3 alive neighbors
    const newbornCells = coordCounter.filter(pair => pair[1] == 3);
    // Add newborn cells to active cells list
    newActiveCells = newActiveCells.concat(newbornCells);

    return newActiveCells;
}

function getNeighbors(x, y) {
    return [
        new Coord(x + 1, y + 1),
        new Coord(x - 1, y - 1),
        new Coord(x + 1, y - 1),
        new Coord(x - 1, y + 1),
        new Coord(x + 1, y),
        new Coord(x - 1, y),
        new Coord(x, y - 1),
        new Coord(x, y + 1)
    ]
}
