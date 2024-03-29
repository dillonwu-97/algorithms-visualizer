import { IDIRECTION, JDIRECTION, UNVISITED, VISITING, initialize_visited } from '../helpers';
import '../../setup/global'
 
export default function random_maze() {
    // create setup to check adjacencies
    let visited = initialize_visited(global.rc, global.cc);
    let maze = []
    // build the maze
    // can transform shape of map by changing value for this
    for (let i = 0; i < global.rc; i++) {
        for (let j = 0; j < global.cc; j++) {
            if (Math.random() > .15) {
                if (check_adjacencies(i, j, visited)) {
                    visited[i][j] = 1
                }
            }
        }
    }

    // make sure there are no islands
    for (let i = 0; i < global.cc; i++) {
        maze.push([0,i])
        maze.push([global.rc-1,i])
        visited[0][i] = 1
        visited[global.rc-1][i] = 1
    }
    for (let i = 0; i < global.rc; i++) {
        maze.push([i, 0])
        maze.push([i, global.cc-1])
        visited[i][0] = 1
        visited[i][global.cc-1] = 1
    }

    // this is not changing
    for (let i = 0; i < 2; i++) {
        visited = remove_islands(visited)
        visited = remove_islands_edge(visited)
        // console.log(visited)
    }
    // for some reason, there is always something blocked on the last row so i'm just going to get rid of it
    for (let i = 1; i < global.cc-1; i++) {
        if (Math.random() > .15) {
            visited[global.rc-2][i] = 0
        }
            // visited[global.rc-2][i] = 0
    }
    visited = remove_islands_edge(visited)

    // remove islands using second idea: tracing the walls to see if they touch

    
    for (let i = 1; i < global.rc-1; i++) {
        for (let j = 1; j < global.cc-1; j++) {
            if(visited[i][j] === 1) {
                maze.push([i,j])
            }
        }
    }
    
    return maze
}

function remove_islands_edge (visited) {
    let q = []
    let out, out_i, out_j, temp_i, temp_j, x, y;
    let right_left_walls = [1, global.cc-2]
    let top_down_walls = [1, global.rc-2]

    // for 
    let checked = initialize_visited(global.rc, global.cc)
    for (let j = 1; j > -1; j--) {        
        for (let i = 1; i < global.cc-1; i++) {
            // console.log("i is: ", i)
            if (visited[top_down_walls[j]][i] === 1 && checked[top_down_walls[j]][i] === 0) {
                q.push([top_down_walls[j],i])
                while (q.length !== 0) {
                    out = q.shift()
                    out_i = out[0]
                    out_j = out[1]
                    // condition: cannot be adjacent to each other
                    // wall detection mechanism
                    if (out_j in right_left_walls || out_i in top_down_walls) {
                        if (Math.abs(i - out_j) > 0 || Math.abs(top_down_walls[j] -out_i) > 0) {
                            x = out_i
                            y = out_j
                            while (y > 0 && visited[x][y] === 1) {
                                visited[x][y] = 0
                                y-=1
                            }
                            while (x > 0 && visited[x][out_j] === 1) {
                                visited[x][out_j] = 0
                                x-=1
                            }
                            x = out_i
                            while (out_j < global.cc && visited[x][out_j] === 1) {
                                visited[x][out_j] = 0
                                out_j+=1
                            }
                            while (out_i < global.rc && visited[out_i][out_j] === 1) {
                                visited[out_j][out_j] = 0
                                out_i+=1
                            }
                            visited[top_down_walls[j]][i] = 0
                        }
                    }
                    // add all adjacents including diagonals
                    for (let x = -1; x < 2; x++) {
                        for (let y = -1; y < 2; y++) {
                            temp_i = out_i + x
                            temp_j = out_j + y
                            if (visited[temp_i][temp_j] === 1 && checked[temp_i][temp_j] === 0 && temp_i !== 0 && temp_j !== 0 && temp_i !== global.rc-1 && temp_j!==global.cc-1) {
                                q.push([temp_i,temp_j])
                                checked[temp_i][temp_j] = 1
                            } 
                        }
                    }
                }
            }
        }
    }
    return visited
}

function remove_islands(visited) {
	let q = [] // using push and shift
    let out;
    let o; 
    let out_i, out_j, new_out_i, new_out_j
    let checked = initialize_visited(global.rc, global.cc)
    let row_count = global.rc, col_count = global.cc
    for (let i = 0; i < global.rc; i++) {
        for (let j = 0; j < global.cc; j++) {
            if (checked[i][j] === 0 && visited[i][j] === 0) {  
                q.push([i, j])
                while (q.length!==0) {
                    out = q.shift()
                    out_i = out[0]
                    out_j = out[1]
                    for (let k = 0; k < IDIRECTION.length; k++) {
                        new_out_i = out_i + IDIRECTION[k]
                        new_out_j = out_j + JDIRECTION[k]
                        if (new_out_i >= 0 && new_out_i < row_count && new_out_j >= 0 && new_out_j < col_count) {
                            if (checked[new_out_i][new_out_j] == UNVISITED && visited[new_out_i][new_out_j] == UNVISITED) {
                                q.push([new_out_i, new_out_j])
                                checked[new_out_i][new_out_j] = VISITING
                            }
                        }
                    }  
                }
                // drill until you hit a 0 or are out of range
                // need to make sure it is not drilling the borders

                for (let k = 0; k < 4; k++) {
                    new_out_i = out_i + IDIRECTION[k]
                    new_out_j = out_j + JDIRECTION[k]
                    if (new_out_i >= 0 && new_out_i < row_count && new_out_j >= 0 && new_out_j < col_count) {
                        if (visited[new_out_i][new_out_j] == VISITING) {
                            o = drill (new_out_i, new_out_j, visited, checked)
                            break
                        }
                    }
                }
                if (o !== undefined) {
                    visited = o.visited
                    checked = o.checked
                }
            }
        }
    }
    return visited

}

function drill(i, j,visited, checked) {

    visited[i][j] = 1
    while(i < global.rc-1 && visited[i][j] === 1) {
        visited[i][j] = 0
        checked[i][j] = 0
        i+=1
    }
    visited[i][j] = 1
    while(j < global.cc-1 && visited[i][j] === 1) {
        visited[i][j] = 0
        checked[i][j] = 0
        j+=1
    }
    
    let o = {visited, checked}
    return o
}


// transform shape of map by changing the values for this
function check_adjacencies(row, col, visited) {
    let count = 0
    
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            try {
                if ((i===-1 && j === -1) || (i === 1 && j === -1) || (i===1 && j===1) || (i===-1 && j===1)) {
                    if (visited[row+i][col+j] === 1) {
                        count +=2;
                    }
                } else if (visited[row + i][col + j] === 1) {
                    count+=1;
                }
            } catch {
                count +=1;
            }
            if (count >4) {
                return false
            }
        }
    }
    return true

}
