import {nodeType, Node} from '../types'
import { get_walls, copyNode, initialize_visited, initNode, initNodeGraph } from '../helpers';

/**
 * Find new edge from current position
 * 
 */
function _findNewEdge(graph: Node[][], cur: Node): Node | undefined {
    let xdir: number[] = [-2, 2, 0, 0];
    let ydir: number[] = [0, 0, -2, 2];
    let newr: number, newc: number;
    let candidates: Node[] = []
    for (let i = 0; i < 4; i++) {
        newr = cur.row + xdir[i];
        newc = cur.col + ydir[i];
        if (newr > 0 && newr < graph.length && newc > 0 && newc < graph[0].length && graph[newr][newc].type === nodeType.UNVISITED) {
            candidates.push(graph[newr][newc]);
        }
    }
    if (candidates.length === 0) {
        return undefined
    }
    return candidates[Math.floor(Math.random() * candidates.length)]
}

/**
 * Create a maze using prim's mst algorithm
 * @returns 
 */
export default function random_prims(): Node[] {
    let graph: Node[][] = initNodeGraph(30, 50); 
    
    for (let i = 0; i < 29; i++) {
        for (let j = 0; j < 49; j++) {
            if (j % 2 == 1 && i % 2 == 1) {
                graph[i][j].type = nodeType.UNVISITED;
            } else {
                graph[i][j].type = nodeType.VISITED;
            }
        }
    }

    // TODO: randomize the starting value
    let edge: Node[] = [] // keeps track of the edge nodes
    let maze: Node[] = []
    let out: Node, newEdge: Node | undefined; 
    let r = 2 * Math.floor(Math.random() * Math.floor(29/2)) + 1
    let c = 2 * Math.floor(Math.random() * Math.floor(49/2)) + 1
    let pos: number;
    edge.push(graph[r][c]);
    maze.push(copyNode(graph[r][c]));
    graph[r][c].type = nodeType.VISITED;

    // we actually need to grab a random value from the array 
    while (edge.length > 0) {
        pos = Math.floor(Math.random() * edge.length);
        out = edge[pos];
        newEdge = _findNewEdge(graph, out);
        console.log(edge.length, newEdge);
        if (newEdge === undefined) {
            edge.splice(pos, 1);
        } else {
            newEdge.type = nodeType.VISITED;
            edge.push(newEdge);
            r = (out.row + newEdge.row) / 2;
            c = (out.col + newEdge.col) / 2;
            maze.push(initNode(r, c, nodeType.UNVISITED, undefined, maze.length * 10));
            maze.push(initNode(newEdge.row, newEdge.col, nodeType.UNVISITED, undefined, maze.length * 10));
        }
    }
    return maze; 
}
