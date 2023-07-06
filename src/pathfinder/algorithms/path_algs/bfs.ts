import {IDIRECTION, JDIRECTION } from '../helpers'
import '../../setup/global'
import { nodeType, Node, nodeMap } from './types'

// TODO: helper for creating a specific type of Node, i.e. a makeNode() function

export default function bfs (start: [number,number], end: [number,number], graph: Node[][]): Node[] {
	console.log("Creating backtrack arr")
	let backtrack: Node [][] = [];
	for (let i = 0; i < 30; i++) {
		let tempArr: Node [] = [];
		for (let j = 0; j < 50; j++) {
			let tempNode: Node = {
				row: i,
				col: j,
				type: nodeType.UNVISITED
			}
			tempArr.push(tempNode);
		}
		backtrack.push(tempArr);
	}


	let startNode: Node = graph[start[0]][start[1]];
	////////////////////////
	let q: Node[] = [];
	let updateOrder: Node[] = [];
	let out: Node; 
	let newrow: number, newcol: number;

	q.push(startNode) 
	while (q.length) {
		
		out = q.shift()!;
		if (out.row === end[0] && out.col === end[1]) {
			graph[out.row][out.col].type = nodeType.END;
			break;
		}
		updateOrder.push(out);
		for (let i = 0; i < IDIRECTION.length; i++) {
			newrow = out.row + IDIRECTION[i];
			newcol = out.col + JDIRECTION[i];
			if (graph[newrow][newcol].type === nodeType.UNVISITED || graph[newrow][newcol].type === nodeType.END) {
				graph[newrow][newcol].type = nodeType.VISITED;
				q.push(graph[newrow][newcol])
				backtrack[newrow][newcol].row = out.row;
				backtrack[newrow][newcol].col = out.col;
			}
		}

	}
	console.log("Starting backtrack")
	// Note: current design is that the last index of the return array contains the track for backtracking which is very bad design;
	let count: number =0;
	out = graph[end[0]][end[1]];
	out = backtrack[out.row][out.col];
	console.log("Checking type: ", out)
	while (true) {
		if (out.row == start[0] && out.col == start[1]) {break;}
		graph[out.row][out.col].type = nodeType.BACKTRACK;
		updateOrder.push(out);
		out = backtrack[out.row][out.col];
		count++;
		if (count >= 1000) {break;}
		
	}
	graph[end[0]][end[1]].type = nodeType.END;
	console.log("Checking type: ", out)
	console.log("Finishing backtrack")

	// TODO: Maybe I do need a visit order 

	return updateOrder

}
