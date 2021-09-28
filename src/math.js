
 export function calculateCanvasCoordinates(canvas, gameState, x, y) {
    const side = canvas.width / gameState.viewportWidth;
    return {
        x: (x - gameState.viewportX) * side,
        y: (gameState.viewportY - y) * side
    }
}

export function containsCoord(map, value) {
    return map.filter(v => v.x == value.x && v.y == value.y).length != 0;
}