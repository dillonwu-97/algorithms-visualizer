import { manhattan, backtrack, initialize_visited, cmp, IDIRECTION, JDIRECTION, UNVISITED, VISITING } from '../algorithms/helpers'
var heapq = require('heapq')


export default function astar(start_i, start_j, end_i, end_j, walls) {

    let row_count = global.rc
    let col_count = global.cc
	let q = []
	let new_out_i, new_out_j

	// visited tracks the best previous node
	// min_graph tracks the lowest value to a node
	// in_heap tracks the distance??
    let visited = initialize_visited(row_count, col_count)
	let min_graph = initialize_visited(row_count, col_count) // min graph is used to store the lowest value to a node
	let in_heap = initialize_visited(row_count, col_count) // what is this used for?
	heapq.push(q, [0, {coord: [start_i, start_j], count: 0, prev: [start_i, start_j]}], cmp )
	let out_pre, out, distance; 
	let return_vals = []; // return the list of nodes that were visited in order

	// TODO: can combine in_heap and visited together
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
        if (visited[out_i][out_j] === 1 || min_graph[out_i][out_j] > out.count) {
            min_graph[out_i][out_j] = out.count
            visited[out_i][out_j] = out.prev
        }
		
		if (out_i === end_i && out_j === end_j) {
			return_vals.push(backtrack(start_i, start_j, end_i, end_j, visited))
			break;
		}

		for (let k = 0; k < IDIRECTION.length; k++) {
			new_out_i = out_i + IDIRECTION[k]
			new_out_j = out_j + JDIRECTION[k]
			if (new_out_i >= 0 && new_out_i < row_count && new_out_j >= 0 && new_out_j < col_count) {
				distance = out.count + (manhattan(end_i, new_out_i, end_j, new_out_j))
				if (visited[new_out_i][new_out_j] == UNVISITED) {
					heapq.push(q, [distance, {coord:[new_out_i, new_out_j], count: out.count+1, prev:out.coord}], cmp)
					visited [new_out_i][new_out_j] = 1 // to mark the node as in the process of being visited
					in_heap [new_out_i][new_out_j] = distance;
				} else if (distance < in_heap[new_out_i] [new_out_j]) {
					in_heap [new_out_i][new_out_j] = distance
					heapq.push(q, [distance, {coord:[new_out_i, new_out_j], count: out.count+1, prev:out.coord}], cmp)
				}
			}
		}
	}
	return return_vals
}