// Initialize the visited matrix
const VISITING: number = 1;
const UNVISITED: number = 0;
const IDIRECTION: readonly number[] = [-1, 0, 1, 0];
const JDIRECTION: readonly number[] = [0, -1, 0, 1];

/**
 * 
 * @param {number} rc - row count
 * @param {number} cc - col count
 * @returns {number[][]} a 2d arr
 */
const initialize_visited = (rc: number, cc: number): number[][] => {
    return new Array(rc).fill(0).map(() => new Array(cc).fill(0));
}

// Shuffles an array
function shuffle(a: number[]) {
    let j: number;
    for (let i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Gets all the walls for visualization
function get_walls(walls: number[][]) {
    let ret_walls = []
    for (let i = 0; i < walls.length; i++) {
        for (let j = 0; j < walls[0].length; j++) {
            if (walls[i][j] === 1) {
                ret_walls.push([i,j])
            }
        }
    }
    return ret_walls
}

function backtrack(start_i: number, start_j: number, end_i: number, end_j:number, v: number[][][]) {
	let ret = [[end_i, end_j]]
	while(end_i != start_i || end_j != start_j) {
		// console.log(end_i ,end_j)
		ret.push(v[end_i][end_j])
		let a = end_i
		let b = end_j
		end_i = v[a][b][0]
		end_j = v[a][b][1]
	}
	return ret
}

function manhattan(x1: number, x2:number, y1:number, y2:number) {
    return Math.abs(x1-x2) + Math.abs(y1-y2)
}

var cmp = function(x: number[], y: number[]) {
    return x[0] < y[0];
}

export {manhattan, backtrack, initialize_visited, shuffle, get_walls, cmp}
export {VISITING, UNVISITED, IDIRECTION, JDIRECTION}
