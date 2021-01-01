import React from 'react';
import { backtrack, initialize_visited } from './general'
import '../../setup/global'

// TODO: Improve so that it has wall detection
// TODO: Improve so that it can detect errors


// takes in some start and end location
// takes in the row and column size of the grid
export default function dfs(start_i, start_j, end_i, end_j, walls) {
	let q = [] // using push and shift
	let row_count = global.rc
	let col_count = global.cc
	// visited, all are initialized to null 
	// console.log(start_i, start_j, end_i, end_j, row_count)
	let visited = initialize_visited(row_count, col_count);
	q.push({coord: [start_i, start_j], count: 0, prev: [start_i, start_j]})
	let out; 
	let return_vals = []; // return the list of nodes that were visited in order
	while(q.length != 0) {
		out = q.pop()
		let out_i = out.coord[0]
		let out_j = out.coord[1]
		// console.log(walls)
		// console.log(typeof([13,25]), typeof(walls[0]))
		if (walls.includes([out_i, out_j].toString())) {
			continue;
		}
		if (visited[out_i][out_j] != 0) {
			continue;
		}
		return_vals.push([out_i, out_j])
		// appending in each direction
		visited[out_i][out_j] = out.prev
		if (out_i === end_i && out_j === end_j) {
			// console.log('ended')
			return_vals.push(backtrack(start_i, start_j, end_i, end_j, visited))
			break;
		}
		// console.log(out_i, out_j, out_i, out_j+1, out_i-1, out_j, out_i, out_j-1, out_i+1,)
		if (out_i < row_count-1 && visited[out_i+1][out_j] === 0) {
			q.push({coord:[out_i+1, out_j], count: out.count+1, prev:out.coord})
			// visited [out_i+1][out_j] = 1
		}
		if (out_j > 0 && visited[out_i][out_j-1] === 0) {
			q.push({coord:[out_i, out_j-1], count: out.count+1, prev:out.coord})
			// visited [out_i][out_j-1] = 1
		}
		if (out_i > 0 && visited[out_i-1][out_j] === 0) {
			q.push({coord:[out_i-1, out_j], count: out.count+1, prev:out.coord})
			// visited [out_i-1][out_j] = 1 // to mark the node as in the process of being visited
		}
		if (out_j < col_count-1 && visited[out_i][out_j+1] === 0) {
			q.push({coord:[out_i, out_j+1], count: out.count+1, prev:out.coord})
			// visited [out_i][out_j+1] = 1
		}
	}
	return return_vals // return_vals[-1] is the backtrack array; everything before that is order of traversal


}
