import { containsCoord } from './math.js';

export class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class CoordCounter {
    constructor() {
        this.pairList = [];
        this.keys = [];
        this.count = [];
        this.add = function(coord) {
            const contains = containsCoord(this.keys, coord);
            if (contains) {
                const index = this.pairList
                    .findIndex(value => value[0].x == coord.x && value[0].y == coord.y);
                this.pairList[index][1] += 1;
                this.count[index] += 1;
                return this.pairList[index][1];
            }
            this.keys = this.keys.concat(coord);
            this.count = this.count.concat(1);
            this.pairList.push(
                [coord, 1]
            );
            return 1;
        }

        this.filter = function(evaluation) {
            return this.pairList.filter(pair => evaluation(pair)).map(pair => pair[0]);
        }
    }
}
