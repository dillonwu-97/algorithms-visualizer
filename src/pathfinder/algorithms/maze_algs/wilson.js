import React from 'react'
import '../../setup/global'

// global.rc = 31
// global.cc = 51
// random_prims()
/*
Choose any vertex at random and add it to the UST.
Select any vertex that is not already in the UST and perform a random walk until you encounter a vertex that is in the UST.
Add the vertices and edges touched in the random walk to the UST.
Repeat 2 and 3 until all vertices have been added to the UST.
*/
// wilson()
export default function wilson() {
// function wilson () {
    let visited = initialize_visited(global.rc, global.cc);
    let walls = initialize_visited(global.rc, global.cc)
    let x, y, q, out
    // randomize array
    let maze = [], total_vertices = 0, to_visit = []
    for (let i = 1; i < global.rc-1; i++) {
        for (let j = 1; j < global.cc-1; j++) {
            if (j % 2 === 1 && i % 2 === 1) {
                // need to connect all of the spaces
                total_vertices ++;
                to_visit.push([i,j])
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

    to_visit = shuffle(to_visit)

    let rand_i = 2 * Math.floor(Math.random() * Math.floor( (global.rc-1) /2)) + 1
    let rand_j = 2 * Math.floor(Math.random() * Math.floor( (global.cc-1) / 2)) + 1
    /*
    algorithm:
    two dictionaries: current and completed
    if i, j in current ever sees itself, backtrack
    backtrack algorithm gets rid of all of the previously seen values and keeps going until it hits an element in 
    the completed set
    join current and completed and reset current
    */
    let current = {}, complete = {}, order = [], res= []
    let p, s, rand_value, temp, back_ret
    q = []
    rand_value = [rand_i, rand_j]
    s = rand_value.toString()
    complete[s] = rand_value
    visited[rand_i][rand_j] = 1
    // console.log("start ", rand_value, complete)
    for (let i = 0; i < to_visit.length; i++) {
        if (visited[ to_visit[i][0] ][ to_visit[i][1] ] !== 0) {
            // console.log("skip ", to_visit[i])
            continue
        } else {
            // console.log("to visit: ", to_visit[i])
            q.push(to_visit[i])
            s = to_visit[i].toString()
            current[s]= to_visit[i]
            visited[to_visit[i][0]][to_visit[i][1]] = 1
        }
        while (q.length !== 0) {
            out = q.shift()
            x = out[0]
            y = out[1]
            s = out.toString()
            // console.log('out: ', out)
            // if the popped value is in the complete set, then combine the two sets
            if (s in complete) {
                order =get_maze(x,y,visited)
                // DEBUG
                // for (let x = 1; x < order.length; x++) {
                //     if (order[x-1][0] !== order[x][0]){
                //         if (order[x-1][1] !== order[x][1]) {
                //             console.log("order is :", order)
                //         }
                //     }
                // }
                res = res.concat(order.reverse())
                complete = {...complete, ...current}
                // console.log("completed at ", s, complete)
                current = {}
            // else the popped value is not in the complete set so keep searching
            } else {

                //TODO: disallow direction reversals
                rand_value = random_adjacent(x, y, visited)
                s = rand_value.toString()
                // console.log("not in complete ", s, current, s in current)
                temp = [x,y]
                while (s in current) {
                    // console.log("starting backtrack")
                    back_ret = backtrack(temp[0], temp[1], rand_value[0], rand_value[1], visited, current)
                    visited = back_ret.v
                    current = back_ret.c
                    temp = rand_value // store this REPEATED value
                    
                    // HAVE TO MAKE SURE RAND_VALUE IS NOT IN CURRENT AS WELL
                    rand_value = random_adjacent(temp[0], temp[1], visited) // get the NEW value
                    s = rand_value.toString()
                }
                // console.log(rand_value[0], visited[temp[0]][temp[1]][0], rand_value[1], visited[temp[0]][temp[1]][1])
                // if (rand_value[0] === visited[temp[0]][temp[1]][0] && rand_value[1] === visited[temp[0]][temp[1]][1]) {
                //     console.log('ALERT!!!!!!!')
                // }
                visited[rand_value[0]][rand_value[1]] = temp // connect the REPEATED value to the NEW value    
                current[s] = rand_value
                q.push(rand_value)
            }
        }
    }
    maze.push(res[0])
    let temp1,temp2, temp3
    for (let i = 1; i < res.length; i++) {
        // console.log(res[i-1], res[i])
        temp1 = res[i-1]
        temp2 = res[i]
        temp3 = 0
        // walls[temp1[0]][temp1[1]] = 0
        // walls[temp2[0]][temp2[1]] = 0
        // the issue with the random white blip is that there can be cases where two values are on
        // the same row but not adjacent, i.e. they are far apart
        
        if (temp1[0] === temp2[0]) {
            temp3 = temp1[1] + temp2[1]
            temp3 /= 2
            if ( Math.abs(temp3 - temp1[1]) === 1) {
                maze.push([temp1[0], temp3])
                walls[temp1[0]][temp3] = 0
            }
            // if (Math.abs(temp1[1] - temp2[1]) !== 1) {
            //     console.log(temp1, temp2)
            // }
        } else if (temp1[1] === temp2[1]) {
            temp3 = temp1[0] + temp2[0]
            temp3 /= 2
            // if (Math.abs(temp1[0] - temp2[0]) !== 1) {
            //     console.log(temp1, temp2)
            // }
            if (Math.abs(temp3 - temp1[0]) === 1) {
                maze.push([temp3, temp1[1]])
                walls[temp3][temp1[1]] = 0
            }
        }
        // } else if (Math.abs(temp1[0] - temp2[0]) + Math.abs(temp1[1] - temp2[1]) === 4) {
        //     maze.push([temp2[0], temp1[1]])
        //     walls[temp2[0]][temp1[1]] = 0
        // }
        // to see if there is any disconnect at all between vertices
        // if (i < res.length-1 && temp1[0] !== temp2[0] && temp1[1] !== temp2[1] &&
        //     temp2[0] !== res[i+1][0] && temp2[1] !== res[i+1][1]) {
        //         console.log(temp1, temp2, res[i+1])
        //     }
        maze.push(res[i])
    }


    // console.log(set.extract())
    let ret_walls = []
    for (let i = 0; i < walls.length; i++) {
        for (let j = 0; j < walls[0].length; j++) {
            if (walls[i][j] === 1) {
                ret_walls.push([i,j])
            }
        }
    }
    // console.log(ret_walls)

    // // console.log(maze)
    // // console.log( {"maze": maze, "walls": ret_walls})
    return {"maze": maze, "walls": ret_walls}
    
}

function get_maze(x, y, visited) {
    let o = [[x,y]], temp
    while (visited[x][y] !== 1) {
        temp = visited[x][y]
        // console.log(x, y, temp)
        o.push(visited[x][y])
        x = temp[0]
        y = temp[1]
    }
    return o
}

function backtrack(back_start_i, back_start_j, back_end_i, back_end_j, visited, current) {
    let out, s
    while (back_start_i !== back_end_i || back_start_j !== back_end_j) {
        out = visited[back_start_i][back_start_j]
        visited[back_start_i][back_start_j] = 0
        s = [back_start_i, back_start_j].toString()
        // console.log(current[s])
        // console.log("backtracking ", back_start_i, back_start_j, back_end_i, back_end_j, out, visited[back_end_i][back_end_j])
        delete current[s]
        back_start_i = out[0]
        back_start_j = out[1]
    }
    // console.log("backtracking STOP", out, visited[back_end_i][back_end_j])
    // console.log(visited[back_start_i][back_start_j])
    return {v:visited, c:current}
}

function random_adjacent(x, y, visited){
    let temp, prev, list = []
    prev = visited[x][y]
    // 2 directions to travel in 
    if (x === 1 && y === 1 || x===global.rc-2 && y === global.cc-2 || x === 1 && y === global.cc-2 || x=== global.rc-2 && y === 1) {
        if (x === 1 && y === 1) {
            list = [[x+2,y], [x,y+2]]
        } else if (x === global.rc-2 && y === global.cc-2){
            list = [[x-2,y],[x,y-2]]
        } else if (x === 1 && y===global.cc-2) {
            list=[[x+2,y],[x,y-2]]
        } else if (x===global.rc-2 && y ===1) {
            list = [[x-2,y],[x,y+2]]
        }
    } else if (x === 1 || y === 1 || x === global.rc-2 || y === global.cc-2) {
        // 3 directions to travel in
        if (x === 1 || x === global.rc-2) {
            x === 1? list.push([x+2,y]) : list.push([x-2,y])
            list.push([x,y+2])
            list.push([x,y-2])
        } else {
            y === 1? list.push([x,y+2]) : list.push([x,y-2])
            list.push([x+2,y])
            list.push([x-2,y])
        }
    } else {
        // 4 directions to travel in
        list = [[x+2,y],[x-2,y],[x,y-2],[x,y+2]]
    }
    list = shuffle(list)
    if (list[0][0] === prev[0] && list[0][1] === prev[1]) {
        // console.log(list[0], prev, "SAME", list[1])
        // console.log(prev, [x,y], list[1])
        return list[1]
    } else {
        // console.log(prev, [x,y], list[0])
        return list[0]
    }
    /* DEBUG
    start  [ 9, 29 ] { '9,29': [ 9, 29 ] }
1 [ 15, 23 ]
[ 15, 23 ] [ 15, 25 ]
[ 15, 25 ] [ 17, 25 ]
[ 17, 25 ] [ 17, 27 ]
[ 17, 27 ] [ 15, 27 ]
[ 15, 27 ] [ 13, 27 ]
[ 13, 27 ] [ 13, 29 ]
backtracking  13 29 13 27 [ 13, 27 ]
[ 13, 29 ] [ 13, 27 ]
[ 13, 27 ] [ 13, 29 ]
[ 13, 29 ] [ 13, 31 ]
[ 13, 31 ] [ 11, 31 ]
[ 11, 31 ] [ 9, 31 ]
[ 9, 31 ] [ 9, 33 ]
[ 9, 33 ] [ 9, 35 ]
backtracking  9 35 9 33 [ 9, 33 ]
[ 9, 35 ] [ 9, 33 ]
[ 9, 33 ] [ 11, 33 ]
backtracking  11 33 9 33 [ 9, 33 ]
[ 11, 33 ] [ 9, 33 ]
[ 9, 33 ] [ 11, 33 ]
backtracking  11 33 11 31 [ 9, 33 ]
backtracking  9 33 11 31 [ 11, 33 ]
backtracking  11 33 11 31 0
    */

}

// get random item from object
function random_property (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};


function initialize_visited(row_count, col_count) {
	var visited = new Array(row_count)
	for (let i = 0; i < row_count; i++) {
		visited[i] = new Array(col_count).fill(0)
	}
	return visited
}

function shuffle(a) {
    var j, x, i;
    for (let i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}