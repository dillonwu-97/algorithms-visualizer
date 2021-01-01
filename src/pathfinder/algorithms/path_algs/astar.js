import React from 'react'
import { backtrack, initialize_visited } from './general'
import '../../setup/global'
var heapq = require('heapq')


export default function astar(start_i, start_j, end_i, end_j, walls) {

    var cmp = function(x, y) {
		// console.log(x[0], y[0])
		return x[0] < y[0];
	}

    let row_count = global.rc
    let col_count = global.cc

	let q = [] // using push and shift
	// visited, all are initialized to null 
    // console.log(start_i, start_j, end_i, end_j, row_count)
    // heapq.push(heap, [-3, {a:1, b:2}], cmp);

    let visited = initialize_visited(row_count, col_count);
	let min_graph = initialize_visited(row_count, col_count)
	let in_heap = initialize_visited(row_count, col_count);
	heapq.push(q, [0, {coord: [start_i, start_j], count: 0, prev: [start_i, start_j]}], cmp )
	let out_pre, out, distance; 
	let return_vals = []; // return the list of nodes that were visited in order

	// TODO: the issue is that nodes that are being visited from suboptimal squares. as a result, we are not going from the best square
	while(q.length != 0) {
		out_pre = heapq.pop(q, cmp)
		// console.log("distance ", out_pre[0])
        out = out_pre[1]
		let out_i = out.coord[0]
		let out_j = out.coord[1]
		in_heap[out_i][out_j] --;
		// console.log(walls)
		// console.log(typeof([13,25]), typeof(walls[0]))
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
			// console.log(min_graph)
			console.log('astar count: ', out.count)
			return_vals.push(backtrack(start_i, start_j, end_i, end_j, visited))
			break;
		}
		// console.log(out)
		if (out_i > 0) {
			distance = out.count + (manhattan(end_i, out_i-1, end_j, out_j)) 
			if(visited[out_i-1][out_j] === 0) {
				heapq.push(q, [distance, {coord:[out_i-1, out_j], count: out.count+1, prev:out.coord}], cmp)
				visited [out_i-1][out_j] = 1 // to mark the node as in the process of being visited
				in_heap [out_i-1][out_j] = distance;
			} else if (distance < in_heap [out_i-1][out_j] ){
				in_heap [out_i-1][out_j] = distance;
				heapq.push(q, [distance, {coord:[out_i-1, out_j], count: out.count+1, prev:out.coord}], cmp)
			}
		}
		if (out_j > 0){
			distance = out.count + (manhattan(end_i, out_i, end_j, out_j-1))
			if (visited[out_i][out_j-1] === 0) {
				heapq.push(q, [distance, {coord:[out_i, out_j-1], count: out.count+1, prev:out.coord}], cmp)
				visited [out_i][out_j-1] = 1
				in_heap [out_i][out_j-1]=distance;
			} else if (distance < in_heap [out_i][out_j-1]) {
				in_heap [out_i][out_j-1] = distance;
				heapq.push(q, [distance, {coord:[out_i, out_j-1], count: out.count+1, prev:out.coord}], cmp)
			}
		}
		if (out_i < row_count-1) {
			distance = out.count + (manhattan(end_i, out_i+1, end_j, out_j))
			if (visited[out_i+1][out_j] === 0) {
				heapq.push(q, [distance, {coord:[out_i+1, out_j], count: out.count+1, prev:out.coord}], cmp)
				visited [out_i+1][out_j] = 1
				in_heap [out_i+1][out_j]=distance;
			} else if (distance < in_heap [out_i+1][out_j]) {
				in_heap [out_i+1][out_j]=distance;
				heapq.push(q, [distance, {coord:[out_i+1, out_j], count: out.count+1, prev:out.coord}], cmp)
			}
		}
		if (out_j < col_count-1) {
			distance = out.count + (manhattan(end_i, out_i, end_j, out_j+1))
			if (visited[out_i][out_j+1] === 0) {
				heapq.push(q, [distance, {coord:[out_i, out_j+1], count: out.count+1, prev:out.coord}], cmp)
				visited [out_i][out_j+1] = 1
				in_heap [out_i][out_j+1]=distance;
			} else if (distance < in_heap [out_i][out_j+1]) {
				in_heap [out_i][out_j+1]=distance;
				heapq.push(q, [distance, {coord:[out_i, out_j+1], count: out.count+1, prev:out.coord}], cmp)
			}
		}
	}
	return return_vals // return_vals[-1] is the backtrack array; everything before that is order of traversal


}

function manhattan(x1, x2, y1, y2) {
    return Math.abs(x1-x2) + Math.abs(y1-y2)
}