import {IDIRECTION, JDIRECTION, deepCopyGraph, initNode, initBacktrack } from '../helpers'
import { nodeType, Node, pathRet } from '../types'

export default function bfs (start: [number,number], end: [number,number], stateGraph: Node[][]): pathRet {

	let ret: pathRet = {
		vNodes: [],
		bNodes: []
	}; 
	let newGrid: Node[][] = deepCopyGraph(stateGraph);
	let backtrack: Node[][] = initBacktrack(30, 50);


	let startNode: Node = newGrid[start[0]][start[1]];
	let q: Node[] = [];
	let out: Node; 
	let newrow: number, newcol: number;

	q.push(startNode) 
	while (q.length) {
		
		out = q.shift()!;
		if (out.row === end[0] && out.col === end[1]) {
			newGrid[out.row][out.col].type = nodeType.END;
			break;
		}
		ret.vNodes.push(out);
		for (let i = 0; i < IDIRECTION.length; i++) {
			newrow = out.row + IDIRECTION[i];
			newcol = out.col + JDIRECTION[i];
			if (newGrid[newrow][newcol].type === nodeType.UNVISITED || newGrid[newrow][newcol].type === nodeType.END) {
				newGrid[newrow][newcol].type = nodeType.VISITED;
				q.push(newGrid[newrow][newcol])
				backtrack[newrow][newcol].row = out.row;
				backtrack[newrow][newcol].col = out.col;
			}
		}

	}
	out = backtrack[end[0]][end[1]];
	let newNode: Node; 
	console.log("Populating backtrack array")
	while (true) {
		if (out.row == start[0] && out.col == start[1]) {break;}
		newNode = initNode(out.row, out.col, nodeType.BACKTRACK);
		ret.bNodes.push(newNode);
		out = backtrack[out.row][out.col];
	}

	return ret

}
