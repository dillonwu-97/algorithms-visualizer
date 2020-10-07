import React from 'react'
import { backtrack, initialize_visited } from './general'
import '../../setup/global'
var heapq = require('heapq')


export default function dijkstra(start_i, start_j, end_i, end_j, walls) {
    console.log(start_i, start_j)
    var cmp = function(x, y) {return x[0] < y[0];}

    let row_count = global.rc
    let col_count = global.cc
    let weight = 1 // this can change later

	let q = [] // using push and shift
	// visited, all are initialized to null 
    // console.log(start_i, start_j, end_i, end_j, row_count)
    // heapq.push(heap, [-3, {a:1, b:2}], cmp);

    let visited = initialize_visited(row_count, col_count);
	heapq.push(q, [0, {coord: [start_i, start_j], count: 0, prev: [start_i, start_j]}], cmp )
	let out_pre, out, distance; 
	let return_vals = []; // return the list of nodes that were visited in order
	while(q.length != 0) {
        out_pre = heapq.pop(q, cmp)
        out = out_pre[1]
		let out_i = out.coord[0]
		let out_j = out.coord[1]
		// console.log(walls)
		// console.log(typeof([13,25]), typeof(walls[0]))
		if (walls.includes([out_i, out_j].toString())) {
			continue;
		}
        return_vals.push([out_i, out_j])
        visited[out_i][out_j] = out.prev
        // appending in each direction

		if (out_i == end_i && out_j == end_j) {
			// console.log('astar count: ', out.count)
			return_vals.push(backtrack(start_i, start_j, end_i, end_j, visited))
			break;
		}
		// console.log(out)
		if (out_i > 0 && visited[out_i-1][out_j] == 0) {
            distance = out.count + weight // 10 for uniform cost
			heapq.push(q, [distance, {coord:[out_i-1, out_j], count: out.count+1, prev:out.coord}], cmp)
			visited [out_i-1][out_j] = 1 // to mark the node as in the process of being visited
		}
		if (out_j > 0 && visited[out_i][out_j-1] == 0) {
            distance = out.count + weight
            heapq.push(q, [distance, {coord:[out_i, out_j-1], count: out.count+1, prev:out.coord}], cmp)
			visited [out_i][out_j-1] = 1
		}
		if (out_i < row_count-1 && visited[out_i+1][out_j] == 0) {
            distance = out.count + weight
			heapq.push(q, [distance, {coord:[out_i+1, out_j], count: out.count+1, prev:out.coord}], cmp)
			visited [out_i+1][out_j] = 1
		}
		if (out_j < col_count-1 && visited[out_i][out_j+1] == 0) {
            distance = out.count + weight
			heapq.push(q, [distance, {coord:[out_i, out_j+1], count: out.count+1, prev:out.coord}], cmp)
			visited [out_i][out_j+1] = 1
		}
	}
	return return_vals // return_vals[-1] is the backtrack array; everything before that is order of traversal


}
