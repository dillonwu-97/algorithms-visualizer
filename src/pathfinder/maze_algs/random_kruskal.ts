import { get_walls, shuffle, copyNode, initialize_visited, initNode, initNodeGraph } from '../helpers'
import { nodeType, Node } from '../types'

// TODO: probably can get rid of disjoint set with arrays 
var disjointSet = require('disjoint-set')
export default function random_kruskal(): Node[] {
    // create setup to check adjacencies
    let set = disjointSet();
    let graph: Node[][] = initNodeGraph(30, 50);
    let ret: Node[] = [];
    let points: Node[] = []; // points are used to build the minimum spanning tree
    // TODO: Replace this with not hardcoded values
    // TODO: Replace this with some helper function like create set? 
    for (let i = 1; i < 29; i++) {
        for (let j = 1; j < 49; j++) {
            if (j % 2 == 1 && i % 2 == 1) {
                graph[i][j].type = nodeType.UNVISITED;
                set.add(graph[i][j]);
            } else {
                graph[i][j].type = nodeType.WALL;
                points.push(graph[i][j]);
            }
        }
    }
    console.log(points.length)
    points = shuffle(points)
    console.log(points.length)
    
    let r: number;
    let c: number;
    let adjOne: Node = initNode(0,0,nodeType.WALL);
    let adjTwo: Node = initNode(0,0,nodeType.WALL);
    let flag: boolean = false;
    for (let i = 0; i < points.length; i++) {
        r = points[i].row;
        c = points[i].col;
        flag = false;
        if (graph[r+1][c].type === nodeType.UNVISITED && graph[r-1][c].type === nodeType.UNVISITED) {
            flag = true;
            adjOne = graph[r+1][c];
            adjTwo = graph[r-1][c];
        } else if (graph[r][c+1].type === nodeType.UNVISITED && graph[r][c-1].type === nodeType.UNVISITED) {
            flag = true;
            adjOne = graph[r][c+1];
            adjTwo = graph[r][c-1];
        }



        // is the order changing upon returning?
        if (flag == true && !set.connected(adjOne, adjTwo)) {
            graph[r][c].type = nodeType.UNVISITED;
            set.union(adjOne, adjTwo);
            ret.push(copyNode(adjOne), copyNode(graph[r][c]), copyNode(adjTwo));
        }   
    }

    for (let i = ret.length -1; i >= 0; i--) {
        ret[i].tdelay = Math.floor(i / 3) * 10;
        ret[i].type = nodeType.UNVISITED;
    }
    return ret;
    
}