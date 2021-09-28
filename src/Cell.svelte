<script>
    import { renderable } from "./game.js";
    import { iterate } from "./logic.js";
    import { Coord } from "./helpers.js";
    import { containsCoord } from "./math.js";

    const speed = 10;
    const iterationTime = 100;
    const side = 20;
    
    let activeCells = [];
    let isPlaying = false;
    let mouseDown = false;
    let mousePosition = [];

    var clock = 0;

    renderable(props => {
        const { context, canvas } = props;
        if (isPlaying) {
            clock += speed;
            if ((clock % iterationTime) == 0) {
                clock = 0;
                activeCells = iterate(activeCells);
            }
        }

        if (mouseDown) {
            mouseDown = false;
            const rect = canvas.getBoundingClientRect();
            const x = Math.floor((mousePosition[0] - rect.left) / side);
            const y = Math.floor((mousePosition[1] - rect.top) / side);
            
            const containsCell = containsCoord(activeCells, { x: x, y: y });

            console.log("Contains? " + containsCell);
            if (containsCell) {
                console.log('Deactivating cell:' + x + ', ' + y);
                activeCells = activeCells.filter(cell => !(cell.x == x && cell.y == y));
            } else {
                console.log('Activating new cell:' + x + ', ' + y);
                activeCells = activeCells.concat(new Coord(x, y));
            }
        }

        
        activeCells.forEach(cell => {
            console.log("Printing cell");
            context.beginPath();
            context.fillStyle = 'white';
            context.fillRect(cell.x * side, cell.y * side, side, side);
            context.closePath();
        })
    });

    function setMousePosition({ clientX, clientY }) {
        mousePosition = [clientX, clientY];
    }

    function handleMouseDown(ev) {
        setMousePosition(ev);
        mouseDown = true;
    }

    function handleKeyboard(ev) {
        const code = ev.code;

        if (code == 'Space') {
            isPlaying = !isPlaying;
            console.log('isPlaying: ' + isPlaying)
        }
    }

</script>

<svelte:window 
    on:mousedown={handleMouseDown}
    on:keydown={handleKeyboard} />

<slot></slot>