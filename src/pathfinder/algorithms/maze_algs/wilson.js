import '../../setup/global'
import { shuffle, initialize_visited, get_walls } from '../helpers'

/*
Choose any vertex at random and add it to the UST (Uniform spanning tree)
Select any vertex that is not already in the UST and perform a random walk until you encounter a vertex that is in the UST.
Add the vertices and edges touched in the random walk to the UST.
Repeat 2 and 3 until all vertices have been added to the UST.
*/

export default function wilson() {
    let visited = initialize_visited(global.rc, global.cc);
    let walls = initialize_visited(global.rc, global.cc)
    let x, y, q, out
    // randomize array
    let maze = [], to_visit = []
    for (let i = 1; i < global.rc-1; i++) {
        for (let j = 1; j < global.cc-1; j++) {
            if (j % 2 === 1 && i % 2 === 1) {
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
    let s, rand_value, temp, back_ret
    q = []
    rand_value = [rand_i, rand_j]
    s = rand_value.toString()
    complete[s] = rand_value
    visited[rand_i][rand_j] = 1
    for (let i = 0; i < to_visit.length; i++) {
        if (visited[ to_visit[i][0] ][ to_visit[i][1] ] !== 0) {
            continue
        } else {
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
            // if the popped value is in the complete set, then combine the two sets
            if (s in complete) {
                order =get_maze(x,y,visited)
                res = res.concat(order.reverse())
                complete = {...complete, ...current}
                current = {}
            // else the popped value is not in the complete set so keep searching
            } else {

                //TODO: disallow direction reversals
                rand_value = random_adjacent(x, y, visited)
                s = rand_value.toString()
                temp = [x,y]
                while (s in current) {
                    back_ret = backtrack(temp[0], temp[1], rand_value[0], rand_value[1], visited, current)
                    visited = back_ret.v
                    current = back_ret.c
                    temp = rand_value // store this REPEATED value
                    rand_value = random_adjacent(temp[0], temp[1], visited) // get the NEW value
                    s = rand_value.toString()
                }
                
                visited[rand_value[0]][rand_value[1]] = temp // connect the REPEATED value to the NEW value    
                current[s] = rand_value
                q.push(rand_value)
            }
        }
    }
    maze.push(res[0])
    let temp1,temp2, temp3
    for (let i = 1; i < res.length; i++) {
        temp1 = res[i-1]
        temp2 = res[i]
        temp3 = 0
        // the issue with the random white blip is that there can be cases where two values are on
        // the same row but not adjacent, i.e. they are far apart
        
        if (temp1[0] === temp2[0]) {
            temp3 = temp1[1] + temp2[1]
            temp3 /= 2
            if ( Math.abs(temp3 - temp1[1]) === 1) {
                maze.push([temp1[0], temp3])
                walls[temp1[0]][temp3] = 0
            }
        } else if (temp1[1] === temp2[1]) {
            temp3 = temp1[0] + temp2[0]
            temp3 /= 2
            if (Math.abs(temp3 - temp1[0]) === 1) {
                maze.push([temp3, temp1[1]])
                walls[temp3][temp1[1]] = 0
            }
        }
        maze.push(res[i])
    }

    let ret_walls = get_walls(walls)
    return {"maze": maze, "walls": ret_walls}
    
}

function get_maze(x, y, visited) {
    let o = [[x,y]], temp
    while (visited[x][y] !== 1) {
        temp = visited[x][y]
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
        delete current[s]
        back_start_i = out[0]
        back_start_j = out[1]
    }
    return {v:visited, c:current}
}

function random_adjacent(x, y, visited){
    let prev, list = []
    prev = visited[x][y]
    // Special case where we hit a corner so there are now two different directions we can go in
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
    // special case where it is not a corner, but it is the side of a maze so there are three directions to move in
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
    // otherwise, we can go in any direction
    } else {
        // 4 directions to travel in
        list = [[x+2,y],[x-2,y],[x,y-2],[x,y+2]]
    }
    list = shuffle(list)
    if (list[0][0] === prev[0] && list[0][1] === prev[1]) {
        return list[1]
    } else {
        return list[0]
    }

}