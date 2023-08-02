import { backtrack, initialize_visited, cmp, VISITING, UNVISITED, IDIRECTION, JDIRECTION } from '../algorithms/helpers'
import '../../setup/global'
var heapq = require('heapq')


export default function dijkstra(start_i, start_j, end_i, end_j, walls) {

    let row_count = global.rc
    let col_count = global.cc
    let weight = 1 // TODO: this can change later
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

		// TODO: Do I need to do a distance check before replacing for squares of different weights?
        visited[out_i][out_j] = out.prev
        // appending in each direction
		if (out_i === end_i && out_j === end_j) {
			return_vals.push(backtrack(start_i, start_j, end_i, end_j, visited))
			break;
		}

		for (let k = 0; k < IDIRECTION.length; k++) {
			new_out_i = out_i + IDIRECTION[k]
			new_out_j = out_j + JDIRECTION[k]
			if (new_out_i >= 0 && new_out_i < row_count && new_out_j >= 0 && new_out_j < col_count) {
				if (visited[new_out_i][new_out_j] == UNVISITED) {
					distance = out.count + weight // 10 for uniform cost
					heapq.push(q, [distance, {coord:[new_out_i, new_out_j], count: out.count+1, prev:out.coord}], cmp)
					visited [new_out_i][new_out_j] = VISITING // to mark the node as in the process of being visited
				}
			}
		}
	}
	return return_vals


}
