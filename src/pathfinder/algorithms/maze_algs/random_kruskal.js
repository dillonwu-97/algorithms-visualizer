import '../../setup/global'
import { get_walls, shuffle, initialize_visited } from '../helpers'
var disjointSet = require('disjoint-set')

/*
Create a list of all walls, and create a set for each cell, each containing just that one cell.
For each wall, in some random order:
If the cells divided by this wall belong to distinct sets:
Remove the current wall.
Join the sets of the formerly divided cells.
*/
export default function random_kruskal() {
    // create setup to check adjacencies
    let set = disjointSet()
    let visited = initialize_visited(global.rc, global.cc);
    let walls = initialize_visited(global.rc, global.cc)
    let x, y
    // randomize array
    let points = [], maze = []
    for (let i = 1; i < global.rc-1; i++) {
        for (let j = 1; j < global.cc-1; j++) {
            if (j % 2 === 1 && i % 2 === 1) {
                // need to connect all of the spaces
                visited[i][j] = {"i":i, "j":j}
                set.add(visited[i][j])
            } else {
                walls[i][j] = 1
                points.push([i,j]) // build min spanning tree using these points
            }
        }
    }
    for (let i = 0; i < global.cc; i++) {
        walls[0][i] = 1
        walls[global.rc-1][i] = 1
    }
    for (let i = 0; i < global.rc; i++) {
        walls[i][0] = 1
        walls[i][global.cc-1] = 1
    }
    points = shuffle(points)

    let out_l, out_r
    // disjoint set is now randomized and they are all walls
    for (let i = 0; i < points.length; i ++) {
        x = points[i][0]
        y = points[i][1]
        if (walls[x+1][y] === 0 && walls[x-1][y] === 0){
            out_l = visited[x+1][y]
            out_r = visited[x-1][y]
            if (!set.connected(out_l, out_r)) {
                walls[x][y] = 0
                set.union(out_l, out_r)
                maze.push([x+1,y], [x,y], [x-1,y])
            }
        } else if (walls[x][y+1] === 0 && walls[x][y-1] === 0) {
            out_l = visited[x][y+1]
            out_r = visited[x][y-1]
            if (!set.connected(out_l, out_r)) {
                walls[x][y] = 0
                set.union(out_l, out_r)
                maze.push([x,y+1], [x,y],[x,y-1])
            }
        }
    }
    
    let ret_walls = get_walls(walls)

    return {"maze": maze, "walls": ret_walls}
    
}