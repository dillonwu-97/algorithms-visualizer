import React from 'react'
import '../../setup/global'

// global.rc = 19
// global.cc = 19
// random_prims()
/*
Start with a grid full of walls.
Pick a cell, mark it as part of the maze. Add the walls of the cell to the wall list.
While there are walls in the list:
Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then:
Make the wall a passage and mark the unvisited cell as part of the maze.
Add the neighboring walls of the cell to the wall list.
Remove the wall from the list.
*/
export default function random_prims() {
    // create setup to check adjacencies
    let visited = initialize_visited(global.rc, global.cc);
    let walls = initialize_visited(global.rc, global.cc)

    // randomize array
    let maze = []
    for (let i = 1; i < global.rc-1; i++) {
        for (let j = 1; j < global.cc-1; j++) {
            if (j % 2 === 1 && i % 2 === 1) {
                walls[i][j] = 0
            } else {
                walls[i][j] = 1
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
    
    // picking a random point and marking it as part of the maze
    // 31 rows, 51 columns; 2n+1 formula so random starts at 29-1 // 14 = 15, 49-1//2 = 24; +1 to avoid edges
    let in_wall_list = initialize_visited(global.rc, global.cc)
    let rand_i = 2 * Math.floor(Math.random() * Math.floor( (global.rc-1) /2)) + 1
    let rand_j = 2 * Math.floor(Math.random() * Math.floor( (global.cc-1) / 2)) + 1
    console.log(rand_i, " ", rand_j)
    // in_wall_list[rand_i][rand_j] = 1
    visited[rand_i][rand_j]=1
    let rand_int, out, x, y, ret_val
    let wall_list = []
    in_wall_list[rand_i+1][rand_j] = 1
    in_wall_list[rand_i-1][rand_j] = 1
    in_wall_list[rand_i][rand_j+1] = 1
    in_wall_list[rand_i][rand_j-1] = 1
    wall_list.push([rand_i+1, rand_j], [rand_i-1, rand_j], [rand_i, rand_j+1], [rand_i, rand_j-1])
    maze.push([rand_i, rand_j])
    while (wall_list.length > 0) {
        // console.log(wall_list.length, wall_list)
        rand_int = Math.floor(Math.random() * Math.floor(wall_list.length))
        out = wall_list.splice(rand_int,1)[0]
        x = out[0]
        y = out[1]
        console.log("rand num ", rand_int, ' x ', x, ' y ', y)
        if (x === 0 || y === 0 || x === global.rc-1 || y === global.cc -1) {
            continue
        }
        // if one of the two spaces are visited
        if (visited[x+1][y] === 0 && visited[x-1][y] === 1 || visited[x+1][y] === 1 && visited[x-1][y] === 0){
            // append walls adjacent to the new cell
            maze.push([x,y])
            if (visited[x+1][y] === 0) {
                ret_val = append_adj(wall_list, x+1,y, in_wall_list, walls)
                visited[x+1][y] = 1
                maze.push([x+1,y])
            } else if (visited[x-1][y] === 0) {
                ret_val = append_adj(wall_list, x-1,y, in_wall_list, walls)
                visited[x-1][y] = 1
                maze.push([x-1,y])
            }
            wall_list = ret_val.a 
            in_wall_list = ret_val.in_a
            walls[x][y] = 0
            visited[x][y] = 1
            
        } else if (visited[x][y+1] === 0 && visited[x][y-1] === 1 || visited[x][y+1] === 1 && visited[x][y-1] === 0) {
            maze.push([x,y])
            if (visited[x][y+1] === 0) {
                ret_val = append_adj(wall_list, x,y+1, in_wall_list, walls)
                visited[x][y+1] = 1
                maze.push([x,y+1])
            } else if (visited[x][y-1] === 0) {
                ret_val = append_adj(wall_list, x,y-1, in_wall_list, walls)
                visited[x][y-1] = 1
                maze.push([x,y-1])
            }
            wall_list = ret_val.a 
            in_wall_list= ret_val.in_a
            walls[x][y] = 0
            visited[x][y] = 1
        }

    }
    
    for (let i = 0; i < global.rc; i++) {
        console.log(walls[i].toString())
        // console.log('\n')
    }


    let ret_walls = []
    for (let i = 0; i < walls.length; i++) {
        for (let j = 0; j < walls[0].length; j++) {
            if (walls[i][j] === 1) {
                ret_walls.push([i,j])
            }
        }
    }

    return {"maze": maze, "walls": ret_walls}
    
}


function append_adj(a,row,col, in_a, walls) {
    console.log("before ", a, " ", row, " ", col)
    for (let i = -1; i <=1; i+=2) {
        if (walls[row+i][col] === 1 && in_a[row+i][col] === 0) {
            a.push([row+i,col])
            in_a[row+i][col] = 1

        }
        if (walls[row][col+i] === 1 && in_a[row][col+i]===0) {
            a.push([row,col+i])
            in_a[row][col+i] = 1
        }
    }
    console.log("after ", a)
    
    return {"a": a, "in_a":in_a}
}


function initialize_visited(row_count, col_count) {
	var visited = new Array(row_count)
	for (let i = 0; i < row_count; i++) {
		visited[i] = new Array(col_count).fill(0)
	}
	return visited
}
