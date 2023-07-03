import {IDIRECTION, JDIRECTION } from '../helpers'
import '../../setup/global'
import { nodeType, Node, nodeMap } from './types'

declare global {
	var rc: any;
	var cc: any;
}

// TODO: helper for creating a specific type of Node, i.e. a makeNode() function

export default function bfs (startNode: Node, endNode: Node, wallsStr: string[]) {

	// TODO: Move this to the helpers file since this will probably be reused constantly
	console.log("Constructing visited")
	let visited: Node [][] = [];
	for (let i = 0; i < global.rc; i++) {
		let tempArr: Node [] = [];
		for (let j = 0; j < global.cc; j++) {
			let tempNode: Node = {
				row: i,
				col: j,
				type: nodeType.UNVISITED
			}
			tempArr.push(tempNode);
		}
		visited.push(tempArr);
	}
	visited[startNode.row][startNode.col] = startNode;
	visited[endNode.row][endNode.col] = endNode;

	// creating a backtrack graph
	// this stores all of the nodes that are used to visit this current node
	console.log("Creating backtrack arr")
	let backtrack: Node [][] = [];
	for (let i = 0; i < global.rc; i++) {
		let tempArr: Node [] = [];
		for (let j = 0; j < global.cc; j++) {
			let tempNode: Node = {
				row: i,
				col: j,
				type: nodeType.UNVISITED
			}
			tempArr.push(tempNode);
		}
		backtrack.push(tempArr);
	}
	

	// set the perimeter to be visited, find a way to maybe resolve this issue 
	// Building the rest of the walls 
	// TODO: Transform the string walls to regular walls
	console.log("Creating walls")
	for (let i = 0; i < global.rc; i++) {
		visited[i][0].type = nodeType.WALL;
		visited[i][global.cc-1].type = nodeType.WALL;
	}
	for (let i = 0; i < global.cc; i++) {
		visited[0][i].type = nodeType.WALL;
		visited[global.rc-1][i].type = nodeType.WALL;
	}
	for (let i = 0; i < wallsStr.length; i++) {
		let numbers = wallsStr[i].split(",").map(Number)
		visited[numbers[0]][numbers[1]].type = nodeType.WALL;
	}

	console.log(visited)

	let returnVals: nodeMap = {
		vNodes: [],
		pNodes: [],
		count: 0
	}

	////////////////////////
	let retVals: number[][] = [];
	let q: Node[] = [];
	q.push(startNode) 
	let out: Node; // Do I actually need to do this? 
	let newrow: number, newcol: number;
	console.log("Starting bfs")
	console.log(endNode, startNode, endNode.row, endNode.col)
	while (q.length) {
		
		out = q.shift()!;
		if (out == endNode) {
			console.log("Finished")
			break;
		}
		returnVals.vNodes.push(out)
		retVals.push([out.row, out.col]);
		console.log(out, out.row, out.col)
		for (let i = 0; i < IDIRECTION.length; i++) {
			newrow = out.row + IDIRECTION[i];
			newcol = out.col + JDIRECTION[i];
			if (visited[newrow][newcol].type == nodeType.UNVISITED) {
				visited[newrow][newcol].type = nodeType.VISITED;
				q.push(visited[newrow][newcol])
				backtrack[newrow][newcol].row = out.row;
				backtrack[newrow][newcol].col = out.col;
			}
		}

	}

	console.log("Creating retVals")
	// Note: current design is that the last index of the return array contains the track for backtracking which is very bad design;
	out = visited[endNode.row][endNode.col];
	console.log(out)
	while (out.row != startNode.row || out.col != startNode.col) {
		retVals.push([out.row, out.col]);
		out = backtrack[out.row][out.col];
	}
	console.log(out, startNode)

	return retVals;

}
