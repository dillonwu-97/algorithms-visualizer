import { backtrack, initialize_visited, manhattan, UNVISITED, VISITING } from '../helpers'
import '../../setup/global'
var heapq = require('heapq')


export default function greedy(start_i, start_j, end_i, end_j, walls) {

    var cmp = function(x, y) {return x[0] < y[0];}

    let row_count = global.rc
    let col_count = global.cc
	let q = []

	let visited = initialize_visited(row_count, col_count);
	heapq.push(q, [0, {coord: [start_i, start_j], count: 0, prev: [start_i, start_j]}], cmp )
	let out_pre, out, distance, new_out_i, new_out_j; 
	let return_vals = []; // return the list of nodes that were visited in order
	while(q.length != 0) {
        out_pre = heapq.pop(q, cmp)
        out = out_pre[1]
		let out_i = out.coord[0]
		let out_j = out.coord[1]
		if (walls.includes([out_i, out_j].toString())) {
			continue;
		}
		return_vals.push([out_i, out_j])
		// appending in each direction
		visited[out_i][out_j] = out.prev
		if (out_i === end_i && out_j === end_j) {
			return_vals.push(backtrack(start_i, start_j, end_i, end_j, visited))
			break;
		}

		let i_dir = [-1, 0, 1, 0]
		let j_dir = [0, -1, 0, 1]

		for (let k = 0; k < i_dir.length; k++) {
			new_out_i = out_i + i_dir[k]
			new_out_j = out_j + j_dir[k]
			if (new_out_i >= 0 && new_out_i < row_count && new_out_j >= 0 && new_out_j < col_count) {
				if (visited[new_out_i][new_out_j] == UNVISITED) {
					distance = (manhattan(end_i, new_out_i, end_j, new_out_j))
					heapq.push(q, [distance, {coord:[new_out_i, new_out_j], count: out.count+1, prev:out.coord}], cmp)
					visited [new_out_i][new_out_j] = VISITING 
				}
			}
		}
	}
	return return_vals
}