// Initialize the visited matrix
const VISITING = 1
const UNVISITED = 0

function initialize_visited(row_count, col_count) {
	var visited = new Array(row_count)
	for (let i = 0; i < row_count; i++) {
		visited[i] = new Array(col_count).fill(0)
	}
	return visited
}

// Shuffles an array
function shuffle(a) {
    var j, x, i;
    for (let i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// Gets all the walls for visualization
function get_walls(walls) {
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

function backtrack(start_i, start_j, end_i, end_j, v) {
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

function manhattan(x1, x2, y1, y2) {
    return Math.abs(x1-x2) + Math.abs(y1-y2)
}

export {manhattan, backtrack, initialize_visited, shuffle, get_walls, VISITING, UNVISITED}
