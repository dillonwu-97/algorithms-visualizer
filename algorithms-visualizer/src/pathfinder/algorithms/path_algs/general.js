import React from 'react';


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

function initialize_visited(row_count, col_count) {
	var visited = new Array(row_count)
	for (let i = 0; i < row_count; i++) {
		visited[i] = new Array(col_count).fill(0)
	}
	return visited
}

export {backtrack, initialize_visited}