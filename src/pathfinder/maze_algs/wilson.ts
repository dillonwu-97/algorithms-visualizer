import { XDIR, YDIR, shuffle, initialize_visited, get_walls, copyNode, initNode, initNodeGraph } from '../helpers'
import {nodeType, Node} from '../types'

/*
Choose any vertex at random and add it to the UST (Uniform spanning tree)
Select any vertex that is not already in the UST and perform a random walk until you encounter a vertex that is in the UST.
Add the vertices and edges touched in the random walk to the UST.
Repeat 2 and 3 until all vertices have been added to the UST.
*/

function _inGrid(r: number, c: number): boolean {
    return (r < 1 || r >= 29 || c < 1 || c >= 49) ? false : true;
}

/**
 * Pick a random location to visit, which is not the previous location
 */
function _findNewEdge(graph: Node[][], curVal: Node, prevVal: Node): Node {
    // Corner case 1: 2 directions
    // TODO: Maybe add another classification to the class that denotes if some node is a corner or not? side, corner, space
    let validPositions: Node[] = [];
    let newr: number, newc: number;
    for (let i = 0; i < 4; i++) {
        newr = curVal.row + XDIR[i];
        newc = curVal.col + YDIR[i];
        if (_inGrid(newr, newc)) {
            validPositions.push(graph[newr][newc]);
        }
    }
    validPositions = shuffle(validPositions);
    return validPositions[0] === prevVal ? validPositions[1] : validPositions[0];
}

function _dfs(graph: Node[][], ret: Node[], curVal: Node, prevVal: Node) {
    if (curVal.type === nodeType.VISITED) {
        return; 
    }
    curVal.type = nodeType.VISITED;
    console.log("curVal is: ", curVal)
    let nextVal: Node = _findNewEdge(graph, curVal, prevVal);
    _dfs(graph, ret, nextVal, curVal);
    curVal.tdelay = 100 * ret.length;

    let r: number = (curVal.row + prevVal.row) / 2;
    let c: number = (curVal.col + prevVal.col) / 2;

    ret.push(initNode(curVal.row, curVal.col, nodeType.UNVISITED, undefined, ret.length * 10));
    ret.push(initNode(r, c, nodeType.UNVISITED, undefined, ret.length * 10));
}

function _isSealed(graph: Node[][], n: Node): boolean {
    let newr: number, newc: number;
    for (let i = 0; i < 4; i++) {
        newr = n.row + XDIR[i];
        newc = n.col + YDIR[i];
        if (_inGrid(newr, newc) && graph[newr][newc].type === nodeType.UNVISITED) {
            return false;
        }
    }
    return true;
}

/**
 * 
 * @returns 
 */
export default function wilson(rowSize: number, colSize: number): Node[] {
    let graph: Node[][] = initNodeGraph(30, 50);
    
    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < colSize; j++) {
            if (i % 2 === 1 && j % 2 === 1) {
                graph[i][j].type = nodeType.UNVISITED;
            } else {
                graph[i][j].type = nodeType.WALL;
            }
        }
    }   

    let ret: Node[] = [];
    let openEdges: Node[] = [];
    let startRow: number, startCol: number;
    let out: Node, prev: Node; 
    // Get a random value and add to openEdges
    startRow = 2 * Math.floor(Math.random() * Math.floor(rowSize/2)) + 1;
    startCol = 2 * Math.floor(Math.random() * Math.floor(colSize/2)) + 1;
    openEdges.push(graph[startRow][startCol]);
    let count = 0;

    while (openEdges.length > 0) {
        if (count === 1000) {
            break;
        } else {
            count++;
        }
        prev = openEdges[Math.floor(Math.random() * openEdges.length)];
        prev.type = nodeType.VISITED;
        out = _findNewEdge(graph, prev, graph[0][0]); 
        _dfs(graph, ret, out, prev); 
        ret.push(initNode(prev.row, prev.col, nodeType.UNVISITED, undefined, ret.length * 10));

        // TODO: this seems somewhat inefficient but whatever
        openEdges = []
        for (let i = 0; i < ret.length; i++) {
            if (! _isSealed(graph, ret[i])) {
                openEdges.push(copyNode(ret[i]));
            }
        }
        console.log("open edges: ")
        console.log(openEdges);
        // Add to closedEdges
    }

    return ret;
}