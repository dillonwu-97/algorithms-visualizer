import { backtrack, initialize_visited, IDIRECTION, JDIRECTION, UNVISITED, VISITING } from '../helpers'
import '../../setup/global'

// BFS Implementation 
export default function bfs(start_i, start_j, end_i, end_j, walls) {
	let q = [] 
	let row_count = global.rc
	let col_count = global.cc
	let visited = initialize_visited(row_count, col_count)
	q.push({coord: [start_i, start_j], count: 0, prev: [start_i, start_j]})
	let out, new_out_i, new_out_j 
	let return_vals = []

	while(q.length != 0) {
		out = q.shift()
		let out_i = out.coord[0]
		let out_j = out.coord[1]
		if (walls.includes([out_i, out_j].toString())) {
			continue;
		}
		return_vals.push([out_i, out_j])
		visited[out_i][out_j] = out.prev
		if (out_i === end_i && out_j === end_j) {
			return_vals.push(backtrack(start_i, start_j, end_i, end_j, visited))
			break
		}

		for (let k = 0; k < IDIRECTION.length; k++) {
			new_out_i = out_i + IDIRECTION[k]
			new_out_j = out_j + JDIRECTION[k]
			if (new_out_i >= 0 && new_out_i < row_count && new_out_j >= 0 && new_out_j < col_count) {
				if (visited[new_out_i][new_out_j] == UNVISITED) {
					q.push({coord:[new_out_i, new_out_j], count: out.count+1, prev:out.coord})
					visited[new_out_i][new_out_j] = VISITING
				}
			}
		}
	}
	return return_vals


}
