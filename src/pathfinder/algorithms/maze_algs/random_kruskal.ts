import '../../setup/global'
import { get_walls, shuffle, copyNode, initialize_visited, initNode, initNodeGraph } from '../helpers'
import { nodeType, Node } from '../../algorithms/path_algs/types'

var disjointSet = require('disjoint-set')

/*
Create a list of all walls, and create a set for each cell, each containing just that one cell.
For each wall, in some random order:
If the cells divided by this wall belong to distinct sets:
Remove the current wall.
Join the sets of the formerly divided cells.
*/
export default function random_kruskal(): Node[] {
    // create setup to check adjacencies
    let set = disjointSet();
    let graph: Node[][] = initNodeGraph(30, 50);
    let ret: Node[] = [];
    let points: Node[] = []; // points are used to build the minimum spanning tree
    // TODO: Replace this with not hardcoded values
    for (let i = 1; i < 29; i++) {
        for (let j = 1; j < 49; j++) {
            if (j % 2 == 1 && i % 2 == 1) {
                graph[i][j].type = nodeType.UNVISITED;
                set.add(graph[i][j]);
            } else {
                graph[i][j].type = nodeType.WALL;
                points.push(graph[i][j]);
                ret.push(copyNode(graph[i][j]));
            }
        }
    }
    points = shuffle(points)
    
    let r: number;
    let c: number;
    let adjOne: Node = initNode(0,0,nodeType.WALL);
    let adjTwo: Node = initNode(0,0,nodeType.WALL);
    for (let i = 0; i < points.length; i++) {
        console.log(points[i])
        r = points[i].row;
        c = points[i].col;
        if (graph[r+1][c].type === nodeType.UNVISITED && graph[r-1][c].type === nodeType.UNVISITED) {
            adjOne = graph[r+1][c];
            adjTwo = graph[r-1][c];
        } else if (graph[r][c+1].type === nodeType.UNVISITED && graph[r][c-1].type === nodeType.UNVISITED) {
            adjOne = graph[r][c+1];
            adjTwo = graph[r][c-1];
        }
        if (!set.connected(adjOne, adjTwo)) {
            graph[r][c].type = nodeType.UNVISITED;
            set.union(adjOne, adjTwo);
            console.log(copyNode(adjOne))
            ret.push(copyNode(adjOne), copyNode(graph[r][c]), copyNode(adjTwo));
        }   
    }

    return ret;
    
}