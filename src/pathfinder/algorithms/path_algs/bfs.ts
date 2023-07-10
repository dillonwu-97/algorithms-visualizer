import {IDIRECTION, JDIRECTION, deepCopyGraph, initNode } from '../helpers'
import '../../setup/global'
import { nodeType, Node, pathRet } from './types'

// TODO: helper for creating a specific type of Node, i.e. a makeNode() function

export default function bfs (start: [number,number], end: [number,number], stateGraph: Node[][]): pathRet {

	let ret: pathRet = {
		vNodes: [],
		bNodes: []
	}; 
	let newGrid: Node[][] = deepCopyGraph(stateGraph);
	console.log("Creating backtrack arr")
	let backtrack: Node [][] = [];
	for (let i = 0; i < 30; i++) {
		let tempArr: Node [] = [];
		for (let j = 0; j < 50; j++) {
			tempArr.push(initNode(i, j, nodeType.UNVISITED));
		}
		backtrack.push(tempArr);
	}


	let startNode: Node = newGrid[start[0]][start[1]];
	////////////////////////
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
	while (true) {
		if (out.row == start[0] && out.col == start[1]) {break;}
		newNode = initNode(out.row, out.col, nodeType.BACKTRACK);
		ret.bNodes.push(newNode);
		out = backtrack[out.row][out.col];
	}

	// TODO: Maybe I do need a visit order 

	return ret

}
